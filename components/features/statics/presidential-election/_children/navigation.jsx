/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import * as React from 'react'

const NavigationMenu = ({ pageData, changeFilters }) => {
  return (
    <>
      <div className="box-ul">
        <ul className="main-navigation box-ul__ul">
          <li className="box-ul__ul-li">
            <span
              className="box-ul__ul-li-a"
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
          <li className="box-ul__ul-li">
            <span className="box-ul__ul-li-a">Regiones</span>
            <ul className="box-ul__ul-li__ul">
              {pageData?.regiones?.map(({ filtro_nombre: name }) => (
                <li className="box-ul__ul-li__ul-li">
                  <span
                    className="box-ul__ul-li__ul-li-a"
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
          <li className="box-ul__ul-li">
            <span className="box-ul__ul-li-a">Lima</span>
            <ul className="box-ul__ul-li__ul">
              {pageData?.lima?.map(({ filtro_nombre: name }) => (
                <li className="box-ul__ul-li__ul-li">
                  <span
                    className="box-ul__ul-li__ul-li-a"
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
          <li className="box-ul__ul-li">
            <span className="box-ul__ul-li-a">Resto del Mundo</span>
            <ul className="box-ul__ul-li__ul">
              {pageData?.resto_del_mundo?.map(({ filtro_nombre: name }) => (
                <li className="box-ul__ul-li__ul-li">
                  <span
                    className="box-ul__ul-li__ul-li-a"
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
        <div className="box-ul__divbutton">
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
      </div>
    </>
  )
}

export default NavigationMenu
