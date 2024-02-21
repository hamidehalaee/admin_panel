const speakeasy = require('speakeasy');
const express = require('express');

const router = express.Router()

const secret = speakeasy.generateSecret({ length: 20 });

// Endpoint to generate a QR code for the user to scan
router.get('/2fa/generate', (req, res) => {
    const qrCodeUrl = speakeasy.otpauthURL({
        secret: secret.base32,
        label: 'MyApp',
        algorithm: 'sha1',
        digits: 6,
        period: 30
    });
    res.send(`<img src="${qrCodeUrl}" alt="QR Code"/>`);
});

// Endpoint to verify the token entered by the user
router.post('/2fa/verify', (req, res) => {
    const { token } = req.body;

    // Verify the token entered by the user
    const verified = speakeasy.totp.verify({
        secret: secret.base32,
        encoding: 'base32',
        token: token,
        window: 1 // Allow 1-time step variance
    });

    if (verified) {
        res.send('Token is valid');
    } else {
        res.status(400).send('Token is invalid');
    }
});

module.exports = router
