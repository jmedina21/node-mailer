const nodeMailer = require('nodemailer');
require('dotenv').config();
const puppeteer = require('puppeteer');

let giphList = [];

const giph = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://giphy.com/search/love');
    await page.waitForSelector('div.giphy-grid div:first-of-type a img.giphy-gif-img');

    const scrollDown = async () => {
        await page.evaluate(() => {
          window.scrollBy(0, window.innerHeight);
        });
      };
    
      for (let i = 0; i < 2; i++) {
        await scrollDown();
        await page.waitForTimeout(1000);
      }

      await page.waitForSelector('img.giphy-gif-img.giphy-img-loaded')

    const giph = await page.evaluate(() => {
        const images = Array.from(document.querySelectorAll('img.giphy-gif-img.giphy-img-loaded')).map((image) => image.src);
        return images.slice((images.length/2 + 1), images.length);
    });
    
    giphList.push(giph);
    await browser.close();
};

console.log("Checking Environment Variables:");
console.log("MY_EMAIL:", !!process.env.MY_EMAIL);
console.log("MY_PASSWORD:", !!process.env.MY_PASSWORD);
console.log("EMAIL_TO:", !!process.env.EMAIL_TO);

const transporter = nodeMailer.createTransport({
    service: 'hotmail',
    auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
    },
});

const gifLink = async () => {
    await giph()
    const randomIndex = Math.floor(Math.random() * giphList[0].length)
    return giphList[0][randomIndex];
};

const getEmailContent = async () => {
    const gifSrc = await gifLink();
    return `
      <h1>Hello!</h1>
      <p>Check out this cool GIF:</p>
      <img src="${gifSrc}" alt="Cool GIF">
    `;
};

const sendEmail = async () => {
    try {
        const emailContent = await getEmailContent();
        
        const mailOptions = {
            from: process.env.MY_EMAIL,
            to: process.env.EMAIL_TO,
            subject: 'Sending gif',
            html: emailContent
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent:' + info.response);
            }
        });

    } catch (error) {
        console.error("Failed to send email:", error);
    }
};

sendEmail();