const ODM = require('mongoose')

const Reminder = require('../models/Reminder')
const schedule = require('node-schedule')
const Nexmo = require('nexmo')

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

        date = reminderCreated.date
        const d = date.replace(/T/g, '-')
        const y = d.split('-')
        const newDate = y[0] + ', ' + y[1] + ', ' + y[2]
        const horas = y[3].replace(/:/g, '-')
        const h = horas.split('-')
        const formaDate = newDate + h[0] + ', ' + h[1] + 0

        console.log(formaDate)
        var formate = new Date(formaDate)

        // var date = new Date(2019, 1, 19, 22, 43, 0)

        const nexmo = new Nexmo({
          apiKey: '8dd0cb56',
          apiSecret: 'QFFiJGi80cQH9cXc'
        })
        // var j = schedule.scheduleJob(formate, function (reminderCreated) {
        //   console.log('entr')
        //   nexmo.message.sendSms(
        //     '522282220235',
        //     '525610591995',
        //     'hoy te toca el pago ' + reminderCreated.concept,
        //     (err, responseData) => {
        //       if (err) {
        //         console.log(err)
        //       } else {
        //         console.dir(responseData)
        //       }
        //     }
        //   )
        // })
        var k = schedule.scheduleJob(date, function () {
          console.log('enrr')
          nexmo.message.sendSms(
            '522282220235',
            '522282220235',
            'Hoy te toca el pago ' + reminderCreated.concept,
            (err, responseData) => {
              if (err) {
                console.log(err)
              } else {
                console.dir(responseData)
              }
            }
          )
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
