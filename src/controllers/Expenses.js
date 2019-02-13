const ODM = require("mongoose");

const Expense = require("../models/Expense");
const Reminder = require('../models/Reminder');


const Expenses = {
    index: (req, res) => {
        Expense
            .find()
            .populate({
                path: "user",
                select: "_id fullName"
            })
            .exec()
            .then(expense => {
                res
                    .status(200)
                    .json({
                        meta: expense.length,
                        data: expense
                    });
            })
            .catch(err => {
                console.log(`caugth err: ${err}`);
                return res.status(500).json(err)
            })
    },
    findBy: (req, res) => {
        Expense
            .findById(req.params.expenseId)
            .then(data => {
                res.json({
                    type: 'Found Expenses by Id',
                    data: data
                })
                    .status(200)
            })
            .catch(err => {
                console.log(`caugth err: ${err}`);
                return res.status(500).json(err)
            })
    },

    create: (req, res) => {
        const newExpense = new Expense({
            _id: new ODM.Types.ObjectId(),
            concept: req.body.concept,
            quantity: req.body.quantity,
            date: req.body.date,
            type: req.body.type,
            status: req.body.status,
            user: req.params.userId
        });
        console.log(newExpense)

        newExpense
            .save()
            .then(expenseCreated => {
                res
                    .status(200)
                    .json({
                        data: expenseCreated
                    });
            })
            .catch(error => console.log(error));
    },
    findreminderBy: (req, res) => {
        Reminder
            .find({ user: req.params.expenseId })
            .populate({
                path: "Expense",
                select: "concept"
            })
            .exec()
            .then(data => {
                res.json({
                    type: 'Finding the Reminder',
                    data: data
                })
                    .status(200)
            })
            .catch(err => {
                console.log(`caugth err: ${err}`);
                return res.status(500).json(err)
            })
    },
    updateBy: (req, res) => {
        Expense
            .updateOne({ _id: req.params.expenseId }, {
                concept: req.body.concept,
                quantity: req.body.quantity,
                date: req.body.date,
                type: req.body.type,
                status: req.body.status,
            })
            .then(data => {
                res.json({
                    type: 'Update Expenses',
                    data: data
                })
                    .status(200)
            })
            .catch(err => {
                console.log(`caugth err: ${err}`);
                return res.status(500).json(err)
            })
    },
    delete: (req, res) => {
        const { expenseId } = req.params;

        Expense
            .findOneAndDelete(expenseId)
            .exec()
            .then(expense => {
                res
                    .status(200)
                    .json({
                        msg: `${expense.concept} was deleted.`
                    });
            })
            .catch(error => console.log(error));
    }

}

module.exports = Expenses