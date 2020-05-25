/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 * SVG optimizados con https://petercollingridge.appspot.com/svg-optimiser
 */

import React from 'react'
import getProperties from 'fusion:properties'
import { getAssetsPath } from '../../../../../utilities/assets'
import {
  searchScript,
  menuScript,
  singwallScript,
} from '../_dependencies/scripts'
import Menu from './menu'

export default props => {
  const { menuSections = [], arcSite, contextPath, globalContent } = props
  const { siteDomain, legalLinks } = getProperties(arcSite)

  const {
    taxonomy: { primary_section: { path: sectionPath = '' } = {} } = {},
  } = globalContent || {}

  return (
    <>
      <header className="h-basic f pos-rel" id="h-basic">
        <div className="f">
          <input
            className="h-basic__input"
            type="search"
            placeholder="¿Qué Buscas?"
            id="h-basic_search-input"
          />
          <label htmlFor="h-basic_search-input" className="hidden-label">
            Cuadro de búsqueda
          </label>
          <button
            id="h-basic_search-btn"
            type="button"
            className="h-basic__btn-search h-basic__btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-basic__search"
              width="22"
              height="22"
              viewBox="0 0 14 14">
              <title>abrir cuadro de búsqueda</title>
              <path d="M13.2 12.4L9.2 8.3C9.8 7.5 10.1 6.5 10.1 5.4 10.1 4.2 9.6 3 8.8 2.1 7.9 1.2 6.7 0.8 5.4 0.8 4.2 0.8 3 1.2 2.1 2.1 1.2 3 0.8 4.2 0.8 5.4 0.8 6.7 1.2 7.9 2.1 8.8 3 9.6 4.2 10.1 5.4 10.1 6.5 10.1 7.5 9.8 8.3 9.2L12.4 13.2C12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.3 12.4 13.3 12.5 13.3 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.2L13.2 12.5C13.2 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.3 12.5 13.3 12.4 13.3 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4V12.4ZM7.9 7.9C7.3 8.6 6.4 8.9 5.4 8.9 4.5 8.9 3.6 8.6 3 7.9 2.3 7.3 1.9 6.4 1.9 5.4 1.9 4.5 2.3 3.6 3 3 3.6 2.3 4.5 1.9 5.4 1.9 6.4 1.9 7.3 2.3 7.9 3 8.6 3.6 8.9 4.5 8.9 5.4 8.9 6.4 8.6 7.3 7.9 7.9Z" />
            </svg>
          </button>
          <button
            id="h-basic__btn-menu"
            type="button"
            className="h-basic__btn-menu h-basic__btn f"
            aria-haspopup="true"
            aria-controls="menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-basic__menu"
              height="23"
              viewBox="0 0 24 24">
              <title>Menú</title>
              <path d="M4 6h16c0.6 0 1 0.5 1 1l0 0c0 0.6-0.4 1-1 1H4C3.5 8 3 7.6 3 7l0 0C3 6.5 3.5 6 4 6z" />
              <path d="M4 11h16c0.6 0 1 0.5 1 1l0 0c0 0.6-0.4 1-1 1H4c-0.5 0-1-0.4-1-1l0 0C3 11.5 3.5 11 4 11z" />
              <path d="M4 16h16c0.6 0 1 0.5 1 1l0 0c0 0.6-0.4 1-1 1H4c-0.5 0-1-0.4-1-1l0 0C3 16.5 3.5 16 4 16z" />
            </svg>
            <span className="h-basic__menu-txt uppercase" aria-hidden="true">
              Menú
            </span>
          </button>
        </div>

        <a href="/" className="h-basic__img-link" title={siteDomain}>
          <img
            className="h-basic__img"
            src={`${getAssetsPath(
              arcSite,
              contextPath
            )}/resources/dist/elcomercio/images/logo.png?d=1`}
            alt={siteDomain}
          />
        </a>

        <div className="h-basic__signwall f">
          <button type="button" className="h-basic__sub uppercase">
            Suscríbete
          </button>

          <button
            type="button"
            className="h-basic__btn-user h-basic__btn uppercase">
            <span className="h-basic__user-txt" aria-hidden="true">
              Iniciar
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-basic__user"
              viewBox="0 0 18 21"
              width="18"
              height="21">
              <title>Iniciar sesión / Perfil</title>
              <path d="M9.49 10.82C6.79 10.82 4.61 8.4 4.61 5.41C4.61 2.42 6.79 0 9.49 0C12.19 0 14.37 2.42 14.37 5.41C14.37 8.4 12.19 10.82 9.49 10.82Z" />
              <path d="M18 20L18 16.08C18 16.08 15.12 12.09 9.49 12.09C3.85 12.09 0.98 16.08 0.98 16.08L0.98 20L18 20Z" />
            </svg>
          </button>
        </div>

        <Menu
          menuSections={menuSections}
          siteDomain={siteDomain}
          legalLinks={legalLinks}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `"use strict";${searchScript}${menuScript}${singwallScript.replace(
              '<<loc>>',
              (sectionPath.split('/')[1] || '').replace('-', '')
            )}`,
          }}
        />
      </header>
      <div id="h-basic-pointer"></div>
    </>
  )
}
