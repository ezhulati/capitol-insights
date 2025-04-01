// Netlify Function to handle contact form submissions
// This function receives contact form data and ensures proper email delivery
import validator from 'validator';
import xss from 'xss';

// Email addresses to send contact form notifications to
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
    
    if (!rawData.firstName || !rawData.lastName || !rawData.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Required fields are missing' }),
      };
    }
    
    // Sanitize all inputs to prevent XSS attacks
    const data = {
      email: validator.normalizeEmail(rawData.email) || rawData.email,
      firstName: xss(rawData.firstName),
      lastName: xss(rawData.lastName),
      phone: xss(rawData.phone || ''),
      practiceArea: xss(rawData.practiceArea || 'Not specified'),
      message: xss(rawData.message)
    };

    // Log the contact data for debugging
    console.log('Contact form submission:', data);

    // Format the notification data to be sent to Netlify's form handler
    const formData = {
      'form-name': 'contact-form',
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone || 'Not provided',
      practiceArea: data.practiceArea || 'Not specified',
      message: data.message,
      recipients: NOTIFICATION_RECIPIENTS,
      timestamp: new Date().toISOString()
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
    }

    // Return success response to the client
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Contact form submitted successfully',
        data: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          practiceArea: data.practiceArea,
          timestamp: new Date().toISOString()
        }
      }),
    };
  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message }),
    };
  }
};
