const ODM = require('mongoose')

const Reminder = require('../models/Reminder')
// const Nexmo = require('nexmo')

const Reminders = {
  index: (req, res) => {
    Reminder.find()
      .populate({
        path: 'user',
        select: 'phoneNumber'
      })
      .exec()
      .then(reminders => {
        res.status(200).json({
          data: reminders
        })
      })
      .catch(error => console.log(error))
  },

  create: (req, res) => {
    const newReminder = new Reminder({
      _id: new ODM.Types.ObjectId(),
      concept: req.body.concept,
      date: req.body.date,
      user: req.params.userId,
      expense: req.params.userId
    })
    console.log(newReminder)

    newReminder
      .save()
      .then(reminderCreated => {
        res.status(200).json({
          message: 'Reminder created successfully',
          data: reminderCreated
        })
      })
      .catch(error => console.log(error))
  },
  findBy: (req, res) => {
    Reminder.findById(req.params.reminderId)
      .then(data => {
        res
          .json({
            type: 'Found Reminder by Id',
            data: data
          })
          .status(200)
      })
      .catch(err => {
        console.log(`caugth err: ${err}`)
        return res.status(500).json(err)
      })
  },
  updateBy: (req, res) => {
    Reminder.updateOne(
      { _id: req.params.reminderId },
      {
        concept: req.body.concept,
        date: req.body.date,
        quantity: req.body.quantity
      }
    )
      .then(data => {
        res
          .json({
            type: 'Update Reminders',
            data: data
          })
          .status(200)
      })
      .catch(err => {
        console.log(`caugth err: ${err}`)
        return res.status(500).json(err)
      })
  },

  delete: (req, res) => {
    const { reminderId } = req.params
    Reminder.findOneAndDelete(reminderId)
      .exec()
      .then(reminder => {
        res.status(200).json({
          msg: `${reminder.concept} was deleted.`
        })
      })
      .catch(error => console.log(error))
  }
}

module.exports = Reminders
