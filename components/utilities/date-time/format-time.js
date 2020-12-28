import { locale } from './constants'

/**
 *
 * @param {Date} date
 * @returns {string} 09:30 a.m.
 */
const formatTime = date => {
  const dateTime = new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Lima',
    hour12: true,
  })

  return dateTime.format(date)
}

export default formatTime
