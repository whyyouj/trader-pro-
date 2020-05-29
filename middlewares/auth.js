const jwt = require("jsonwebtoken");

const secretKey = process.env.portal_jwtPrivateKey;

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (ex) {
    console.log(ex);
    res.status(400).send("Invalid token!");
  }
};

module.exports.verifyToken = function (token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (ex) {
    console.log(ex);
    return null;
  }
};
