const dotenv = require('dotenv');
const Mailgen = require('mailgen');
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

let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
        name: 'Edulib',
        link: 'http://localhost:3000/',
        logo: 'https://main--gorgeous-lokum-416ef9.netlify.app/public/assets/logo_edulib.png',
        logoHeight: '400px',
        copyright: 'Copyright © 2023 Edulib. All rights reserved.',
    }
});


const createMail = (name, email, subject, instructions) => {
    let response = {
        body: {
            name: name,
            intro: subject,
            action: {
                instructions: instructions,
                button: {
                    color: '#22BC66', 
                    text: 'Open Edulib',
                    link: 'http://localhost:3000/'
                }
            },
        }
    };
    
    let mail = MailGenerator.generate(response);

    const message = {
        from: '321prakhar0039@dbit.in',
        to: email,
        subject: subject,
        html: mail,
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