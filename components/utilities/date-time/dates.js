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
