// Netlify Function to handle lead capture form submissions
// This function receives form data and sends it to your email marketing system or CRM

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

    // Log the lead data for debugging (remove in production)
    console.log('Lead captured:', data);

    // Here you would integrate with your email marketing system or CRM
    // Examples include Mailchimp, HubSpot, SendGrid, etc.
    
    // Example: Send to Mailchimp (you would need to add the Mailchimp API key to your environment variables)
    // const mailchimpResponse = await sendToMailchimp(data);
    
    // Example: Send to a custom email service
    // const emailResponse = await sendEmailNotification(data);
    
    // For now, we'll just simulate a successful response
    // In a real implementation, you would replace this with actual API calls

    // Return success response
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

// Example function to send data to Mailchimp (would need to be implemented)
async function sendToMailchimp(data) {
  // This is a placeholder for actual Mailchimp API integration
  // You would use the Mailchimp API client here
  
  // Example implementation:
  /*
  const mailchimp = require('@mailchimp/mailchimp_marketing');
  
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER_PREFIX,
  });
  
  const listId = process.env.MAILCHIMP_LIST_ID;
  
  const response = await mailchimp.lists.addListMember(listId, {
    email_address: data.email,
    status: 'subscribed',
    merge_fields: {
      FNAME: data.name.split(' ')[0],
      LNAME: data.name.split(' ').slice(1).join(' '),
      INDUSTRY: data.industry || '',
      DOWNLOAD: data.downloadedGuide || '',
    },
    tags: ['Lead Magnet', data.downloadedGuide],
  });
  
  return response;
  */
  
  return { success: true };
}

// Example function to send email notification (would need to be implemented)
async function sendEmailNotification(data) {
  // This is a placeholder for actual email sending logic
  // You would use a service like SendGrid, AWS SES, etc.
  
  // Example implementation:
  /*
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  
  const msg = {
    to: 'notifications@capitol-insights.com',
    from: 'website@capitol-insights.com',
    subject: 'New Lead Magnet Download',
    text: `
      Name: ${data.name}
      Email: ${data.email}
      Industry: ${data.industry || 'Not specified'}
      Downloaded: ${data.downloadedGuide}
      Date: ${new Date(data.timestamp).toLocaleString()}
    `,
    html: `
      <h2>New Lead Magnet Download</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Industry:</strong> ${data.industry || 'Not specified'}</p>
      <p><strong>Downloaded:</strong> ${data.downloadedGuide}</p>
      <p><strong>Date:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
    `,
  };
  
  return await sgMail.send(msg);
  */
  
  return { success: true };
}
