// Netlify Function to handle lead capture form submissions
// This function receives form data and sends it to your email marketing system or CRM
import validator from 'validator';
import xss from 'xss';

// Email addresses to send lead notifications to
const NOTIFICATION_RECIPIENTS = process.env.FORM_NOTIFICATION_RECIPIENTS;

export const handler = async (event, context) => {
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
    
    // Validate required fields with stronger validation
    if (!rawData.email || !validator.isEmail(rawData.email)) {
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
      email: validator.normalizeEmail(rawData.email) || rawData.email,
      name: xss(rawData.name),
      industry: xss(rawData.industry || 'Not specified'),
      leadSource: xss(rawData.leadSource || 'Website Lead Magnet'),
      downloadedGuide: xss(rawData.downloadedGuide || 'Texas Legislative Guide'),
      downloadUrl: validator.isURL(rawData.downloadUrl || '/downloads/') ? 
                  rawData.downloadUrl : '/downloads/',
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
      const response = await fetch(process.env.URL || 'https://capitol-insights.com', {
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
