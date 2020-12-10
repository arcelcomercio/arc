import { locale } from './constants'

/**
 *
 * @param {Date} date
 * @returns {string} YYYY-MM-DD
 */
export const getYYYYMMDDfromISO = date =>
  date.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]

/**
 *
 * @returns {string} YYYY-MM-DD
 */
export const getActualDate = () => {
  const today = new Date()
  today.setHours(today.getHours() - 5)
  return getYYYYMMDDfromISO(today)
}

/**
 *
 * @param {object} config
 * @param {Date} config.date
 * @param {boolean} [config.showTime=true]
 * @param {boolean} [config.showWeekday=true]
 * @returns {string} jueves, 19 de noviembre de 2020 09:30 a.m.
 */
export const getVerboseDate = ({
  date,
  showTime = true,
  showWeekday = true,
}) => {
  const baseFormat = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Lima',
    hour12: true,
  }
  const weekday = showWeekday
    ? {
        weekday: 'long',
      }
    : {}
  const time = showTime
    ? {
        hour: '2-digit',
        minute: '2-digit',
      }
    : {}
  const dateTime = new Intl.DateTimeFormat(locale, {
    ...baseFormat,
    ...weekday,
    ...time,
  })

  return dateTime.format(new Date(date))
}

/**
 *
 * @deprecated usar getVerboseDate
 * @param {Date} date
 * @param {boolean} [showTime=true]
 * @param {boolean} [showWeekday=true]
 * @returns {string} jueves, 19 de noviembre de 2020 09:30 a.m.
 */
export const formatDayMonthYear = (
  currentDate,
  showTime = true,
  showWeekday = true
) => getVerboseDate({ date: currentDate, showTime, showWeekday })

/**
 *
 * @deprecated usar getVerboseDate
 * @param {Date} date
 * @param {boolean} [showTime=true]
 * @param {boolean} [showWeekday=true]
 * @returns {string} 19 de noviembre de 2020 09:30 a.m.
 */
export const formatDayMonthYearBasic = (currentDate, showTime = true) =>
  getVerboseDate({ date: currentDate, showTime, showWeekday: false })

/**
 *
 * Esta funcion reemplaza getDateSeo por + eficiencia
 * @param {string} date
 * @returns {string} 2020-11-19T09:30:00-05:00
 */
export const localISODate = date => {
  let localDate = date ? new Date(date) : new Date()
  localDate.setHours(localDate.getHours() - 5)
  localDate = `${localDate.toISOString().split('.')[0]}-05:00`
  return localDate
}

/**
 *
 * @deprecated usar localISODate
 * @param {string} date
 * @returns {string} 2020-11-19T09:30:00-05:00
 */
export const getDateSeo = date => localISODate(date)

/**
 *
 * @param {string} date
 * @param {void} [cb] callback
 * @returns {string | cb} 19/11/2020, 09:30 a.m. | callback
 */
export const formatDateTime = (date, cb) => {
  const newDate = date ? new Date(date) : new Date()
  const dateTime = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: 'America/Lima',
    hour12: true,
  })

  const formattedDateTime = dateTime.format(newDate)
  return cb ? cb(formattedDateTime) : formattedDateTime
}

/**
 *
 * @param {string} date
 * @returns {string} Actualizado el 19/11/2020, 09:30 a.m.
 */
export const formatDateStory = date =>
  formatDateTime(date, formattedDate => `Actualizado el ${formattedDate}`)

/**
 *
 * @param {Date} date
 * @returns {string} 09:30
 */
export const formattedTime = date => {
  const hours =
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`

  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`

  return `${hours}:${minutes}`
}

/**
 *
 * @param {string} publishDateString
 * @param {string} [delimiter=-]
 * @param {boolean} [isClient=false]
 * @param {boolean} [todayHour=true]
 * @returns {string} 09:30 || 2020-11-19
 */
export const formatDateLocalTimeZone = (
  publishDateString,
  delimiter = '-',
  isClient = false,
  todayHour = true
) => {
  const publishDate = new Date(publishDateString)
  if (!isClient) publishDate.setHours(publishDate.getHours() - 5)

  const today = new Date()
  if (!isClient) today.setHours(today.getHours() - 5)

  let formattedDate = ''

  if (
    getYYYYMMDDfromISO(publishDate) === getYYYYMMDDfromISO(today) &&
    todayHour
  )
    formattedDate = formattedTime(publishDate)
  else {
    // eslint-disable-next-line prefer-destructuring
    formattedDate = publishDate.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]
    formattedDate = formattedDate.replace(/-/g, delimiter)
  }
  return formattedDate
}

/**
 *
 * @param {string} string date
 * @returns {Date}
 */
export const loadDateFromYYYYMMDD = string => {
  if (!/\d{4}-\d{2}-\d{2}/.test(string)) {
    return null
  }
  const year = parseInt(string.slice(0, 4), 10)
  const month = parseInt(string.slice(5, 7), 10) - 1
  const day = parseInt(string.slice(8, 10), 10)

  return new Date(year, month, day)
}
