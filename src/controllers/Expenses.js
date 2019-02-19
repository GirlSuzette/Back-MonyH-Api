const ODM = require('mongoose')

const Expense = require('../models/Expense')
const Reminder = require('../models/Reminder')
const Balance = require('../models/Balance')

const Expenses = {
  index: (req, res) => {
    Expense.find()
      .populate({
        path: 'user',
        select: '_id fullName'
      })
      .exec()
      .then(expense => {
        res.status(200).json({
          meta: expense.length,
          data: expense
        })
      })
      .catch(err => {
        console.log(`caugth err: ${err}`)
        return res.status(500).json(err)
      })
  },
  findBy: (req, res) => {
    Expense.findById(req.params.expenseId)
      .then(data => {
        res
          .json({
            type: 'Found Expenses by Id',
            data: data
          })
          .status(200)
      })
      .catch(err => {
        console.log(`caugth err: ${err}`)
        return res.status(500).json(err)
      })
  },

  create: (req, res) => {
    const concept = req.body.concept
    const quantity = req.body.quantity
    const date = req.body.date
    const type = req.body.type
    const status = req.body.status
    const user = req.params.userId
    let newBalanceId = ''

    const newdate = date.split('-')

    const dateYM = `${newdate[0]}-${newdate[1]}`

    Balance.find({ period: dateYM, user: user }).then(function (dateBalance) {
      if (dateBalance.length > 0) {
        newBalanceId = dateBalance[0]._id

        let resBalance = dateBalance[0].balance - parseInt(quantity)
        let resExpenses = dateBalance[0].expenses + parseInt(quantity)

        Balance.findOne({
          _id: dateBalance[0]._id
        }).then(balance => {
          balance.balance = resBalance
          balance.expenses = resExpenses
          balance.save()
        })
      } else {
        const newBalance = new Balance({
          _id: new ODM.Types.ObjectId(),
          balance: quantity,
          expenses: quantity,
          incomes: 0,
          period: dateYM,
          user: user
        })
        newBalance.save()
        newBalanceId = newBalance._id
      }

      const newExpense = new Expense({
        _id: new ODM.Types.ObjectId(),
        concept: concept,
        quantity: quantity,
        date: date,
        type: type,
        status: status,
        user: user,
        balance: newBalanceId
      })
      console.log(newExpense)

      newExpense
        .save()
        .then(expenseCreated => {
          res.status(200).json({
            message: 'Incomes created successfully',
            data: expenseCreated
          })
        })
        .catch(error => console.log(error))
    })
  },
  findreminderBy: (req, res) => {
    Reminder.find({ user: req.params.expenseId })
      .populate({
        path: 'Expense',
        select: 'concept'
      })
      .exec()
      .then(data => {
        res
          .json({
            type: 'Finding the Reminder',
            data: data
          })
          .status(200)
      })
      .catch(err => {
        console.log(`caugth err: ${err}`)
        return res.status(500).json(err)
      })
  },
  updateBy: (req, res) => {
    Expense.updateOne(
      { _id: req.params.expenseId },
      {
        concept: req.body.concept,
        quantity: req.body.quantity,
        date: req.body.date,
        type: req.body.type,
        status: req.body.status
      }
    )
      .then(data => {
        res
          .json({
            type: 'Update Expenses',
            data: data
          })
          .status(200)
      })
      .catch(err => {
        console.log(`caugth err: ${err}`)
        return res.status(500).json(err)
      })
  },
  delete: (req, res) => {
    const { expenseId } = req.params

    Expense.findOneAndDelete(expenseId)
      .exec()
      .then(expense => {
        res.status(200).json({
          msg: `${expense.concept} was deleted.`
        })
      })
      .catch(error => console.log(error))
  }
}

module.exports = Expenses
