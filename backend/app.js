var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const indexRouter = require("./routes/index");
const userRouter = require("./routes/user.router");
const favouriteRouter = require("./routes/favourite.router");
const hostRouter = require("./routes/host.router");
const propertyRouter = require("./routes/property.router");
const reservationRouter = require("./routes/reservation.router");
const reviewRouter = require("./routes/review.router");
const cors = require("cors");

const passport = require("passport");

const connectToDb = require("./db/connect");

var app = express();
connectToDb();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());
console.log("here");
require("./middlewares/passport")(passport);
console.log("here");
app.use("/", indexRouter);
app.use("/favourite", favouriteRouter);
app.use("/host", hostRouter);
app.use("/property", propertyRouter);
app.use("/reservation", reservationRouter);
app.use("/review", reviewRouter);
app.use("/user", userRouter);
app.disable('etag');
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
