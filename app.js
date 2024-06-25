const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
var expressLayouts = require("express-ejs-layouts");
const router = require("./src/Routes/main-route");

dotenv.config();
require("./src/config/db-connect");
const port = process.env.PORT;
const app = express();

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public", "assets")));

app.use(router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
