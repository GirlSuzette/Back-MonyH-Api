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
      const date = new Date()
      let dateString = date.toString()
      console.log(dateString)
      console.log(
        `${dateString.split('T')[0]}T${date.getHours()}:${date.getMinutes()}`
      )
    })
    .catch(error => console.log(error))
})

module.export = CronJob
