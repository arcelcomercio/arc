export const msToTime = (duration: number | string = 0, seo = true): string => {
  const durationNumber =
    typeof duration === 'string' ? parseInt(duration, 10) : duration
  const seconds = Math.floor((durationNumber / 1000) % 60)
  const minutes = Math.floor((durationNumber / (1000 * 60)) % 60)
  const hours = Math.floor((durationNumber / (1000 * 60 * 60)) % 24)
  let resultSeo = ''
  if (seo) {
    const h = hours < 10 ? `0${hours}` : hours
    const m = minutes < 10 ? `0${minutes}` : minutes
    const s = seconds < 10 ? `0${seconds}` : seconds
    resultSeo = `${(h !== '00' && `${h}:`) || ''}${m}:${s}`
  } else {
    const h = hours >= 1 ? `${hours}H` : ''
    const m = minutes >= 1 ? `${minutes}M` : ''
    const s = seconds >= 1 ? `${seconds}S` : ''
    resultSeo = `PT${h}${m}${s}`
  }
  return resultSeo
}

export const secToTime = (
  duration: number | string = 0,
  withHour = false
): string => {
  const secNum =
    typeof duration === 'string' ? parseInt(duration, 10) : duration

  const hours = Math.floor(secNum / 3600)
  const minutes = Math.floor((secNum - hours * 3600) / 60)
  const seconds = secNum - hours * 3600 - minutes * 60

  const h = hours < 10 ? `0${hours}` : hours
  const m = minutes < 10 ? `0${minutes}` : minutes
  const s = seconds < 10 ? `0${seconds}` : seconds
  return `${withHour ? `${h}:` : ''}${m}:${s}`
}

export const msToTimestamp = (timestamp = 1575909015): string => {
  const date = new Date((timestamp * 1000).toString())
  date.setHours(date.getHours() - 5)

  const hours =
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`

  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`

  const formattedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}T${hours}:${minutes}`

  return formattedDate
}

export const msToTimeJplayer = (duration = '03.20'): string => {
  const result = duration.split('.')
  const minutes = parseInt(result[0], 10) >= 1 ? `${result[0]}M` : ''
  const seconds = parseInt(result[1], 10) >= 1 ? `${result[1]}S` : ''
  return `PT${minutes}${seconds}`
}

export const formatAMPM = (customDate: string): string => {
  const date = new Date(customDate)
  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'
  hours %= 12
  hours = hours || 12 // the hour '0' should be '12'
  const strTime = `${hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`
  return strTime
}
