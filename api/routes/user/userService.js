const User = require("./userModel");

exports.createUser = async ({ email, password }) => {
  const newUser = new User({ email, password });
  const newUserDB = await newUser.save();
  //.save() method will store the email and password in plain text in the database, which is not secure. Use bcrypt so passwords are stored encrypted. bcrypt function lives in userModel because password is encryped on the schema BEFORE save happens. So that when you create a new User class, password is already encryped
  return newUserDB;
}

exports.findUserByEmail = async (email) => {
  const existingUser = await User.findOne({ email });
  return existingUser;
}


