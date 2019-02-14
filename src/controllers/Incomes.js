const ODM = require("mongoose");

const Income = require("../models/Income");

const Incomes = {
  index: (req, res) => {
    Income
      .find()
      .populate({
        path: "user",
        select: "_id fullName"
      })
      .exec()
      .then(incomes => {
        res
          .status(200)
          .json({
            meta: incomes.length,
            data: incomes
          });
      })
      .catch(error => console.log(error));
  },
  findBy: (req, res) => {
    Income
      .findById(req.params.incomeId)
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
    const newIncome = new Income({
      _id: new ODM.Types.ObjectId(),
      concept: req.body.concept,
      quantity: req.body.quantity,
      date: req.body.date,
      type: req.body.type,
      user: req.params.userId
    });
    console.log(newIncome)

    newIncome
      .save()
      .then(incomeCreated => {
        res
          .status(200)
          .json({
            data: incomeCreated
          });
      })
      .catch(error => console.log(error));
  },
  updateBy: (req, res) => {
    Income
      .updateOne({ _id: req.params.incomeId }, {
        concept: req.body.concept,
        quantity: req.body.quantity,
        date: req.body.date,
        type: req.body.type,
      })
      .then(data => {
        res.json({
          type: 'Update Incomes',
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
    const { incomeId } = req.params;

    Income
      .findOneAndDelete(incomeId)
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

module.exports = Incomes