const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const auth = require("../../middlewares/auth");
const { verifyToken } = require("../../middlewares/auth");
const asyncMiddleware = require("../../middlewares/async");
const sendEmail = require("../../utils/sendMail");
const {
  confirmationEmailTemplate,
  resetPasswordEmailTemplate,
} = require("../../utils/emailTemplates");

const User = require("../../models/User");
const { validateUser, validateEmail } = require("../../models/User");

const isProduction = process.env.NODE_ENV === "production";

router.get(
  "/me",
  [auth],
  asyncMiddleware(async (req, res) => {
    const user = await User.findById(req.user.id).select("-_id -user");
    res.send(user);
  })
);

router.post(
  "/add",
  asyncMiddleware(async (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already registered!");

    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(req.body.password, salt);

    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPasword,
    };

    user = new User(newUser);
    await user.save();

    const token = user.generateAuthToken();
    let url = `https://${req.hostname}/confirmEmail/${token}`;
    if (!isProduction) url = `http://localhost:3000/confirmEmail/${token}`;
    const template = confirmationEmailTemplate(url);

    res.send(
      "Account created Successfully.\nConfirmation email has been sent to you. "
    );

    await sendConfirmationEmail(user.email, "Confirm Email", template);
  })
);

router.get(
  "/confirmation/:token",
  asyncMiddleware(async (req, res) => {
    const user = verifyToken(req.params.token);
    if (!user) return res.status(400).send("Link expired or invalid link.");

    await User.findByIdAndUpdate(user.id, { isVerified: true });

    res.send("Email Verified Successfully!");
  })
);

router.get(
  "/forgot-password/:email",
  asyncMiddleware(async (req, res) => {
    const { error } = validateEmail(req.params);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.params.email });
    if (!user)
      return res.status(404).send({ message: "Account does not exist!" });

    const token = user.generateAuthToken("10m");
    let url = `https://${req.hostname}/resetPassword/${token}`;
    if (!isProduction) url = `http://localhost:3000/resetPassword/${token}`;

    res.send("Link for reseting password has been emailed to you.");

    const template = resetPasswordEmailTemplate(url);
    await sendEmail(user.email, "Reset Password", template);
  })
);

router.post(
  "/reset-password",
  auth,
  asyncMiddleware(async (req, res) => {
    const { password } = req.body;
    if (!password) return res.status(400).send("Password is required");

    if (password.length < 6)
      return res
        .status(400)
        .send("Password must contain atleast six characters");

    const salt = await bcrypt.genSalt(10);
    const hashedPasword = await bcrypt.hash(password, salt);

    await User.findByIdAndUpdate(req.user.id, {
      password: hashedPasword,
    });

    res.send("Password updated successfully.");
  })
);

module.exports = router;
