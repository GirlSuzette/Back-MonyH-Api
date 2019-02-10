const ODM = require("mongoose");

const Saving = require("../models/Saving");

const Savings = {
    index: (request, response) => {
        Saving
            .find()
            .populate({
                path: "user",
                select: "_id fullName"
            })
            .exec()
            .then(savings => {
                response
                    .status(200)
                    .json({
                        meta: savings.length,
                        data: Savings
                    });
            })
            .catch(error => console.log(error));
    },

    create: (request, response) => {
        const newSaving = new Saving({
            _id: new ODM.Types.ObjectId(),
            concept: request.body.concept,
            quantity: request.body.quantity,
            date: request.body.date,
            type: request.body.type,
            status: request.body.status,
            user: request.body.user
        });
        console.log(newSaving)

        newSaving
            .save()
            .then(savingCreated => {
                response
                    .status(200)
                    .json({
                        data: savingCreated
                    });
            })
            .catch(error => console.log(error));
    },

    delete: (request, response) => {
        const { savingId } = request.params;

        Saving
            .findOneAndDelete(savingId)
            .exec()
            .then(saving => {
                response
                    .status(200)
                    .json({
                        msg: `${saving.concept} was deleted.`
                    });
            })
            .catch(error => console.log(error));
    }

}

module.exports = Savings