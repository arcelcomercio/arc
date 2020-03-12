import { arrayDays, arrayMonths } from './constants'

// Extraida de ./time.js
export const formattedTime = date => {
  const hours =
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`

  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`

  return `${hours}:${minutes}`
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
  return showTime ? `${formattedDate}, ${formattedTime(date)}` : formattedDate
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
