const Expense = require("./expenseModel");

exports.createExpense = async ({ date, itemDesc, amount }) => {
  // we want to save it to db
  //1. create new instance of Expense model (so we have mongoose methods)
  // Expense is coming from expenseModel
  const newExpenseItem = new Expense({
    date,
    itemDesc,
    amount
  });

  //2. call the save method on Expense
  const newExpenseItemDB = await newExpenseItem.save();
  return newExpenseItemDB
}