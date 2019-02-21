const Nexmo = require('nexmo')

const sendSms = concept => {
  const nexmo = new Nexmo({
    apiKey: '00eabd5f',
    apiSecret: 'CpLhv8kQK6zDqg8M'
  })

  const from = 'Nexmo'
  const to = '522282220235'
  const text = `Remember you Expense about ${concept} from Money Home `

  nexmo.message.sendSms(from, to, text)
}

module.exports = sendSms
