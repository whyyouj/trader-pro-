const express = require("express");
const app = express();
require("dotenv").config();

require("./startup/logging")();
require("./startup/config")();
require("./startup/db")();
require("./startup/routes")(app);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
