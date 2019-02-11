const ODM = require("mongoose");

const Saving = require("../models/Saving");

const Savings = {
    index: (req, res) => {
        Saving
            .find()
            .populate({
                path: "user",
                select: "_id fullName"
            })
            .exec()
            .then(savings => {
                res
                    .status(200)
                    .json({
                        meta: savings.length,
                        data: Savings
                    });
            })
            .catch(error => console.log(error));
    },

    create: (req, res) => {
        const newSaving = new Saving({
            _id: new ODM.Types.ObjectId(),
            concept: req.body.concept,
            quantity: req.body.quantity,
            date: req.body.date,
            type: req.body.type,
            status: req.body.status,
            user: req.params.userId
        });
        console.log(newSaving)

        newSaving
            .save()
            .then(savingCreated => {
                res
                    .status(200)
                    .json({
                        data: savingCreated
                    });
            })
            .catch(error => console.log(error));
    },

    delete: (req, res) => {
        const { savingId } = req.params;

        Saving
            .findOneAndDelete(savingId)
            .exec()
            .then(saving => {
                res
                    .status(200)
                    .json({
                        msg: `${saving.concept} was deleted.`
                    });
            })
            .catch(error => console.log(error));
    }

}

module.exports = Savings