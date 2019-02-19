const ODM = require('mongoose')

const Schema = new ODM.Schema(
  {
    _id: ODM.Schema.Types.ObjectId,
    concept: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    user: {
      type: ODM.Schema.Types.ObjectId,
      ref: 'User'
    },
    balance: {
      type: ODM.Schema.Types.ObjectId,
      ref: 'Balance'
    }
  },
  { timestamps: true }
)

module.exports = ODM.model('Income', Schema)
