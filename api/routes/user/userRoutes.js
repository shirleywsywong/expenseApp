const express = require("express");
const userRouter = express.Router();
const { createUser, findUserByEmail } = require("./userService")

//base route is for sign up new user
userRouter.route("/")
  .post(async (req, res) => {
    const { email, password } = req.body;
    if (!email || email === "") {
      res.status(400).json({ message: "email must be provided" })
      return
    }

    if (!password || password === "") {
      res.status(400).json({ message: "password must be provided" });
      return;
    }


    try {
      const existingUser = await findUserByEmail(email);
      if (existingUser) {
        res.status(400).json({ message: `email ${email} already exists` })
      }
      const newUser = await createUser({ email, password })
      res.json({ data: newUser })
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "internal server error" })
    }
    res.send("sign up for new user");
  });

userRouter.route("/login").get((req, res) => {
  res.send("login for existing user");
});

module.exports = userRouter;
