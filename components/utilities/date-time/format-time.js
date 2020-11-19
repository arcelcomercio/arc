/**
 *
 * @param {Date} date
 * @returns {string} 09:30
 */
const formatTime = date => {
  const dateTime = new Intl.DateTimeFormat('es', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Lima',
  })

  return dateTime.format(date)
}

export default formatTime
