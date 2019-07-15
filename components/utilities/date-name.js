import {
  arrayMonths,
  arrayDays
} from './helpers'

const getLatinDate = (dateString, yearSeparator) => {
  let name = ''
  if (dateString) {
    const date = new Date(dateString)
    name = `${arrayDays[date.getDay()]} ${date.getDate()} de ${
      arrayMonths[date.getMonth()]
    }${yearSeparator} ${date.getFullYear()}`
  }
  return name
}

export default getLatinDate