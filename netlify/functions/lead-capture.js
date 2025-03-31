// Netlify Function to handle lead capture form submissions
// This function receives form data and sends it to your email marketing system or CRM

// Email addresses to send lead notifications to
const NOTIFICATION_RECIPIENTS = process.env.FORM_NOTIFICATION_RECIPIENTS || 'byroncampbell@capitol-insights.com,enrizhulati@gmail.com';

export const handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    // Parse the incoming request body
    const data = JSON.parse(event.body);
    
    // Validate required fields
    if (!data.email || !data.name) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Email and name are required' }),
      };
    }

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
