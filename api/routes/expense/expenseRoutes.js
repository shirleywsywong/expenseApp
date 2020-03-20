const express = require("express");
const expenseRouter = express.Router();
const expenseData = require("../../expenseData")
const Expense = require("./expenseModel");
const { createExpense } = require("./expenseService")
const { verifyToken } = require('../../middleware/verifyToken')

// used middleware to assign a user field to the request object to verify if the user is signed in
expenseRouter.use(verifyToken);

// when I hit /expense, give me the whole list of expenses
expenseRouter.route("/").get(async (req, res) => {
  res.json(await Expense.find({}, null, (err, docs) => {
    console.log({ err, docs })
  }));
});

// 1. to create an expense, need to :
//- capture the details (date, desc, amount)
//- assign expense to user
//- ensure you are authenticated

expenseRouter
  .route("/add-item")
  // add an expense item
  .post(async (req, res) => {
    const { date, itemDesc, amount } = req.body;
    console.log("expense server: ", req.body)

    //if date is undefined, return an error
    if (!date) {
      res.status(400).json({ message: "Date is a required field" })
      return
    }

    //if item description is missing, return an error
    if (!itemDesc || itemDesc == "") {
      res.status(400).json({ message: "Item description is a required field" })
      return
    }

    //if amount is missing, return an error
    if (!amount || amount == "" || amount <= 0) {
      res.status(400).json({ message: "Amount is a required field" })
      return
    }

    //made sure all the fields are complete
    try {

      //need to grab the expense item from req.body, and the userID from req.headers. Since middleware already added user to request object, we can get it there.
      //we need userID to identify whose the owner of the expense item in database. Make sure to add a new field to our Schema
      const newExpense = await createExpense({
        date: date,
        itemDesc: itemDesc,
        amount: amount,
        userId: req.user.id
      })
      //return the database with the new item, but we're not really using the response in UI, so we can send whatever we want. We should still send something, so that the request can be completed and won't just hang.
      res.json({ data: newExpense });
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Internal server error" })
    }
  })

// when I hit /expense/itemID
expenseRouter
  .route("/:_id")
  // get details from an expense item
  .get(async (req, res) => {
    res.json(await Expense.findById(req.params._id));
  })
  .put(async (req, res) => {
    try {
      const itemToBeUpdated = await Expense.findById(req.params._id)
      await itemToBeUpdated.update(req.body)
    } catch (err) {
      throw err
    }
  })
  .delete(async (req, res) => {
    res.json(await Expense.deleteOne(req.params._id));
  })

module.exports = expenseRouter;
