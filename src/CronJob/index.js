const express = require('express')
const schedule = require('node-schedule')
const Nexmo = require('nexmo')
const fetch = require('node-fetch')

const app = express()

const url = 'http://localhost:3000/api/v1/reminders'

currenDate = new Date()

fetch(url)
  .then(res => res.json())
  .then(json => json.data)
  .then(json => {
    const data = json.map(reminder => {
      if (reminder.date) {
        console.log(reminder)
      }
    })
  })
// var date = new Date(2019, 1, 16, 21, 59, 0)

// const nexmo = new Nexmo({
//   apiKey: '8dd0cb56',
//   apiSecret: 'QFFiJGi80cQH9cXc'
// })

// console.log(date)
// var j = schedule.scheduleJob(date, function () {
//   console.log('enrr')
//   nexmo.message.sendSms(
//     '522282220235',
//     '522282220235',
//     'hoy te toca el pago x ',
//     (err, responseData) => {
//       if (err) {
//         console.log(err)
//       } else {
//         console.dir(responseData)
//       }
//     }
//   )
// })

app.listen(3128)
