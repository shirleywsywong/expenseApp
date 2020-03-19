const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/user/userRoutes");
const expenseRouter = require("./routes/expense/expenseRoutes");
const app = express(); //app represents the whole app, only instantiate it once

//in case url has non alpha-numeric characters, it parses to url encode
app.use(express.urlencoded({ extended: true }));
//middleware to manage route modules, all the functions that is associated with '/login' will go to the loginServer module, instead of written here
app.use(express.json()); // implicitly uses body-parser! https://stackoverflow.com/a/12008719
app.use("/user", userRouter);
app.use("/expense", expenseRouter);

mongoose
  //mongodb is at port 27017
  .connect("mongodb://localhost:27017/expenseApp", {
    userNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    //talk to express through port 8000
    app.listen("8000", () => {
      console.log("8000")
    })
  })

module.exports = app;
