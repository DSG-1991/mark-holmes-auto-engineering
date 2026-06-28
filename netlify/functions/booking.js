// Netlify Function: Booking Form Handler
// Demo mode — logs submissions and returns success

exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body);

    // Validate required fields
    const required = ['name', 'phone', 'email', 'service', 'date'];
    const missing = required.filter(field => !body[field] || !body[field].trim());

    if (missing.length > 0) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          success: false,
          error: 'Please fill in all required fields: ' + missing.join(', ')
        })
      };
    }

    // Log the booking (demo mode)
    console.log('=== NEW BOOKING ===');
    console.log('Name:', body.name);
    console.log('Phone:', body.phone);
    console.log('Email:', body.email);
    console.log('Vehicle Reg:', body.vehicle_reg || 'Not provided');
    console.log('Selected Service:', body.service);
    console.log('Price:', body.price || 'N/A');
    console.log('Date:', body.date);
    console.log('Time:', body.time || 'Not specified');
    console.log('Message:', body.message || 'None');
    console.log('Timestamp:', new Date().toISOString());
    console.log('Full Payload:', JSON.stringify(body, null, 2));
    console.log('===================');

    // In production, you would send an email or save to a database here
    // For demo, we just log and return success

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Thank you! Your booking request has been received. We\'ll contact you shortly to confirm your appointment.'
      })
    };

  } catch (err) {
    console.error('Booking error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: 'Something went wrong. Please try again or call us on 01253 878932.'
      })
    };
  }
};
