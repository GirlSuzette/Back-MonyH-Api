const Nexmo = require('nexmo')

const sendSms = fullName => {
  const nexmo = new Nexmo({
    apiKey: 'cfe089da',
    apiSecret: 'cRQsMIyv015nFMaZ'
  })

  const from = 'Nexmo'
  const to = '5215610591995'
  const text = `Hola ${fullName}, recuerda pagar el Gasto de la Renta`

  nexmo.message.sendSms(from, to, text)
}

module.exports = sendSms
