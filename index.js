const express = require('express');
const app = express();
const nodeMailer = require('nodemailer');
require('dotenv').config();

app.listen(3000, () => console.log('Server started on', 3000));