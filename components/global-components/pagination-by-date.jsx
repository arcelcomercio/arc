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
    this.state = {
      dateIterator: this.evalDate().fiveDays,
    }
  }

  // Devuelve un array con 5 fechas anterioes a el Dia actual o a la fecha pasada como parametro
  getFiveDays(comingDate) {
    let fecha
    if (comingDate) {
      const inputDate = new Date(comingDate)
      const today = new Date()
      if (inputDate > today) {
        // Si la fecha en el parametro es mayor a HOY, devuelve HOY
        fecha = null
      } else {
        // Si la fecha es menor, se formatea y se pasa como parametro al new Date
        const arrDate = comingDate.split('-')
        fecha = arrDate.map((el, index) => {
          if (el.startsWith('0')) {
            return index === 1 ? Number(el.slice(1)) - 1 : Number(el.slice(1))
          }
          return Number(el)
        })
      }
    }

    const formatDate = date => (date < 10 ? `0${date}` : date)

    const date = fecha ? new Date(...fecha) : new Date()
    const today = date.getDate()
    const month = date.getMonth() + 1
    const formatMonth = formatDate(month)
    const year = date.getFullYear()
    const daysInPastMonth = new Date(year, month - 1, 0).getDate()
    const pastMonth = new Date(year, month - 1, 0).getMonth() + 1
    const passYear = new Date(year, month - 1, 0).getFullYear()
    const formarPastMonth = formatDate(pastMonth)
    const fiveDays = []
    const getNextDay = new Date(year, date.getMonth(), date.getDate() + 1)
    const nextDay = `${getNextDay.getFullYear()}-${formatDate(
      getNextDay.getMonth() + 1
    )}-${formatDate(getNextDay.getDate())}`
    let ciclo = 0

    for (let i = today; i > today - 5; i--) {
      if (i < 1) {
        if (pastMonth > month) {
          // Si el mes pasado es mayor al mes actual, entonces pertenece a otro año
          fiveDays.push(
            `${passYear}-${formarPastMonth}-${daysInPastMonth - ciclo}`
          )
          ciclo += 1
        } else {
          // Si no, pertenece a este año pero en el mes anterior
          fiveDays.push(`${year}-${formarPastMonth}-${daysInPastMonth - ciclo}`)
          ciclo += 1
        }
      } else {
        // Si no, devuelve los 5 dias antes de HOY
        fiveDays.push(`${year}-${formatMonth}-${formatDate(i)}`)
      }
    }

    return {
      fiveDays: fiveDays.reverse(),
      nextDay,
    }
  }

  // Obtener la fecha del path o devolver vacio
  getURL(index) {
    const { section = 'todas' } = this.props
    const { dateIterator = '' } = this.state
    return index || index === 0
      ? // Si viene un indice devuelvo localhost/archivo/seccion/fecha
        `/archivo/${section}/${dateIterator[index]}`
      : // Si no viene index devuelvo localhost/archivo/seccion
        `/archivo/${section}/`
  }

  // Devuelve el link del <Anterior> en pagination
  getLastDay() {
    const { dateIterator } = this.state
    return dateIterator[dateIterator.length - 2]
  }

  getQueryURL() {
    return window.location.search
  }

  // Devuelve el link del <Siguiente> en pagination
  getnextDay() {
    return this.evalDate().nextDay
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
    const { dateIterator } = this.state
    const { date } = this.props
    return (
      <div className={classes.paginationDate}>
        <ul className={classes.paginationDateList}>
          <li className={classes.paginationDateItem}>
            <a
              className={classes.paginationDateLink}
              href={`${this.getURL()}${this.getLastDay().concat(
                this.getQueryURL()
              )}`}>
              Anterior
            </a>
          </li>
          {dateIterator.map((el, index) => {
            return (
              <li
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className={classes.paginationDateItem}>
                {index === dateIterator.length - 1 ? (
                  <p
                    className={`${classes.paginationDateLink} ${
                      index === dateIterator.length - 1 ? 'active' : ''
                    }`}>
                    {this.clearDate(el)}
                  </p>
                ) : (
                  <a
                    className={classes.paginationDateLink}
                    href={`${this.getURL(index).concat(this.getQueryURL())}`}>
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
                href={`${this.getURL()}${this.getnextDay().concat(
                  this.getQueryURL()
                )}`}>
                Siguiente
              </a>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default PaginationByDate
