import { formatAMPM } from '../../utilities/date-time/time'

const formaZeroDate = (numb = 0) => {
  return numb < 10 ? `0${numb}` : numb
}

const formateDate = (fecha = '') => {
  return () => {
    const date = fecha.toString()
    const _date = new Date(date.slice(0, date.indexOf('GMT') - 1))
    const day = formaZeroDate(_date.getDate())
    const month = formaZeroDate(_date.getMonth() + 1)
    const year = _date.getFullYear()

    return `${day}/${month}/${year} - ${formatAMPM(date)}`
  }
}

const buildDatesErrorMessage = (errorList) => {
  return errorList.map(el => {
    const fechaProgramada = formateDate(new Date(el.programate_date))
    const fechaPublicacion = formateDate(el.publish_date)
    return `Nota Programada: Error en ${
      el.note
    }. La fecha Programada (${fechaProgramada()}) es menor a la fecha de publicación de la nota (${fechaPublicacion()})`
  })
}

export default buildDatesErrorMessage