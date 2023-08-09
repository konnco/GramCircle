const { supabase } = require("./supabase-backend.js");
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors()); 
const bodyParser = require('body-parser'); // Import body-parser for parsing JSON data


// This function generates a personalized sign-up link based on the user's email
function generateSignupLink(email) {
    // In this example, we are using a simple scheme to create the sign-up link.
    // You can use a more sophisticated approach with encryption or unique tokens.
    const baseUrl = 'https://gramcircle.onrender.com/api/signUp'; // Replace with your sign-up page URL
    const token = Buffer.from(email).toString('base64'); // Encode the email as a token
    return `${baseUrl}?token=${token}`;
  }

  function generateSignupLinkCreator(email) {
    // In this example, we are using a simple scheme to create the sign-up link.
    // You can use a more sophisticated approach with encryption or unique tokens.
    const baseUrl = 'https://gramcircle.onrender.com/api/signUp-creator'; // Replace with your sign-up page URL
    const token = Buffer.from(email).toString('base64'); // Encode the email as a token
    return `${baseUrl}?token=${token}`;
  }

  const nodemailer = require('nodemailer');

  // This function sends the sign-up link to the provided email
  async function sendEmail(email, signupLink) {
    // Create a Nodemailer transporter (replace with your email service configuration)
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com', // Replace with your email service provider
        secure: true,
        port: 465,
        auth: {
            user: 'gramcircle@zohomail.com',
            pass: 'Testing123@abc',
        },
    });
  
    // Email options
    const mailOptions = {
      from: 'gramcircle@zohomail.com', // Replace with your email address
      to: email,
      subject: 'Sign Up for Our Service', // Subject of the email
      html: `<p>Hello,</p><p>Please click the link below to sign up:</p><a href="${signupLink}">Sign Up</a>`, // HTML content of the email
    };
  
    try {
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email');
    }
  }

// Middleware to parse JSON data in the request body
app.use(bodyParser.json());


// Define the route handler for the /api/send-signup-link endpoint
app.post('/api/send-signup-link', (req, res) => {
  // Extract the email from the request body
  const { email } = req.body;

  // Assuming you have a function to generate the personalized sign-up link
  // and another function to send the email, you can call them here.
  try {
    const signupLink = generateSignupLink(email);
    sendEmail(email, signupLink);

    // Respond with a success message or any necessary data
    res.json({ success: true, message: 'Sign-up link sent successfully!' });
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ success: false, message: 'Error sending sign-up link.' });
  }
});

// Define the route handler for the /api/send-signup-link endpoint
app.post('/api/send-signup-link-creator', (req, res) => {
  // Extract the email from the request body
  const { email } = req.body;

  // Assuming you have a function to generate the personalized sign-up link
  // and another function to send the email, you can call them here.
  try {
    const signupLink = generateSignupLinkCreator(email);
    sendEmail(email, signupLink);

    // Respond with a success message or any necessary data
    res.json({ success: true, message: 'Sign-up link sent successfully!' });
  } catch (error) {
    // Handle errors and respond with an error message
    res.status(500).json({ success: false, message: 'Error sending sign-up link.' });
  }
});

app.get('/api/', (req, res) => {
    res.json({"users": ["usersOne"]})
});


// Add a new route for handling the personalized sign-up link
app.get('/api/signup', (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ success: false, message: 'Invalid token' });
  }

  try {
    // Decode the token to get the email
    const email = Buffer.from(token, 'base64').toString('utf-8');

    // Redirect the user to the frontend sign-up page with the email query parameter filled in
    return res.redirect(`https://gramcirclefrontend.onrender.com/brand/signup?email=${encodeURIComponent(email)}`);
  } catch (error) {
    console.error('Error decoding token:', error);
    return res.status(500).json({ success: false, message: 'Error decoding token' });
  }
});

// Add a new route for handling campaign creation
app.post('/api/create-campaign', async (req, res) => {
  try {
   

    // Assuming you have a 'campaigns' table in your Supabase database
    // and a corresponding user is signed in (you can access the user from the session)
    const token =  req.header('Authorization') // Replace this with how you access the signed-in user's data

    if (!token) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const postData = req.body;

    console.log(postData)
    // Insert the campaign data into the 'campaigns' table
    const { data, error } = await supabase.from('campaigns').insert([
      {
        brand_user_id: postData.user.user.id, // Assuming 'id' is the user's ID in the 'users' table
        chanel: postData.chanel,
        chanel_asset: postData.chanelAsset,
        exchange: postData.exchange,
        details: postData.details,
        depends: postData.depends
      },
    ]);



    if (error) {
      console.error('Error inserting campaign data:', error);
      return res.status(500).json({ error: 'Failed to create the campaign' });
    }

    return res.status(200).json({ success: true, message: 'Campaign created successfully' });
  } catch (error) {
    console.error('Error creating campaign:', error);
    return res.status(500).json({ error: 'An error occurred while creating the campaign' });
  }
});

app.get('/api/signup-creator', (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).json({ success: false, message: 'Invalid token' });
  }

  try {
    // Decode the token to get the email
    const email = Buffer.from(token, 'base64').toString('utf-8');

    // Redirect the user to the frontend sign-up page with the email query parameter filled in
    return res.redirect(`https://gramcirclefrontend.onrender.com/creator/signup?email=${encodeURIComponent(email)}`);
  } catch (error) {
    console.error('Error decoding token:', error);
    return res.status(500).json({ success: false, message: 'Error decoding token' });
  }
});

// Start the server on a specific port (e.g., 5000)
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 
