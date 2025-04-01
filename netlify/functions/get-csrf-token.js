// Netlify Function to generate CSRF token for form protection
import crypto from 'crypto';

// CSRF token validity duration (2 hours in milliseconds)
const TOKEN_EXPIRATION = 2 * 60 * 60 * 1000;

// Secret key for signing CSRF tokens
const SECRET_KEY = process.env.CSRF_SECRET_KEY || 'capitol-insights-default-csrf-secret';

/**
 * Generate a secure CSRF token with expiration timestamp
 * @returns {object} token object with value and expiration
 */
function generateCsrfToken() {
  // Generate a random token
  const randomBytes = crypto.randomBytes(32);
  const tokenValue = randomBytes.toString('hex');
  
  // Set expiration time
  const expiration = Date.now() + TOKEN_EXPIRATION;
  
  // Generate a signature using the secret key
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(`${tokenValue}:${expiration}`)
    .digest('hex');
  
  // Return the complete token
  return {
    value: tokenValue,
    expiration,
    signature,
    // Combined token that will be verified
    token: `${tokenValue}:${expiration}:${signature}`
  };
}

export const handler = async (event, context) => {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    // Generate a new CSRF token
    const tokenData = generateCsrfToken();
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        token: tokenData.token,
        expiration: tokenData.expiration
      }),
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    console.error('Error generating CSRF token:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Content-Type': 'application/json'
      }
    };
  }
};
