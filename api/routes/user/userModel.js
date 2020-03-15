const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

//before save happens, encrypt the password entered by user
userSchema.pre('save', async function (next) {
  const user = this;
  try {
    //isModified is a Mongoose method. Checks to see if password has changed in the same user. If it's changed, encrypt it again.
    if (user.isModified('password') || user.isNew) {
      const encryptedPassword = await bcrypt.hash(user.password, 10);
      //hash: takes any input and produce a fixed length output. Like making a smoothie, input is an avocado, hash blends it into a smoothie, but you can't turn the smoothie back into an avocado
      user.password = encryptedPassword;
    }
    next();
  } catch (ex) {
    next(ex);
  }
})



module.exports = mongoose.model("User", userSchema)