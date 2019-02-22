const Nexmo = require('nexmo')

const sendSms = fullName => {
  const nexmo = new Nexmo({
    apiKey: '00eabd5f',
    apiSecret: 'CpLhv8kQK6zDqg8M'
  })

  const from = 'Nexmo'
  const to = '522282220235'
  const text = `Hello ${fullName} remember you Expense about Renta from Money Home `

  nexmo.message.sendSms(from, to, text)
}

module.exports = sendSms
