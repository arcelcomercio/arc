import { arrayDays, arrayMonths } from './constants'
import formatTime from './format-time'

export const getYYYYMMDDfromISO = date =>
  date.toISOString().match(/\d{4}-\d{2}-\d{2}/)[0]

export const getActualDate = () => {
  const today = new Date()
  today.setHours(today.getHours() - 5)
  return getYYYYMMDDfromISO(today)
}

export const formatDayMonthYear = (
  currentDate,
  showTime = true,
  isStatic = false
) => {
  const date = new Date(currentDate)

  if (isStatic) date.setHours(date.getHours() - 5)

  const formattedDate = `${arrayDays[date.getDay()]} ${date.getDate()} de ${
    arrayMonths[date.getMonth()]
  } del ${date.getFullYear()}`
  return showTime ? `${formattedDate}, ${formatTime(date)}` : formattedDate
}

export const formatDayMonthYearBasic = (
  currentDate,
  showTime = true,
  isStatic = false
) => {
  const date = new Date(currentDate)

  if (isStatic) date.setHours(date.getHours() - 5)

  const formattedDate = `${date.getDate()} de ${
    arrayMonths[date.getMonth()]
  } ${date.getFullYear()}`
  return showTime ? `${formattedDate}, ${formatTime(date)}` : formattedDate
}

export const getDateSeo = data => {
  const fechaZone = data
    ? data.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)[0]
    : new Date()
  const fecha = new Date(fechaZone)
  fecha.setHours(fecha.getHours() - 5)
  const day = fecha.getDate()
  const month = fecha.getMonth() + 1
  const year = fecha.getFullYear()
  const hours = fecha.getHours()
  const minutes = fecha.getMinutes()
  const seconds = fecha.getSeconds()

  const formatDay = day < 10 ? `0${day}` : day
  const formatMonth = month < 10 ? `0${month}` : month
  const formatHours = hours < 10 ? `0${hours}` : hours
  const formatMinutes = minutes < 10 ? `0${minutes}` : minutes
  const formatSeconds = seconds < 10 ? `0${seconds}` : seconds

  const fechaGenerada = `${year}-${formatMonth}-${formatDay}T${formatHours}:${formatMinutes}:${formatSeconds}-05:00`

  return fechaGenerada
}

export const formatDateStory = date => {
  const fechaZone = date.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)[0]
  const fecha = new Date(fechaZone)
  const day = fecha.getDate()
  const month = fecha.getMonth() + 1
  const formatDay = day < 10 ? `0${day}` : day
  const formatMonth = month < 10 ? `0${month}` : month

  const minutes = fecha.getMinutes()
  const hours = fecha.getHours()

  const formatHours = hours < 10 ? `0${hours}` : hours
  const formatMinutes = minutes < 10 ? `0${minutes}` : minutes

  return `Actualizado el ${formatDay}/${formatMonth}/${fecha.getFullYear()} a las ${formatHours}:${formatMinutes} `
}

export const formattedTime = date => {
  const hours =
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`

  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`

  return `${hours}:${minutes}`
}

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

export const loadDateFromYYYYMMDD = string => {
  if (!string.match(/\d{4}-\d{2}-\d{2}/)) {
    return null
  }
  const year = parseInt(string.slice(0, 4), 10)
  const month = parseInt(string.slice(5, 7), 10) - 1
  const day = parseInt(string.slice(8, 10), 10)

  return new Date(year, month, day)
}
