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
    try {
      const newExpense = await createExpense({ date, itemDesc, amount })
      //return the database with the new item
      res.json({ data: newExpense });
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "internal server error" })
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
