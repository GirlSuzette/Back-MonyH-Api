const getDate = () => {
  const year = new Date().getFullYear()
  let month = new Date().getMonth() + 1
  let day = new Date().getDate()

  month = month.toString()
  day = day.toString()

  if (month.length === 1) {
    month = '0' + month
  }

  if (day.length === 1) {
    day = '0' + day
  }

  const dateToday = `${year}-${month}-${day}`
  return dateToday
}

module.exports = getDate
