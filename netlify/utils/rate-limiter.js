/**
 * Rate Limiting Utility for Netlify Functions
 * Implements a simple in-memory rate limiter with IP-based tracking
 * 
 * NOTE: This in-memory implementation is suitable for moderate usage patterns
 * but will reset on function cold starts since Netlify functions are stateless.
 * For production-grade rate limiting, consider using:
 * - A persistent database like DynamoDB
 * - A distributed cache like Redis via Upstash
 * - Netlify's Edge Functions with distributed storage
 */

// In-memory storage for rate limits
// Maps IP addresses to {count, resetTime} objects
const ipLimits = {};

// Configuration constants
const WINDOW_DURATION_MS = 3600000; // 1 hour in milliseconds
const DEFAULT_MAX_REQUESTS = 100;    // Default max requests per window
const RATE_LIMIT_HEADERS = true;     // Whether to include rate limit headers

/**
 * Checks if a request should be rate limited
 * @param {string} clientIp - The client's IP address
 * @param {number} maxRequests - Maximum requests allowed in the time window
 * @returns {object} Result object with status and headers
 */
function checkRateLimit(clientIp, maxRequests = DEFAULT_MAX_REQUESTS) {
  const now = Date.now();
  
  // Initialize rate limit tracking for this IP if it doesn't exist
  if (!ipLimits[clientIp]) {
    ipLimits[clientIp] = {
      count: 0,
      resetTime: now + WINDOW_DURATION_MS,
    };
  }
  
  // Reset counter if the time window has passed
  if (now > ipLimits[clientIp].resetTime) {
    ipLimits[clientIp] = {
      count: 0,
      resetTime: now + WINDOW_DURATION_MS,
    };
  }
  
  // Increment request counter
  ipLimits[clientIp].count++;
  
  // Calculate time remaining in window
  const timeRemaining = Math.ceil((ipLimits[clientIp].resetTime - now) / 1000);
  
  // Prepare rate limit headers
  const rateHeaders = RATE_LIMIT_HEADERS ? {
    'X-RateLimit-Limit': maxRequests.toString(),
    'X-RateLimit-Remaining': Math.max(0, maxRequests - ipLimits[clientIp].count).toString(),
    'X-RateLimit-Reset': Math.ceil(ipLimits[clientIp].resetTime / 1000).toString(),
  } : {};
  
  // Check if rate limit is exceeded
  if (ipLimits[clientIp].count > maxRequests) {
    return {
      limited: true,
      headers: {
        ...rateHeaders,
        'Retry-After': timeRemaining.toString(),
      },
      resetTime: ipLimits[clientIp].resetTime,
    };
  }
  
  // Not rate limited
  return {
    limited: false,
    headers: rateHeaders,
  };
}

/**
 * Apply rate limiting to a Netlify function handler
 * @param {function} handler - The original handler function
 * @param {number} maxRequests - Maximum requests allowed in the time window
 * @returns {function} A new handler function with rate limiting applied
 */
export function applyRateLimit(handler, maxRequests = DEFAULT_MAX_REQUESTS) {
  return async (event, context) => {
    // Extract client IP from headers or client context
    const clientIp = 
      event.headers['x-forwarded-for']?.split(',')[0].trim() || 
      event.headers['client-ip'] || 
      context?.clientContext?.client_ip || 
      'unknown';
    
    // Check rate limit
    const rateLimitResult = checkRateLimit(clientIp, maxRequests);
    
    // If rate limited, return 429 response
    if (rateLimitResult.limited) {
      return {
        statusCode: 429,
        headers: rateLimitResult.headers,
        body: JSON.stringify({ 
          message: 'Too Many Requests',
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
        }),
      };
    }
    
    // Call the original handler
    const response = await handler(event, context);
    
    // Add rate limit headers to the response
    return {
      ...response,
      headers: {
        ...response.headers,
        ...rateLimitResult.headers,
      },
    };
  };
}

/**
 * Helper to clean up old entries to prevent memory leaks
 * Call this periodically if your function runs for a long time
 */
export function cleanupRateLimiter() {
  const now = Date.now();
  Object.keys(ipLimits).forEach(ip => {
    if (now > ipLimits[ip].resetTime) {
      delete ipLimits[ip];
    }
  });
}
