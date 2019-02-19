const ODM = require('mongoose')

const Balance = require('../models/Balance')

const Balances = {
  index: (req, res) => {
    Balance.find()
      .populate({
        path: 'user',
        select: '_id fullName'
      })
      .exec()
      .then(Balance => {
        res.status(200).json({
          meta: Balance.length,
          data: Balance
        })
      })
      .catch(error => console.log(error))
  }
}

module.exports = Balances
