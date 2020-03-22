const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    //validate if email fits the email regex
    // validate: {
    //   validator: function (v) {
    //     return /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
    //      (original example: return /([A-Z])\w+/.test(v);)
    //   },
    //   message: props => `${props.value} is not a valid email!`
    // },
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

//since pw is encrypted, we need to use bcrypt's .compare function to match the password
userSchema.methods.comparePasswords = function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
}

module.exports = mongoose.model("User", userSchema)