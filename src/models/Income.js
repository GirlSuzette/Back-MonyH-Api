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
  date: {
    type: Date,
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

  user: {
    type: ODM.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = ODM.model("Income", Schema);