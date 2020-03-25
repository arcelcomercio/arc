/**
 * SVG optimizados con https://petercollingridge.appspot.com/svg-optimiser
 */

import React from 'react'
import getProperties from 'fusion:properties'
import { getAssetsPath } from '../../../../utilities/assets'
import { searchScript, menuScript } from '../_dependencies/scripts'
import Menu from './menu'

export default props => {
  const { menuSections = [], arcSite, contextPath } = props
  const { siteDomain, legalLinks } = getProperties(arcSite)

  return (
    <header className="f h-basic pos-rel" id="h-basic">
      <div className="f">
        <form action="h-basic__form" className="f">
          <input
            className="h-basic__input"
            type="search"
            placeholder="¿Qué Buscas?"
            id="h-basic_search-input"
          />
          <button
            id="h-basic_search-btn"
            type="button"
            className="h-basic__btn-search h-basic__btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              title="abrir cuadro de búsqueda"
              className="h-basic__search"
              width="22"
              height="22"
              viewBox="0 0 14 14"
              fill="none">
              <path
                d="M13.2 12.4L9.2 8.3C9.8 7.5 10.1 6.5 10.1 5.4 10.1 4.2 9.6 3 8.8 2.1 7.9 1.2 6.7 0.8 5.4 0.8 4.2 0.8 3 1.2 2.1 2.1 1.2 3 0.8 4.2 0.8 5.4 0.8 6.7 1.2 7.9 2.1 8.8 3 9.6 4.2 10.1 5.4 10.1 6.5 10.1 7.5 9.8 8.3 9.2L12.4 13.2C12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.3 12.4 13.3 12.5 13.3 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.2L13.2 12.5C13.2 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.3 12.5 13.3 12.4 13.3 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4V12.4ZM7.9 7.9C7.3 8.6 6.4 8.9 5.4 8.9 4.5 8.9 3.6 8.6 3 7.9 2.3 7.3 1.9 6.4 1.9 5.4 1.9 4.5 2.3 3.6 3 3 3.6 2.3 4.5 1.9 5.4 1.9 6.4 1.9 7.3 2.3 7.9 3 8.6 3.6 8.9 4.5 8.9 5.4 8.9 6.4 8.6 7.3 7.9 7.9Z"
                fill="black"
              />
            </svg>
          </button>
        </form>

        <button
          id="h-basic__btn-menu"
          type="button"
          className="h-basic__btn-menu h-basic__btn f">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-basic__menu"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none">
            <path
              d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"
              fill="black"
            />
          </svg>
          <span className="h-basic__menu-txt">Menú</span>
        </button>
      </div>

      <a href="/" className="h-basic__img-link">
        <img
          className="h-basic__img"
          src={`${getAssetsPath(
            arcSite,
            contextPath
          )}/resources/dist/elcomercio/images/white-logo.png`}
          alt="elcomercio.pe"
        />
      </a>

      <div className="f">
        <button type="button" className="h-basic__sub">
          Suscríbete
        </button>

        <button type="button" className="h-basic__btn-user h-basic__btn">
          <span className="h-basic__user-txt">INGRESA</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-basic__user"
            width="22"
            height="22"
            viewBox="0 0 20 20"
            fill="none">
            <path
              d="m10 0c-1.9 0-3.8 0.6-5.5 1.6-1.6 1.1-2.9 2.6-3.7 4.4-0.8 1.8-1 3.7-0.7 5.7 0.3 1.9 1.2 3.7 2.5 5.1 0.9 1 2.1 1.8 3.3 2.4 1.3 0.6 2.6 0.8 4 0.8 1.4 0 2.7-0.3 4-0.8 1.3-0.6 2.4-1.4 3.3-2.4 1.3-1.4 2.2-3.2 2.5-5.1 0.3-1.9 0.1-3.9-0.7-5.7-0.8-1.8-2.1-3.3-3.7-4.3-1.6-1.1-3.5-1.6-5.5-1.6zm0 18c-2.1 0-4.1-0.8-5.5-2.2 0.5-1.1 1.2-2 2.2-2.7s2.2-1 3.3-1c1.2 0 2.4 0.4 3.3 1 1 0.7 1.8 1.6 2.2 2.7-1.5 1.4-3.5 2.2-5.5 2.3zm-2-10c0-0.4 0.1-0.8 0.3-1.1s0.5-0.6 0.9-0.7c0.4-0.2 0.8-0.2 1.2-0.1 0.4 0.1 0.7 0.3 1 0.5 0.3 0.3 0.5 0.6 0.5 1 0.1 0.4 0 0.8-0.1 1.2-0.2 0.4-0.4 0.7-0.7 0.9s-0.7 0.3-1.1 0.3c-0.5 0-1-0.2-1.4-0.6-0.4-0.4-0.6-0.9-0.6-1.4zm8.9 6c-0.9-1.5-2.3-2.7-3.9-3.4 0.5-0.6 0.8-1.3 1-2.1 0.1-0.8 0-1.5-0.3-2.2-0.3-0.7-0.8-1.3-1.5-1.7-0.6-0.4-1.4-0.6-2.2-0.6-0.8 0-1.5 0.2-2.2 0.6-0.6 0.4-1.2 1-1.5 1.7-0.3 0.7-0.4 1.5-0.3 2.2 0.1 0.8 0.4 1.5 1 2.1-1.6 0.7-3 1.9-3.9 3.4-0.7-1.2-1.1-2.6-1.1-4 0-2.1 0.8-4.2 2.3-5.7 1.5-1.5 3.5-2.3 5.7-2.3 2.1 0 4.2 0.8 5.7 2.3 1.5 1.5 2.3 3.5 2.3 5.7 0 1.4-0.4 2.8-1.1 4z"
              fill="#000"
            />
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
          __html: searchScript,
        }}
      />
      <script dangerouslySetInnerHTML={{ __html: menuScript }}></script>
    </header>
  )
}
