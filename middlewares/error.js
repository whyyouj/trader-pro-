const logger = require("../utils/logger");

module.exports = function (err, req, res, next) {
  console.log("Error Middleware: ", err);
  logger.info(err);
  res.status(500).send("Something Failed");
};
