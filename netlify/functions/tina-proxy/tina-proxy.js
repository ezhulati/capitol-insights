const https = require('https');

exports.handler = async (event, context) => {
  // Only allow POST, GET, and OPTIONS requests
  if (event.httpMethod !== 'POST' && event.httpMethod !== 'GET' && event.httpMethod !== 'OPTIONS') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: {
        'Allow': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://capitol-insights.com',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      }
    };
  }

  // Handle OPTIONS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://capitol-insights.com',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true'
      },
      body: ''
    };
  }

  // Extract the path from the URL
  const path = event.path.replace('/.netlify/functions/tina-proxy', '');
  
  // Forward the request to the Tina Cloud identity service
  try {
    const response = await new Promise((resolve, reject) => {
      const options = {
        hostname: 'identity.tinajs.io',
        path: path || '/',
        method: event.httpMethod,
        headers: {
          'Content-Type': 'application/json',
          // Forward authorization header if present
          ...(event.headers.authorization && { 'Authorization': event.headers.authorization }),
        }
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            body,
            headers: res.headers
          });
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      // If it's a POST request, forward the body
      if (event.httpMethod === 'POST' && event.body) {
        req.write(event.body);
      }

      req.end();
    });

    return {
      statusCode: response.statusCode,
      body: response.body,
      headers: {
        'Content-Type': response.headers['content-type'] || 'application/json',
        'Access-Control-Allow-Origin': 'https://capitol-insights.com',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://capitol-insights.com',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true'
      }
    };
  }
};
