const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require('nodemailer');

let config = {
    service: 'gmail', // your email domain
    auth: {
        user: process.env.NODEJS_GMAIL_APP_USER, // your email address
        pass: process.env.NODEJS_GMAIL_APP_PASSWORD // your password
    }
}

let transporter = nodemailer.createTransport(config);

const createMail = (email, subject, html) => {
    const message = {
        from: '321prakhar0039@dbit.in',
        to: email,
        subject: subject,
        html: html,
    }
        
    transporter.sendMail(message)
    .then((info) => {
        console.log("Email sent", info.messageId);
    })
    .catch((err) => {
        console.log("Error sending email", err);
    })
}

module.exports = createMail;