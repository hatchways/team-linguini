const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/authRoutes")
const boardRouter = require('./routes/boards');
const columnRouter = require('./routes/columns');
const cardRouter = require('./routes/cards');
const connectToDB = require('./middlewares/database');
const req = require('./utils/sendEmail');

const { json, urlencoded } = express;

var app = express();

//Connect to local database
connectToDB();

//Testing sendEmail
req.end();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/boards", boardRouter);
app.use("/api/v1/columns", columnRouter);
app.use("/api/v1/cards", cardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  console.log(err);

  if (err.name === 'CastError'){
    res.status(404).json({error: "Invalid Object Id."})
  };

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message});
});

module.exports = app;
