const ODM = require("mongoose");

const Expense = require("../models/Expense");

const Expenses = {
    index: (request, response) => {
        Expense
            .find()
            .populate({
                path: "user",
                select: "_id fullName"
            })
            .exec()
            .then(expense => {
                response
                    .status(200)
                    .json({
                        meta: expense.length,
                        data: expense
                    });
            })
            .catch(error => console.log(error));
    },

    create: (request, response) => {
        const newExpense = new Expense({
            _id: new ODM.Types.ObjectId(),
            concept: request.body.concept,
            quantity: request.body.quantity,
            date: request.body.date,
            type: request.body.type,
            status: request.body.status,
            user: request.body.user
        });
        console.log(newExpense)

        newExpense
            .save()
            .then(expenseCreated => {
                response
                    .status(200)
                    .json({
                        data: expenseCreated
                    });
            })
            .catch(error => console.log(error));
    },

    delete: (request, response) => {
        const { expenseId } = request.params;

        Expense
            .findOneAndDelete(expenseId)
            .exec()
            .then(expense => {
                response
                    .status(200)
                    .json({
                        msg: `${expense.concept} was deleted.`
                    });
            })
            .catch(error => console.log(error));
    }

}

module.exports = Expenses