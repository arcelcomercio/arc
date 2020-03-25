/**
 * SVG optimizados con https://petercollingridge.appspot.com/svg-optimiser
 */

import React from 'react'
import getProperties from 'fusion:properties'
import { getAssetsPath } from '../../../../utilities/assets'
import {
  searchScript,
  stickyScript,
  menuScript,
} from '../_dependencies/scripts'
import Menu from './menu'

export default props => {
  const { menuSections = [], arcSite, contextPath } = props
  const { siteDomain, legalLinks } = getProperties(arcSite)

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

        <div className="h-basic__signwall f">
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

        <div className="h-basic__social">
          <span className="h-basic__share-txt">Comparte</span>
          <button
            type="button"
            className="h-basic__social-btn h-basic__btn just-center f">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="14"
              viewBox="0 0 10 21"
              fill="none">
              <path
                d="M2.6 21V11.1H0V7.6H2.6V4.6C2.6 2.2 4.1 0 7.5 0 8.9 0 10 0.1 10 0.1L9.9 3.5C9.9 3.5 8.8 3.4 7.7 3.4 6.4 3.4 6.2 4 6.2 5V7.6H10L9.8 11.1H6.2V21H2.6Z"
                fill="black"
              />
            </svg>
          </button>
          <button
            type="button"
            className="h-basic__social-btn h-basic__btn just-center f">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="14"
              viewBox="0 0 14 12"
              fill="none">
              <path
                d="M13.5 2C13 2.2 12.5 2.3 12 2.4 12.5 2.1 12.9 1.5 13.1 0.9 12.6 1.2 12 1.4 11.4 1.6 11.2 1.3 10.9 1.1 10.6 0.9 10.2 0.8 9.9 0.7 9.5 0.7 8 0.7 6.8 1.9 6.8 3.4 6.8 3.6 6.9 3.8 6.9 4 4.7 3.9 2.7 2.8 1.4 1.2 1.2 1.6 1 2.1 1 2.6 1 3.5 1.5 4.3 2.2 4.8 1.8 4.8 1.4 4.6 1 4.4V4.5C1 5.8 1.9 6.8 3.2 7.1 2.9 7.1 2.7 7.2 2.5 7.2 2.3 7.2 2.1 7.2 2 7.1 2.3 8.2 3.3 9 4.5 9 3.5 9.7 2.4 10.1 1.1 10.1 0.9 10.1 0.7 10.1 0.5 10.1 1.7 10.8 3.1 11.3 4.6 11.3 9.5 11.3 12.2 7.2 12.2 3.7 12.2 3.6 12.2 3.5 12.2 3.4 12.7 3 13.1 2.5 13.5 2Z"
                fill="black"
              />
            </svg>
          </button>
          <button
            type="button"
            className="h-basic__social-btn h-basic__btn h-basic__ws just-center f">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18"
              viewBox="0 0 19 19"
              fill="none">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.4 2.6C14.6 1.8 13.6 1.1 12.5 0.7 11.4 0.2 10.2 0 9.1 0 4.1 0 0.1 4 0.1 9 0.1 10.6 0.5 12.1 1.3 13.5L0 18.1 4.8 16.9C6.1 17.6 7.6 18 9 18H9.1C14 18 18 13.9 18 9 18 7.8 17.8 6.6 17.4 5.5 16.9 4.5 16.2 3.5 15.4 2.6V2.6ZM9.1 16.4H9.1C7.7 16.4 6.4 16.1 5.3 15.4L5 15.2 2.2 16 2.9 13.2 2.7 12.9C2 11.8 1.6 10.4 1.6 9 1.6 4.9 4.9 1.5 9.1 1.5 10 1.5 11 1.7 11.9 2.1 12.8 2.5 13.6 3 14.3 3.7 15 4.4 15.6 5.2 16 6.1 16.3 7 16.5 8 16.5 9 16.5 13.1 13.2 16.4 9.1 16.4ZM13.1 10.9C12.9 10.7 11.8 10.2 11.6 10.1 11.4 10.1 11.3 10 11.1 10.2 11 10.5 10.5 11 10.4 11.1 10.3 11.3 10.1 11.3 9.9 11.2 9.7 11.1 9 10.8 8.1 10.1 7.4 9.5 7 8.7 6.9 8.5 6.7 8.3 6.8 8.2 7 8 7.1 7.9 7.2 7.8 7.3 7.7 7.4 7.5 7.4 7.4 7.5 7.3 7.6 7.1 7.6 7 7.5 6.9 7.4 6.8 7 5.7 6.8 5.2 6.6 4.8 6.4 4.8 6.3 4.8 6.2 4.8 6 4.8 5.9 4.8 5.8 4.8 5.6 4.9 5.5 4.9 5.4 5 5.4 5 5.3 5.1 5.1 5.3 4.5 5.9 4.5 7 4.5 8.1 5.3 9.2 5.4 9.3 5.5 9.5 7 11.7 9.2 12.7 9.8 12.9 10.2 13.1 10.5 13.2 11.1 13.3 11.5 13.3 11.9 13.3 12.4 13.2 13.3 12.7 13.4 12.2 13.6 11.7 13.6 11.2 13.6 11.1 13.5 11 13.4 11 13.1 10.9"
                fill="black"
              />
            </svg>
          </button>
          <button
            type="button"
            className="h-basic__social-btn h-basic__btn h-basic__in just-center f">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18"
              viewBox="0 0 24 24"
              fill="none">
              <path
                d="M5 7.2C6.2 7.2 7.2 6.2 7.2 5 7.2 3.8 6.2 2.8 5 2.8 3.8 2.8 2.8 3.8 2.8 5 2.8 6.2 3.8 7.2 5 7.2Z"
                fill="black"
              />
              <path
                d="M9.2 8.9V21H13V15C13 13.4 13.3 11.9 15.3 11.9 17.2 11.9 17.2 13.7 17.2 15.1V21H21V14.3C21 11.1 20.3 8.6 16.5 8.6 14.6 8.6 13.4 9.6 12.9 10.5H12.9V8.9H9.2V8.9ZM3.1 8.9H6.9V21H3.1V8.9Z"
                fill="black"
              />
            </svg>
          </button>
          <button className="h-basic__next f just-center" type="button">
            <span className="h-basic__next-txt">Siguiente artículo</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="#111">
              <path
                d="M0.5 9L12.2 9 6.9 14.3 8.3 15.7 16 8 8.3 0.3 6.9 1.7 12.2 7 0.5 7 0.5 9Z"
                fill="black"
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
            __html: `"use strict";${searchScript}${stickyScript}${menuScript}`,
          }}
        />
      </header>
      <div id="h-basic-pointer"></div>
    </>
  )
}
