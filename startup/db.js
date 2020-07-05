const mongoose = require("mongoose");

const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost/startup-template";

module.exports = function () {
  mongoose.set("useFindAndModify", false);
  mongoose.set("useCreateIndex");

  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to MongoDB!", err));
};
