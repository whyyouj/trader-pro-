const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

require("./startup/config")();
require("./startup/db")();
require("./startup/routes")(app);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
