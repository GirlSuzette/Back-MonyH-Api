const ODM = require("mongoose");

const Schema = new ODM.Schema({
    _id: ODM.Schema.Types.ObjectId,
    concept: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },

    user: {
        type: ODM.Schema.Types.ObjectId,
        ref: "User"
    },
    expense: {
        type: ODM.Schema.Types.ObjectId,
        ref: "Expense"
    }
}, { timestamps: true });

module.exports = ODM.model("Reminder", Schema);