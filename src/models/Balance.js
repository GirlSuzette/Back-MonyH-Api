const ODM = require('mongoose')

const Schema = new ODM.Schema(
  {
    _id: ODM.Schema.Types.ObjectId,
    concept: {
      type: String,
      required: true
    },
    Balance: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = ODM.model('Balance', Schema)
