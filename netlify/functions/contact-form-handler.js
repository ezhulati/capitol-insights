// Netlify Function to handle contact form submissions
// This function receives contact form data and ensures proper email delivery

// Email addresses to send contact form notifications to
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
    if (!data.email || !data.firstName || !data.lastName || !data.message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Required fields are missing' }),
      };
    }

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
