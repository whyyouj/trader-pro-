const nodemailer = require("nodemailer");

const {
  GMAIL_USER,
  CLIENT_ID,
  CLIENT_SECRET,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
} = process.env;

console.log(CLIENT_ID);

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    type: "OAuth2",
    user: GMAIL_USER,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: ACCESS_TOKEN,
    expires: 1484314697598,
  },
});

module.exports = async function (email, subjectLine, template) {
  // send mail with defined transport object
  await transporter.sendMail({
    to: email, // receiver
    subject: subjectLine, // Subject line
    html: template, // html body
  });
};
