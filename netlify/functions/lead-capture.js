// Netlify Function to handle lead capture form submissions
// This function receives form data and sends it to your email marketing system or CRM
import validator from 'validator';
import xss from 'xss';
import { validateFormCsrfToken } from '../utils/csrf-validator.js';
import { applyRateLimit } from '../utils/rate-limiter.js';

// Email addresses to send lead notifications to
const NOTIFICATION_RECIPIENTS = process.env.FORM_NOTIFICATION_RECIPIENTS;

// Create the base handler function
const baseHandler = async (event, context) => {
  // Validate required environment variables
  if (!NOTIFICATION_RECIPIENTS) {
    console.error('Missing required environment variable: FORM_NOTIFICATION_RECIPIENTS');
    // Continue execution but log the error - don't expose this to the client response
  }
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse the incoming request body
    const rawData = JSON.parse(event.body);
    
    // CSRF validation
    if (!validateFormCsrfToken(rawData)) {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: 'Invalid or missing CSRF token' }),
      };
    }
    
    // Validate required fields with stronger validation
    if (!rawData.email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email address is required' }),
      };
    }
    
    if (!validator.isEmail(rawData.email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Valid email address is required' }),
      };
    }
    
    if (!rawData.name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Name is required' }),
      };
    }
    
    // Sanitize all inputs to prevent XSS attacks
    const data = {
      email: validator.normalizeEmail(rawData.email.trim()) || rawData.email.trim(),
      name: xss(rawData.name.trim()),
      industry: xss(rawData.industry?.trim() || 'Not specified'),
      leadSource: xss(rawData.leadSource?.trim() || 'Website Lead Magnet'),
      downloadedGuide: xss(rawData.downloadedGuide?.trim() || 'Texas Legislative Guide'),
      downloadUrl: validator.isURL(rawData.downloadUrl?.trim() || '/downloads/') ? 
                  rawData.downloadUrl.trim() : '/downloads/',
      timestamp: rawData.timestamp || new Date().toISOString()
    };

    // Log the lead data for debugging
    console.log('Lead captured:', data);

    // Format the notification data to be sent to Netlify's form handler
    const formData = {
      'form-name': 'lead-magnet-download',
      name: data.name,
      email: data.email,
      industry: data.industry || 'Not specified',
      leadSource: data.leadSource || 'Website Lead Magnet',
      downloadedGuide: data.downloadedGuide || 'Texas Legislative Guide',
      downloadUrl: data.downloadUrl || '/downloads/',
      timestamp: data.timestamp || new Date().toISOString(),
      recipients: NOTIFICATION_RECIPIENTS
    };

    // Send the form submission to Netlify's built-in form handler
    // This will trigger the email notifications based on Netlify's settings
    try {
      // Use a fixed endpoint URL to prevent SSRF attacks
      const FORM_ENDPOINT = 'https://capitol-insights.com';
      
      // If we need to use environment variable URL, validate it strictly
      let submissionUrl = FORM_ENDPOINT;
      if (process.env.URL) {
        try {
          const urlObj = new URL(process.env.URL);
          // Only allow specific domains
          const allowedDomains = ['capitol-insights.com', 'www.capitol-insights.com'];
          if (allowedDomains.includes(urlObj.hostname)) {
            submissionUrl = process.env.URL;
          } else {
            console.warn('Invalid domain in URL environment variable, using default endpoint');
          }
        } catch (urlError) {
          console.warn('Invalid URL format in environment variable, using default endpoint');
        }
      }
      
      const response = await fetch(submissionUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
      
      if (!response.ok) {
        console.warn('Netlify form submission warning:', response.status);
      } else {
        console.log('Netlify form submission successful');
      }
    } catch (formError) {
      console.error('Netlify form submission error:', formError);
      // We'll continue even if this fails, to ensure the user gets their download
    }

    // Return success response to the client
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Lead captured successfully',
        data: {
          name: data.name,
          email: data.email,
          industry: data.industry,
          downloadedGuide: data.downloadedGuide,
          timestamp: data.timestamp
        }
      }),
    };
  } catch (error) {
    console.error('Error processing lead:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};

// Apply rate limiting to the handler (100 requests per hour)
export const handler = applyRateLimit(baseHandler, 100);
