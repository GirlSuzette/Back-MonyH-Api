const ODM = require('mongoose')

<<<<<<< HEAD
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
    status: {
      type: String,
      required: true
    },
=======
const Schema = new ODM.Schema({
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
>>>>>>> 9d3e320184306b5888cdc7b29c02e4f254090a00

    user: {
      type: ODM.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  { timestamps: true }
)

module.exports = ODM.model('Income', Schema)
