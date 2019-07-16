import {
  arrayMonths,
  arrayDays
} from './helpers'

const getLatinDate = (dateString, yearSeparator, isStatic = false) => {
  let name = ''
  if (dateString) {
    const date = new Date(dateString)

    if (isStatic)
      if (date.getHours() <= 5) date.setDate(date.getDate() - 1)

    name = `${arrayDays[date.getDay()]} ${date.getDate()} de ${
      arrayMonths[date.getMonth()]
    }${yearSeparator} ${date.getFullYear()}`
  }
  return name
}

export default getLatinDate