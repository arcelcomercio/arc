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
  stickyScript,
  menuScript,
  singwallScript,
} from '../_dependencies/scripts'
import Menu from './menu'
import ShareButtons from '../../../../../global-components/lite/share'

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
            <span className="h-basic__menu-txt" aria-hidden="true">
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
            )}/resources/dist/elcomercio/images/white-logo.png?d=1`}
            alt={siteDomain}
          />
        </a>

        <div className="h-basic__signwall f">
          <button type="button" className="h-basic__sub">
            Suscríbete
          </button>

          <button type="button" className="h-basic__btn-user h-basic__btn">
            <span className="h-basic__user-txt" aria-hidden="true">
              INGRESA
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-basic__user"
              viewBox="0 0 24 24">
              <title>Iniciar sesión / Perfil</title>
              <path d="M12 2c-5.5 0-10 4.5-10 10 0 5.5 4.5 10 10 10 5.5 0 10-4.5 10-10C22 6.5 17.5 2 12 2zM12 20.2c-1.8 0-3.5-0.6-4.9-1.7 2.8-2.6 7.1-2.6 9.9 0C15.5 19.6 13.8 20.2 12 20.2zM9.3 12c0-1.5 1.2-2.7 2.7-2.7 1.5 0 2.7 1.2 2.7 2.7s-1.2 2.7-2.7 2.7C10.5 14.7 9.3 13.5 9.3 12zM18.3 17.3c-0.9-0.9-2-1.5-3.1-2 1.8-1.7 1.9-4.6 0.2-6.4 -1.7-1.8-4.6-1.9-6.4-0.2 -1.8 1.7-1.9 4.6-0.2 6.4 0.1 0.1 0.1 0.1 0.2 0.2 -1.2 0.4-2.2 1.1-3.1 2C2.8 13.8 3.3 8.6 6.7 5.7c3.5-2.9 8.6-2.4 11.5 1C20.8 9.8 20.8 14.2 18.3 17.3L18.3 17.3z" />
            </svg>
          </button>
        </div>

        <div className="h-basic__social">
          <span className="h-basic__share-txt">Comparte</span>
          <ShareButtons />
          <button className="h-basic__next f just-center" type="button">
            <span className="h-basic__next-txt">Siguiente artículo</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 16 16">
              <path d="M0.5 9L12.2 9 6.9 14.3 8.3 15.7 16 8 8.3 0.3 6.9 1.7 12.2 7 0.5 7 0.5 9Z" />
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
            __html: `"use strict";${searchScript}${stickyScript}${menuScript}${singwallScript.replace(
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
