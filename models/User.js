const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("@hapi/joi");
const jwt = require("jsonwebtoken");

const secretKey = process.env.jwtPrivateKey;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1024,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function (expiryTime = "1d") {
  const token = jwt.sign({ id: this._id, name: this.name }, secretKey, {
    expiresIn: expiryTime,
  });
  return token;
};

const validateUser = function (user) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).max(255).required(),
    lastName: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(user);
};

const validateEmail = function (email) {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .message("Invalid email address!")
      .max(255)
      .required(),
  });

  return schema.validate(email);
};

module.exports = mongoose.model("User", userSchema);
module.exports.validateUser = validateUser;
module.exports.validateEmail = validateEmail;
