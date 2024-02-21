const dns = require('dns');
const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: 587,
        secure: true,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        },
      });
  
      await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: subject,
        text: text,
      });
      console.log("email sent sucessfully");
    } catch (error) {
      console.log("email not sent");
      console.log(error);
    }
  };
  

function verifyEmail(email, callback) {
    // Extract domain from email address
    const domain = email.split('@')[1];

    // Perform DNS MX record lookup
    dns.resolveMx(domain, (err, addresses) => {
        if (err || addresses.length === 0) {
            // Domain does not have MX records or an error occurred
            callback(false);
        } else {
            // Domain has MX records, email address is potentially valid
            callback(true);
        }
    });
}

// const sendEmail = require("../utils/email");
// const Token = require("../models/token");
// const { User, validate } = require("../models/user");
// const crypto = import("crypto");
// const express = require("express");
// const router = express.Router();

// router.post("/", async (req, res) => {
//   try {
//     const { error } = validate(req.body);
//     if (error) return res.status(400).send(error.details[0].message);

//     let user = await User.findOne({ email: req.body.email });
//     if (user)
//       return res.status(400).send("User with given email already exist!");

//     user = await new User({
//       name: req.body.name,
//       email: req.body.email,
//     }).save();

//     let token = await new Token({
//       userId: user._id,
//       token: crypto.randomBytes(32).toString("hex"),
//     }).save();

//     const message = `${process.env.BASE_URL}/user/verify/${user.id}/${token.token}`;
//     await sendEmail(user.email, "Verify Email", message);

//     res.send("An Email sent to your account please verify");
//   } catch (error) {
//     res.status(400).send("An error occured");
//   }
// });

// router.get("/verify/:id/:token", async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.params.id });
//     if (!user) return res.status(400).send("Invalid link");

//     const token = await Token.findOne({
//       userId: user._id,
//       token: req.params.token,
//     });
//     if (!token) return res.status(400).send("Invalid link");

//     await User.updateOne({ _id: user._id, verified: true });
//     await Token.findByIdAndRemove(token._id);

//     res.send("email verified sucessfully");
//   } catch (error) {
//     res.status(400).send("An error occured");
//   }
// });

// module.exports = router;

module.exports = {sendEmail, verifyEmail};