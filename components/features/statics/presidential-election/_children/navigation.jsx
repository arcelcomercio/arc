/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import * as React from 'react'

const NavigationMenu = ({ page, pageData, changeFilters }) => {
  return (
    <>
      <div className="election-nav">
        <ul className="election-nav__buttons">
          <li className="election-nav__item">
            <span
              className="election-nav__text"
              role="button"
              tabIndex="0"
              aria-pressed="false"
              onClick={() =>
                changeFilters({
                  group: 'general',
                  filter: null,
                  subFilter: null,
                })}>
              General
            </span>
          </li>
          <li
            className={`election-nav__item ${
              !pageData?.regiones ? 'disabled' : ''
            }`}>
            <span className="election-nav__text">Regiones</span>
            <ul className="election-nav__list">
              {pageData?.regiones?.map(({ filtro_nombre: name }) => (
                <li className="election-nav__list-item" key={name}>
                  <span
                    className="election-nav__list-text"
                    role="button"
                    tabIndex="0"
                    aria-pressed="false"
                    onClick={() =>
                      changeFilters({
                        group: 'regiones',
                        filter: name,
                        subFilter: null,
                      })}>
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </li>
          <li
            className={`election-nav__item ${
              !pageData?.regiones ? 'disabled' : ''
            }`}>
            <span className="election-nav__text">Lima</span>
            <ul className="election-nav__list">
              {pageData?.lima?.map(({ filtro_nombre: name }) => (
                <li className="election-nav__list-item" key={name}>
                  <span
                    className="election-nav__list-text"
                    role="button"
                    tabIndex="0"
                    aria-pressed="false"
                    onClick={() =>
                      changeFilters({
                        group: 'lima',
                        filter: name,
                        subFilter: null,
                      })}>
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </li>
          <li
            className={`election-nav__item ${
              !pageData?.regiones ? 'disabled' : ''
            }`}>
            <span className="election-nav__text">Resto del Mundo</span>
            <ul className="election-nav__list">
              {pageData?.resto_del_mundo?.map(({ filtro_nombre: name }) => (
                <li className="election-nav__list-item" key={name}>
                  <span
                    className="election-nav__list-text"
                    role="button"
                    tabIndex="0"
                    aria-pressed="false"
                    onClick={() =>
                      changeFilters({
                        group: 'resto_del_mundo',
                        filter: name,
                        subFilter: null,
                      })}>
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        {page === 'congresal' ? (
          <div className="election-nav__divbutton">
            <span
              role="button"
              tabIndex="0"
              aria-pressed="false"
              onClick={() =>
                changeFilters({
                  group: 'todos_los_partidos',
                  filter: null,
                  subFilter: null,
                })}>
              Ordenar por partido politico
            </span>
          </div>
        ) : null}
      </div>
    </>
  )
}

export default NavigationMenu
