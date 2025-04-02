// CSRF Token Validation Utility
// This utility helps validate CSRF tokens in Netlify functions

import crypto from 'crypto';

// Secret key for verifying CSRF tokens
const SECRET_KEY = process.env.CSRF_SECRET_KEY || 'capitol-insights-default-csrf-secret';

/**
 * Validate a CSRF token
 * @param {string} token - The CSRF token to validate (format: value:expiration:signature)
 * @returns {boolean} Whether the token is valid
 */
export function validateCsrfToken(token) {
  // Basic validation - check if token exists and has correct format
  if (!token || typeof token !== 'string') {
    console.warn('CSRF validation failed: Token is missing or not a string');
    return false;
  }
  
  // Split the token into its components
  const parts = token.split(':');
  if (parts.length !== 3) {
    console.warn('CSRF validation failed: Token has incorrect format');
    return false;
  }
  
  const [tokenValue, expirationStr, providedSignature] = parts;
  
  // Validate expiration timestamp
  const expiration = parseInt(expirationStr, 10);
  if (isNaN(expiration) || Date.now() > expiration) {
    console.warn('CSRF validation failed: Token has expired');
    return false;
  }
  
  // Generate signature for validation
  const expectedSignature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(`${tokenValue}:${expiration}`)
    .digest('hex');
  
  // Compare signatures using constant-time comparison to prevent timing attacks
  try {
    // Ensure both buffers are the same length for timingSafeEqual
    const providedBuffer = Buffer.from(providedSignature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');
    
    if (providedBuffer.length !== expectedBuffer.length) {
      console.warn('CSRF validation failed: Signature length mismatch');
      return false;
    }
    
    if (!crypto.timingSafeEqual(providedBuffer, expectedBuffer)) {
      console.warn('CSRF validation failed: Invalid signature');
      return false;
    }
  } catch (error) {
    console.error('CSRF validation error:', error);
    return false;
  }
  
  // Token passed all validation checks
  return true;
}

/**
 * Extract and validate a CSRF token from form data
 * @param {Object} formData - The form data object
 * @param {string} tokenField - The field name containing the CSRF token (default: 'csrf-token')
 * @returns {boolean} Whether the token is valid
 */
export function validateFormCsrfToken(formData, tokenField = 'csrf-token') {
  if (!formData || typeof formData !== 'object') {
    console.warn('CSRF validation failed: Form data is missing or invalid');
    return false;
  }
  
  const token = formData[tokenField];
  return validateCsrfToken(token);
}
