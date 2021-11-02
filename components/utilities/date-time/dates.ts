import { locale } from './constants'

/**
 * @returns YYYY-MM-DD
 */
export const getYYYYMMDDfromISO = (date: Date): string => {
  const match = /\d{4}-\d{2}-\d{2}/.exec(date.toISOString())
  return match ? match[0] : ''
}

/**
 * @returns YYYY-MM-DD
 */
export const getActualDate = (): string => {
  const today = new Date()
  today.setHours(today.getHours() - 5)
  return getYYYYMMDDfromISO(today)
}

type GetVerboseDateProps = {
  date: Date
  showTime?: boolean
  showWeekday?: boolean
  showYear?: boolean
  defaultTimeZone?: boolean
  longMonth?: boolean
}
/**
 * @returns jueves, 19 de noviembre de 2020 09:30 a.m.
 */
export const getVerboseDate = ({
  date,
  showTime = true,
  showWeekday = true,
  showYear = true,
  defaultTimeZone = true,
  longMonth = true,
}: GetVerboseDateProps): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: longMonth ? 'long' : 'short',
    day: 'numeric',
    hour12: true,
  }

  if (defaultTimeZone) {
    options.timeZone = 'America/Lima'
  }

  if (showWeekday) {
    options.weekday = 'long'
  }
  if (showTime) {
    options.hour = '2-digit'
    options.minute = '2-digit'
  }
  if (showYear) {
    options.year = 'numeric'
  }

  const dateTime = new Intl.DateTimeFormat(locale, options)

  return dateTime.format(new Date(date))
}

/**
 * @deprecated usar `getVerboseDate`
 * @returns jueves, 19 de noviembre de 2020 09:30 a.m.
 */
export const formatDayMonthYear = (
  currentDate: Date,
  showTime = true,
  showWeekday = true,
  showYear = true,
  defaultTimeZone = true,
  longMonth = true
): string =>
  getVerboseDate({
    date: currentDate,
    showTime,
    showWeekday,
    showYear,
    defaultTimeZone,
    longMonth,
  })

/**
 * @deprecated usar `getVerboseDate`
 * @returns 19 de noviembre de 2020 09:30 a.m.
 */
export const formatDayMonthYearBasic = (
  currentDate: Date,
  showTime = true
): string => getVerboseDate({ date: currentDate, showTime, showWeekday: false })

/**
 * Esta funcion reemplaza getDateSeo por + eficiencia
 * @returns 2020-11-19T09:30:00-05:00
 */
export const localISODate = (date?: Date): string => {
  const localDate = date ? new Date(date) : new Date()
  localDate.setHours(localDate.getHours() - 5)
  return `${localDate.toISOString().split('.')[0]}-05:00`
}

/**
 * @deprecated usar `localISODate`
 * @returns 2020-11-19T09:30:00-05:00
 */
export const getDateSeo = (date: Date): string => localISODate(date)

/**
 * @returns 19/11/2020, 09:30 a.m. | callback
 */
export const formatDateTime = (
  date: Date,
  cb?: (dateString: string) => string,
  inHours: boolean = true
): string => {
  const newDate = date ? new Date(date) : new Date()
  const dateTime = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Lima',
    hour12: true,
  })
  const inDate = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'America/Lima',
  })

  const formattedDateTime = inHours
    ? dateTime.format(newDate)
    : inDate.format(newDate)
  return cb ? cb(formattedDateTime) : formattedDateTime
}

/**
 * @returns Actualizado el 19/11/2020, 09:30 a.m. || Actualizado el 19/11/2020
 */
export const formatDateStory = (date: Date, inHours: boolean): string =>
  formatDateTime(
    date,
    (formattedDate) => `Actualizado el ${formattedDate}`,
    inHours
  )

/**
 * @returns 09:30
 */
export const formattedTime = (date: Date): string => {
  const hours =
    date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`

  const minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`

  return `${hours}:${minutes}`
}

/**
 * @returns 09:30 || 2020-11-19
 */
export const formatDateLocalTimeZone = (
  publishDateString: string,
  delimiter = '-',
  isClient = false,
  todayHour = true
): string => {
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
    const match = /\d{4}-\d{2}-\d{2}/.exec(publishDate.toISOString())
    formattedDate = match ? match[0] : ''
    formattedDate = formattedDate.replace(/-/g, delimiter)
  }
  return formattedDate
}

export const loadDateFromYYYYMMDD = (date: string): Date | null => {
  if (!/\d{4}-\d{2}-\d{2}/.test(date)) return null
  const year = parseInt(date.slice(0, 4), 10)
  const month = parseInt(date.slice(5, 7), 10) - 1
  const day = parseInt(date.slice(8, 10), 10)

  return new Date(year, month, day)
}
