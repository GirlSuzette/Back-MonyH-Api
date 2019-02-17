const ODM = require("mongoose");

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
  savingFor: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  period: {
    type: String,
    required: true
  },

  user: {
    type: ODM.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = ODM.model("Saving", Schema);