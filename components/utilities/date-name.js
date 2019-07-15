import {
  arrayMonths,
  arrayDays
} from './helpers'

const dateName = (datestring, yearSeparator) => {
  let name = ''
  if (datestring) {

    const date = new Date(datestring)
    name = `${arrayDays[date.getDay()]} ${date.getDate()} de ${
      arrayMonths[date.getMonth()]
    }${yearSeparator} ${date.getFullYear()}`
  }
  return name
}

export default dateName