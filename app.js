const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const router = require("./src/Routes/main-route");
const pageRouter = require("./src/Routes/page-route");
const bikeRouter = require("./src/Routes/bike-route");

dotenv.config();
require("./src/config/db-connect");

const port = process.env.PORT || 8080;
const app = express();

app.disable("x-powered-by");
app.use(methodOverride("_method")); // for use method PUT and DELETE
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
  })
);

app.use(flash());

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public", "assets")));

app.use(router);
app.use(pageRouter);
app.use(bikeRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
