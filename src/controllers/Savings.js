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
            savingFor: req.body.savingFor,
            startDate: req.body.startDate,
            duration: req.body.duration,
            period: req.body.period,
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
    findBy: (req, res) => {
        Saving
            .findById(req.params.savingId)
            .then(data => {
                res.json({
                    type: 'Found Expenses by Id',
                    data: data
                })
                    .status(200)
            })
            .catch(err => {
                console.log(`caugth err: ${err}`);
                return res.status(500).json(err)
            })
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