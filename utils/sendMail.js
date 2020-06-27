const nodemailer = require("nodemailer");

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

module.exports = async function (email, subjectLine, template) {
  try {
    // send mail with defined transport object
    await transporter.sendMail({
      to: email, // receiver
      subject: subjectLine, // Subject line
      html: template, // html body
    });
  } catch (err) {
    console.log("Sending Failed: ", err);
  }
};
