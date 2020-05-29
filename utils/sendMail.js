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

module.exports = async function (email, url) {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      to: email, // receiver
      subject: "Email Confirmation", // Subject line
      // text: "Hello world?", // plain text body
      html: `<h2>Thanks for signing up</h2>
      <p>Please <a href=${url}>Click Here</a> to confirm your email</p>`, // html body
    });

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.log("Sending Failed: ", err);
  }
};
