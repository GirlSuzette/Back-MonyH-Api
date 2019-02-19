const ODM = require('mongoose')

const Schema = new ODM.Schema(
  {
    _id: ODM.Schema.Types.ObjectId,
    balance: {
      type: Number,
      required: true
    },
    expenses: {
      type: Number,
      required: true
    },
    incomes: {
      type: Number,
      required: true
    },
    period: {
      type: String,
      required: true
    },
    user: {
      type: ODM.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

module.exports = ODM.model('Balance', Schema)
