const schedule = require('node-schedule')
// const Reminders = require('../controllers/Reminders')
const Reminder = require('../models/Reminder')

var CronJob = schedule.scheduleJob('*/1 * * * *', function () {
  Reminder.find()
    .populate({
      path: 'user',
      select: 'phoneNumber'
    })
    .exec()
    .then(reminders => {
      console.log(reminders)
      console.log(new Date())
      res.status(200).json({
        data: reminders
      })
    })
    .catch(error => console.log(error))
})

module.export = CronJob
