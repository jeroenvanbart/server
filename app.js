require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const passport = require("passport");

require("./configs/passport");
require("./configs/db.config");



const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



require("./configs/session.config")(app)

app.use(passport.initialize());
app.use(passport.session());

app.locals.title = "Express - Generated with IronGenerator";

require("./configs/cors.config")(app);



app.use("/", require("./routes/index"));
app.use("/api", require("./routes/auth.routes"));
app.use("/api", require("./routes/upload.routes"));
app.use("/api", require("./routes/user.routes"));
app.use("/api", require("./routes/pet.routes"));
app.use("/api", require("./routes/date.routes"));


module.exports = app;
