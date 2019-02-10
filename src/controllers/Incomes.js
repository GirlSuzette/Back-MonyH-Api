const ODM = require("mongoose");

const Income = require("../models/Income");

const Incomes = {
  index: (request, response) => {
    Income
      .find()
      .populate({
        path: "user",
        select: "_id fullName"
      })
      .exec()
      .then(incomes => {
        response
          .status(200)
          .json({
            meta: incomes.length,
            data: incomes
          });
      })
      .catch(error => console.log(error));
  },

  create: (request, response) => {
    const newIncome = new Income({
      _id: new ODM.Types.ObjectId(),
      concept: request.body.concept,
      quantity: request.body.quantity,
      date: request.body.date,
      type: request.body.type,
      status: request.body.status,
      user: request.body.user
    });
    console.log(newIncome)

    newIncome
      .save()
      .then(incomeCreated => {
        response
          .status(200)
          .json({
            data: incomeCreated
          });
      })
      .catch(error => console.log(error));
  },

  delete: (request, response) => {
    const { incomesId } = request.params;

    Income
      .findOneAndDelete(incomesId)
      .exec()
      .then(income => {
        response
          .status(200)
          .json({
            msg: `${income.concept} was deleted.`
          });
      })
      .catch(error => console.log(error));
  }

}

module.exports = Incomes