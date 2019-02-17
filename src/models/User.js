const ODM = require("mongoose");
// const bcrypt = require("bcrypt-nodejs")

const userSchema = new ODM.Schema({
  _id: ODM.Schema.Types.ObjectId,
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  phoneNumber: {
    type: Number
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });


module.exports = ODM.model("User", userSchema);







