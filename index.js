const express = require('express');
const app = express();
const nodeMailer = require('nodemailer');
require('dotenv').config();

const transporter = nodeMailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
    },
});

const mailOptions = {
    from: process.env.MY_EMAIL,
    to: 'jmedinamulet@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent:' + info.response);
    }
});





app.listen(3000, () => console.log('Server started on', 3000));