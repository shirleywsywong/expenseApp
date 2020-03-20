const mongoose = require("mongoose");
const { Schema } = mongoose;

const expenseSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  itemDesc: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  }
})

module.exports = mongoose.model("Expense", expenseSchema)