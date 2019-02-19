const ODM = require('mongoose')

const Income = require('../models/Income')
const Balance = require('../models/Balance')

const Incomes = {
  index: (req, res) => {
    Income.find()
      .populate({
        path: 'user',
        select: '_id fullName'
      })
      .exec()
      .then(incomes => {
        res.status(200).json({
          meta: incomes.length,
          data: incomes
        })
      })
      .catch(error => console.log(error))
  },
  findBy: (req, res) => {
    Income.findById(req.params.incomeId)
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
    const user = req.params.userId
    let newBalanceId = ''

    const newdate = date.split('-')

    const dateYM = `${newdate[0]}-${newdate[1]}`

    Balance.find({ period: dateYM, user: user }).then(function (dateBalan) {
      if (dateBalan.length > 0) {
        console.log(`Actualiza: ${dateBalan[0]}`)
        newBalanceId = dateBalan[0]._id
        console.log(newBalanceId)

        let sumBalance = dateBalan[0].balance + parseInt(quantity)
        let sumIncomes = dateBalan[0].incomes + parseInt(quantity)

        Balance.findOne({
          _id: dateBalan[0]._id
        }).then(balance => {
          balance.balance = sumBalance
          balance.incomes = sumIncomes
          balance.save()
        })

        console.log(dateBalan[0])
      } else {
        console.log(`Crea: ${dateBalan}`)
        const newBalance = new Balance({
          _id: new ODM.Types.ObjectId(),
          balance: quantity,
          expenses: 0,
          incomes: quantity,
          period: dateYM,
          user: user
        })
        newBalance.save()
        newBalanceId = newBalance._id
      }
      console.log(newBalanceId)
      const newIncome = new Income({
        _id: new ODM.Types.ObjectId(),
        concept: concept,
        quantity: quantity,
        date: date,
        type: type,
        user: req.params.userId,
        balance: newBalanceId
      })
      console.log(newIncome)
      newIncome
        .save()
        .then(incomeCreated => {
          res.status(200).json({
            message: 'Incomes created successfully',
            data: incomeCreated
          })
        })
        .catch(error => console.log(error))
    })
  },

  updateBy: (req, res) => {
    Income.updateOne(
      { _id: req.params.incomeId },
      {
        concept: req.body.concept,
        quantity: req.body.quantity,
        date: req.body.date,
        type: req.body.type
      }
    )
      .then(data => {
        res
          .json({
            type: 'Update Incomes',
            data: data
          })
          .status(200)
      })
      .catch(err => {
        console.log(`caugth err: ${err}`)
        return res.status(500).json(err)
      })
  },

  //   delete: (req, res) => {
  //     const { incomeId } = req.params

  //     Income.findOneAndDelete(incomeId)
  //       .exec()
  //       .then(expense => {
  //         res.status(200).json({
  //           msg: `${expense.concept} was deleted.`
  //         })
  //       })
  //       .catch(error => console.log(error))
  //   }
  // }

  delete: (req, res) => {
    Income.findById(req.params.incomeId, function (err, income) {
      if (!err) {
        // Balance.deleteMany({ income: { $in: [income._id] } }, function (err) { })
        user.remove().then(() => {
          res.status(200).json({
            message: 'Income was deleted'
          })
        })
      }
    }).catch(err => {
      console.log(`caugth err: ${err}`)
      return res.status(500).json({ message: 'You do not have permission' })
    })
  }
}

module.exports = Incomes
