const User = require("./userModel");

exports.createUser = async ({ email, password }) => {
  try {
    const newUser = new User({ email, password });
    const newUserDB = await newUser.save();
    return newUserDB;
  } catch (err) {
    throw err
  }
}

exports.findUserByEmail = async (email) => {
  const existingUser = await User.findOne({ email });
  return existingUser;
}

//bcrypt so passwords are not stored in plain text in database
