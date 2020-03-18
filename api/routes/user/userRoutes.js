const express = require("express");
const userRouter = express.Router();
const { createUser, findUserByEmail } = require("./userService")
const { createToken } = require("../utils/jwt")

//base route is for sign up new user
userRouter.route("/")
  .post(async (req, res) => {
    const { email, password } = req.body;

    //this error handling is to check if input fields are complete
    if (!email || email === "") {
      res.status(400).json({ message: "Email must be provided" })
      return
    }

    if (!password || password === "") {
      res.status(400).json({ message: "Password must be provided" });
      return;
    }

    //now that we verified all the input fields are complete... 
    try {
      //if the user already exist, return another error
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: `Email ${email} already exists` })
        return
      }

      //finally, add a new user, function is defined in userService
      const newUser = await createUser({ email, password })

      //new user is created. This request is technically done, but to allow user to continue with the app (add in expense item), create JWT and put it in middleware (subsequent requests won't have req.body to contain EM and PW, and middleware b/c it can be attached to all subsequent requests)
      const token = createToken({
        email: newUser.email,
        id: newUser._id,
      })

      res.json({ data: { accessToken: token } })
      //reply with JWT for the front end (client-side), and client will have to store this in local storage
    } catch (err) {
      //this error handling is for any errors that occur related to the database
      console.log(err)
      res.status(500).json({ message: "Internal server error" })
    }
  });

userRouter.route("/login")
  .post(async (req, res) => {
    const { email, password } = req.body;

    //this error handling is to check if input fields are complete
    if (!email || email === "") {
      res.status(400).json({ message: "Email must be provided" })
      return
    }

    if (!password || password === "") {
      res.status(400).json({ message: "Password must be provided" });
      return;
    }

    try {
      //if the user doesn't already exist, return another error
      const existingUser = await findUserByEmail(email);
      if (!existingUser) {
        res.status(400).json({ message: `Email ${email} doesn't exist. Please sign up for an account.` })
        return
      }

      //compare password with what is entered to what is in database to find match, function is written in userModel b/c it already imported bcrypt
      const isMatch = await existingUser.comparePasswords(password);
      if (!isMatch) {
        res.status(400).json({ message: 'Email and password do not match.' });
        return;
      }

      //if the user is a match, create a JWT for the user to continue      
      const loggedInToken = createToken({ id: existingUser._id });

      res.json({ data: { accessToken: loggedInToken } })
      //same as with create user, store token to front-end's Async Storage (mobile app specific)
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "internal server error" })
    }
  });

module.exports = userRouter;
