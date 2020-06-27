const { createLogger, transports, format } = require("winston");
require("winston-mongodb");

let winstonFormat = format.combine(
  format.json(),
  format.prettyPrint(),
  format.colorize(),
  format.errors({ stack: true })
);

if (process.env.NODE_ENV === "production") {
  winstonFormat = format.json();
}

const logger = createLogger({
  format: winstonFormat,
  transports: [
    new transports.File({
      filename: "logs/info.log",
      level: "info",
    }),
    new transports.Console({
      level: "info",
    }),
    new transports.MongoDB({
      level: "error",
      db: process.env.MONGO_URI,
      options: {
        useUnifiedTopology: true,
      },
    }),
  ],
  exceptionHandlers: [
    new transports.File({ level: "error", filename: "logs/exceptions.log" }),
    new transports.Console({
      level: "error",
    }),
    new transports.MongoDB({
      level: "error",
      db: process.env.MONGO_URI,
      options: {
        useUnifiedTopology: true,
      },
    }),
  ],
});

module.exports = logger;
