const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

require("./startup/config")();
require("./startup/db")();
require("./startup/routes")(app);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/dist/examination"));

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "client", "dist", "examination", "index.html")
    );
  });
}

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
