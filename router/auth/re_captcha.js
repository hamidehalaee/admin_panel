const express = require("express")
const axios = require("axios")

const router = express.Router()

router.post('/verify', async (req, res) => {
    const { token } = req.body;

    // Make a POST request to Google reCAPTCHA API to verify the token
    try {
        const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=YOUR_SECRET_KEY&response=${token}`);
        const { success } = response.data;

        if (success) {
            // Token verified successfully
            res.send('reCAPTCHA verification successful');
        } else {
            // Token verification failed
            res.status(400).send('reCAPTCHA verification failed');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});