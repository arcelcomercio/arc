/* eslint-disable class-methods-use-this */
import React, { Component } from 'react'

import { getActualDate } from '../utilsJs/helpers'

class PaginadorFecha extends Component {
  constructor() {
    super()
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
        fecha = arrDate
          .map(el => (el.startsWith('0') ? el.slice(1) : el))
          .map(el => Number(el))
          .map((el, index) => (index === 1 ? el - 1 : el))
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
  getURL() {
    const regEx = /^\d{4}-\d{2}-\d{2}$/
    const fullpath = window.location.pathname
    const date = fullpath.slice(fullpath.lastIndexOf('/') + 1)
    const path = fullpath.slice(0, fullpath.lastIndexOf('/'))
    if (date.match(regEx)) {
      return {
        date,
        path,
      }
    }
    return {
      date: '',
      path,
    }
  }

  // Obtener la fecha del path o devolver vacio
  getURL(index) {
    const section = this.props.section ? this.props.section : 'todas'
    const { origin } = location
    return index || index === 0
      ? // Si viene un indice devuelvo localhost/archivo/seccion/fecha
        `${origin}/archivo/${section}/${this.state.dateIterator[index]}`
      : // Si no viene index devuelvo localhost/archivo/seccion
        `${origin}/archivo/${section}/`
  }

  // Si Hay en el path una fecha, la pasa como parametro a la funcion, si no se ejecuta la acutal
  evalDate() {
    const { date } = this.props
    if (date && date !== '') {
      return this.getFiveDays(date)
    }
    return this.getFiveDays()
  }

  // Devuelve el link del <Siguiente> en paginacion
  getnextDay() {
    return this.evalDate().nextDay
  }

  // Si Hay en el path una fecha, la pasa como parametro a la funcion, si no se ejecuta la acutal
  evalDate() {
    const dateTest = this.getURL().date
    if (dateTest && dateTest !== '') {
      return this.getFiveDays(dateTest)
    }
    return this.getFiveDays()
  }

  // Remueve el año para imprimirlo en el componente Ej: 2010-10-10 => 10/10
  clearDate(date) {
    return date
      .slice(date.indexOf('-') + 1)
      .split('-')
      .reverse()
      .join('/')
  }

  render() {
    const { dateIterator } = this.state
    return (
      <div className="pagination-file">
        <ul className="pagination-file__list">
          <li className="pagination-file__item">
            <a
              className="pagination-file__link"
              href={`${this.getURL()}${this.getLastDay().concat(
                this.getQueryURL()
              )}`}>
              Anterior
            </a>
          </li>
          {dateIterator.map((el, index) => {
            return (
              <li
                key={index}
                className={`pagination-file__item ${
                  index === dateIterator.length - 1 ? 'active' : ''
                }`}>
                {index === dateIterator.length - 1 ? (
                  <p className="pagination-file__link">{this.clearDate(el)}</p>
                ) : (
                  <a
                    className="pagination-file__link"
                    href={`${this.getURL(index).concat(this.getQueryURL())}`}>
                    {this.clearDate(el)}
                  </a>
                )}
              </li>
            )
          })}
          {this.props.date === getActualDate() ? (
            ''
          ) : (
            <li className="pagination-file__item">
              <a
                className="pagination-file__link"
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

export default PaginadorFecha
