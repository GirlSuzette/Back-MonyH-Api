const ODM = require("mongoose");

const Schema = new ODM.Schema({
  _id: ODM.Schema.Types.ObjectId,
  concept: {
    type: String,
    required: true
  },
  ahorro: {
    type: Number,
    required: true
  },
  inicio: {
    type: Date,
    required: true
  },
  duracion: {
    type: String,
    required: true
  },
  periodo: {
    type: String,
    required: true
  },

  user: {
    type: ODM.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = ODM.model("Saving", Schema);