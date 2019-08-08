/* eslint-disable class-methods-use-this */
import React, { PureComponent } from 'react'
import { getActualDate } from '../utilities/helpers'

const classes = {
  paginationDate: 'pagination-date w-full',
  paginationDateList: 'text-center',
  paginationDateItem: 'pagination-date__item inline-block mr-5 ml-5',
  paginationDateLink:
    'uppercase flex items-center justify-center font-bold pagination-date__link text-md text-gray-200 pt-5 pb-5 pr-5 pl-5 lg:pr-10 lg:pl-10',
}
class PaginationByDate extends PureComponent {
  constructor(props) {
    super(props)
    this.dateIterator = this.evalDate().fiveDays
  }

  // Devuelve un array con 5 fechas anterioes a el Dia actual o a la fecha pasada como parametro
  getFiveDays(comingDate) {
    // Dias anteriores que quiero mostrar
    const LESS_DAYS = 5
    const DAY_LIST = []
    // Formateador de fecha => 5 return 05
    const formatDate = date => (date < 10 ? `0${date}` : date)
    // Transforma la fecha => 2019-01,01 return 2019,01,01
    const parseDate = comingDate && comingDate.split('-').join(',')

    const _today = new Date()
    const _inputDate = comingDate && new Date(parseDate)

    // _date = Si hay fecha y la fecha es mayor a hoy, usa hoy.
    const _date = comingDate && _inputDate < _today ? _inputDate : _today
    const day = _date.getDate()
    const month = _date.getMonth()
    const year = _date.getFullYear()

    // Variables de Mes Pasado
    const _pastMonthDate = new Date(year, month, 0)
    const pastMonth = _pastMonthDate.getMonth()
    const pastYear = _pastMonthDate.getFullYear()
    const daysInPastMonth = _pastMonthDate.getDate()

    // Variables de Dia siguiente
    const _newDay = new Date(year, month, day + 1)
    const nextDayYear = _newDay.getFullYear()
    const nextDayMonth = _newDay.getMonth()
    const nextDayDay = _newDay.getDate()

    // Dia Siguente al consultado
    const nextDay = `${nextDayYear}-${formatDate(
      nextDayMonth + 1
    )}-${formatDate(nextDayDay)}`

    let ciclo = 0

    // Iteracion de dias anteriores para llenar el array de dias.
    for (let i = day; i > day - LESS_DAYS; i--) {
      if (i < 1) {
        if (pastMonth > month) {
          // Si el mes pasado es mayor al mes actual, entonces pertenece a otro año
          DAY_LIST.push(
            `${pastYear}-${formatDate(pastMonth + 1)}-${formatDate(
              daysInPastMonth - ciclo
            )}`
          )
          ciclo += 1
        } else {
          // Si no, pertenece a este año pero en el mes anterior
          DAY_LIST.push(
            `${year}-${formatDate(pastMonth + 1)}-${formatDate(
              daysInPastMonth - ciclo
            )}`
          )
          ciclo += 1
        }
      } else {
        // Si no, devuelve los 5 dias antes de HOY
        DAY_LIST.push(`${year}-${formatDate(month + 1)}-${formatDate(i)}`)
      }
    }
    return {
      fiveDays: DAY_LIST.reverse(),
      nextDay,
    }
  }

  // Obtener la fecha del path o devolver vacio
  getURL(index) {
    let { section = 'todas' } = this.props
    section = section !== 'todas' ? section.replace('/', '') : 'todas'
    return index || index === 0
      ? // Si viene un indice devuelvo /archivo/seccion/fecha/
        `/archivo/${section}/${this.dateIterator[index]}/`
      : // Si no viene index devuelvo /archivo/seccion/
        `/archivo/${section}/`
  }

  // Devuelve el link del <Anterior> en pagination
  getLastDay() {
    return `${this.dateIterator[this.dateIterator.length - 2]}/`
  }

  // Devuelve el link del <Siguiente> en pagination
  getNextDay() {
    return `${this.evalDate().nextDay}/`
  }

  // Si Hay en el path una fecha, la pasa como parametro a la funcion, si no se ejecuta la acutal
  evalDate() {
    const { date } = this.props
    return date ? this.getFiveDays(date) : this.getFiveDays()
  }

  // Remueve el año para imprimirlo en el componente Ej: 2010-01-10 => 10/01
  clearDate(date) {
    return date
      .slice(date.indexOf('-') + 1)
      .split('-')
      .reverse()
      .join('/')
  }

  render() {
    const { date } = this.props

    return (
      <div className={classes.paginationDate}>
        <ul className={classes.paginationDateList}>
          <li className={classes.paginationDateItem}>
            <a
              className={classes.paginationDateLink}
              href={`${this.getURL()}${this.getLastDay()}`}>
              <span className="non-tablet non-desktop">&#60;</span>
              <span className="non-mobile">Anterior</span>
            </a>
          </li>
          {this.dateIterator.map((el, index) => {
            return (
              <li
                // eslint-disable-next-line react/no-array-index-key
                key={`pag-by-date-${index}`}
                className={classes.paginationDateItem}>
                {index === this.dateIterator.length - 1 ? (
                  <p
                    className={`${classes.paginationDateLink} ${
                      index === this.dateIterator.length - 1 ? 'active' : ''
                    }`}>
                    {this.clearDate(el)}
                  </p>
                ) : (
                  <a
                    className={classes.paginationDateLink}
                    href={`${this.getURL(index)}`}>
                    {this.clearDate(el)}
                  </a>
                )}
              </li>
            )
          })}
          {date !== getActualDate() && (
            <li className={classes.paginationDateItem}>
              <a
                className={classes.paginationDateLink}
                href={`${this.getURL()}${this.getNextDay()}`}>
                <span className="non-tablet non-desktop">&#62;</span>
                <span className="non-mobile">Siguiente</span>
              </a>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default PaginationByDate
