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

  create: (req, res) => {
    const newIncome = new Income({
      _id: new ODM.Types.ObjectId(),
      concept: req.body.concept,
      quantity: req.body.quantity,
      date: req.body.date,
      type: req.body.type,
      status: req.body.status,
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

  delete: (req, res) => {
    const { incomesId } = req.params;

    Income
      .findOneAndDelete(incomesId)
      .exec()
      .then(income => {
        res
          .status(200)
          .json({
            msg: `${income.concept} was deleted.`
          });
      })
      .catch(error => console.log(error));
  }

}

module.exports = Incomes