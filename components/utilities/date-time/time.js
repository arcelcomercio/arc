export const msToTime = (duration = 5555, seo = true) => {
  let seconds = parseInt((duration / 1000) % 60, 0)
  let minutes = parseInt((duration / (1000 * 60)) % 60, 0)
  let hours = parseInt((duration / (1000 * 60 * 60)) % 24, 0)
  let resultSeo = ''
  if (seo) {
    hours = hours < 10 ? `0${hours}:` : hours
    minutes = minutes < 10 ? `0${minutes}` : minutes
    seconds = seconds < 10 ? `0${seconds}` : seconds
    resultSeo = `${(hours !== '00:' && hours) || ''}${minutes}:${seconds}`
  } else {
    hours = hours >= 1 ? `${hours}H` : ''
    minutes = minutes >= 1 ? `${minutes}M` : ''
    seconds = seconds >= 1 ? `${seconds}S` : ''
    resultSeo = `PT${hours}${minutes}${seconds}`
  }
  return resultSeo
}
export const msToTimestamp = (timestamp = 1575909015) => {
  const date = new Date(timestamp.toString() * 1000)
  date.setHours(date.getHours() - 5)

  const hours =
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`

  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`

  const formattedDate = `${date.getFullYear()}-${date.getMonth() +
    1}-${date.getDate()}T${hours}:${minutes}`

  return formattedDate
}
export const msToTimeJplayer = (duration = '03.20') => {
  const result = duration.split('.')
  const minutes = result[0] >= 1 ? `${result[0]}M` : ''
  const seconds = result[1] >= 1 ? `${result[1]}S` : ''
  return `PT${minutes}${seconds}`
}

export const formatAMPM = _date => {
  const date = new Date(_date)
  let hours = date.getHours()
  let minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'
  hours %= 12
  hours = hours || 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? `0${minutes}` : minutes
  const strTime = `${hours}:${minutes} ${ampm}`
  return strTime
}

export const formatDate = date => {
  const actual = new Date()
  const day = actual.getDate()
  const month = actual.getMonth() + 1
  const year = actual.getFullYear()

  const formatDay = day < 10 ? `0${day}` : day
  const formatMonth = month < 10 ? `0${month}` : month
  const fechaGenerada = `${year}-${formatMonth}-${formatDay}`

  const fechaEntrante = date.slice(0, 10)
  const fecha =
    fechaEntrante === fechaGenerada
      ? date.slice(date.indexOf('T') + 1, 16)
      : fechaEntrante
  return fecha
}
