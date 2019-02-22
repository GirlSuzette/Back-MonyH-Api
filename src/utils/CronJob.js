const schedule = require('node-schedule')
const Reminder = require('../models/Reminder')
const getDate = require('./getDate')
const sendSms = require('./SmsNexmo')

var CronJob = schedule.scheduleJob('*/1 * * * *', function () {
  Reminder.find()
    .populate({
      path: 'user',
      select: 'fullName'
    })
    // .populate('expense')

    .exec()
    .then(reminders => {
      //   console.log(reminders)
      const date = new Date()

      const hour = `${date.getHours()}:${date.getMinutes()}`
      const completeDate = `${getDate()}T${hour}`

      // console.log(completeDate)

      const found = reminders.filter(reminder => reminder.date === completeDate)

      console.log(`found: ${found}`)
      if (found.length > 0) {
        console.log('it works')
        sendSms(found[0].user.fullName)
        // console.log(found[0].user.fullName)
      } else {
        console.log('Dates dont match ')
      }
    })
    .catch(error => console.log(error))
})

module.export = CronJob
