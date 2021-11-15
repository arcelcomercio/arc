/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/**
 * SVG optimizados con https://petercollingridge.appspot.com/svg-optimiser
 */

import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'

import { env } from '../../../../../utilities/arc/env'
import {
  SITE_ELCOMERCIO,
  SITE_GESTION,
} from '../../../../../utilities/constants/sitenames'
import {
  headerStickyScript,
  menuScript,
  searchScript,
  singwallScript,
  stickyScript,
} from '../_dependencies/scripts'
import Menu from './menu'
import HeaderInvertedSocialIcons from './social-icons'

const MenuIcon = ({ sectionStyle }) => {
  if (sectionStyle === 'story-v2-standard') {
    return (
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
        <path d="M0 1H16" stroke="#4D4D4D" strokeWidth="2" />
        <path d="M0 7H16" stroke="#4D4D4D" strokeWidth="2" />
        <path d="M0 13H16" stroke="#4D4D4D" strokeWidth="2" />
      </svg>
    )
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-basic__menu"
      height="23"
      title="Menú"
      alt="Menú"
      viewBox="0 0 24 24">
      <path d="M4 6h16c0.6 0 1 0.5 1 1l0 0c0 0.6-0.4 1-1 1H4C3.5 8 3 7.6 3 7l0 0C3 6.5 3.5 6 4 6z" />
      <path d="M4 11h16c0.6 0 1 0.5 1 1l0 0c0 0.6-0.4 1-1 1H4c-0.5 0-1-0.4-1-1l0 0C3 11.5 3.5 11 4 11z" />
      <path d="M4 16h16c0.6 0 1 0.5 1 1l0 0c0 0.6-0.4 1-1 1H4c-0.5 0-1-0.4-1-1l0 0C3 16.5 3.5 16 4 16z" />
    </svg>
  )
}

const SignwallIcon = ({ sectionStyle }) => {
  if (sectionStyle === 'story-v2-standard') {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23.668"
        height="23.67"
        viewBox="0 0 23.668 23.67">
        <g transform="translate(-909.356 -533.357)">
          <g transform="translate(910.156 534.157)">
            <g transform="translate(0 0)">
              <path
                d="M-5.365-10.73A11.033,11.033,0,0,0,5.668-21.763,11.033,11.033,0,0,0-5.365-32.8,11.034,11.034,0,0,0-16.4-21.763,11.033,11.033,0,0,0-5.365-10.73Z"
                transform="translate(16.4 32.8)"
                fill="none"
                stroke="#4d4d4d"
                strokeWidth="1.6"
              />
            </g>
            <g transform="translate(2.854 4.511)">
              <path
                d="M-5.236-4.284a4.779,4.779,0,0,0,2.2-4.021A4.791,4.791,0,0,0-7.824-13.1a4.79,4.79,0,0,0-3.388,1.4,4.79,4.79,0,0,0-1.4,3.39,4.778,4.778,0,0,0,2.183,4.011c-3.745,1.337-6.28,4.509-5.4,5.153A10.948,10.948,0,0,0-7.682,4.4,10.948,10.948,0,0,0,.412.737C.991.223-1.574-2.961-5.236-4.284Z"
                transform="translate(16.005 13.1)"
                fill="none"
                stroke="#4d4d4d"
                strokeWidth="1.6"
              />
            </g>
          </g>
        </g>
      </svg>
    )
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-basic__user"
      viewBox="0 0 18 21"
      width="18"
      height="21">
      <path d="M9.49 10.82C6.79 10.82 4.61 8.4 4.61 5.41C4.61 2.42 6.79 0 9.49 0C12.19 0 14.37 2.42 14.37 5.41C14.37 8.4 12.19 10.82 9.49 10.82Z" />
      <path d="M18 20L18 16.08C18 16.08 15.12 12.09 9.49 12.09C3.85 12.09 0.98 16.08 0.98 16.08L0.98 20L18 20Z" />
    </svg>
  )
}

export default (props) => {
  const {
    hideMenu,
    menuSections,
    arcSite,
    sectionPath,
    mainImage,
    title,
    isSomos,
    activeSticky,
    disableSignwall,
    storyTitle,
    navSections,
    siteProperties,
    isTopNavVisible,
  } = props
  const { siteDomain, legalLinks } = getProperties(arcSite)
  const { activePaywall, activeSignwall } = siteProperties

  const { metaValue } = useAppContext()

  const paramSignwall = {
    arcSite,
    arcEnv: env,
    locUrl: (sectionPath.split('/')[1] || '').replace('-', ''),
  }

  const scripts = [
    activeSticky ? stickyScript : '',
    searchScript,
    hideMenu ? '' : menuScript,
    disableSignwall ? '' : singwallScript(paramSignwall),
    arcSite === SITE_GESTION ? headerStickyScript : '',
  ]

  const filterSectionStyles = (section) => {
    if (arcSite === SITE_ELCOMERCIO) {
      return section.replace(/\[+([^\][]+)]+/g, '')
    }
    return section
  }

  return (
    <>
      {(arcSite === SITE_GESTION || isTopNavVisible) && (
        <nav className="h-basic__nav f oflow-h">
          {arcSite === SITE_GESTION && (
            <div className="h-basic__nav-text">Hoy interessa</div>
          )}
          <ul className="f">
            {navSections?.map(
              ({
                name = '',
                _id: id = '',
                display_name: displayName = '',
                url = '',
              }) => (
                <li className="h-basic__nav-link f">
                  <a href={url || id || '/'}>
                    {filterSectionStyles(name || displayName)}
                  </a>
                </li>
              )
            )}
          </ul>
        </nav>
      )}
      <header
        className={`h-basic pos-rel f f-center ${
          isSomos ? 'h-basic--somos' : ''
        }`}
        id="h-basic">
        {arcSite === SITE_GESTION && <div className="h-basic__loader" />}
        <div className="h-basic__wrapper f just-between alg-center">
          <div className="f h-basic__right">
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
              title="abrir cuadro de búsqueda"
              alt="abrir cuadro de búsqueda"
              className="h-basic__btn-search h-basic__btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-basic__search"
                width="22"
                height="22"
                viewBox="0 0 14 14">
                <path d="M13.2 12.4L9.2 8.3C9.8 7.5 10.1 6.5 10.1 5.4 10.1 4.2 9.6 3 8.8 2.1 7.9 1.2 6.7 0.8 5.4 0.8 4.2 0.8 3 1.2 2.1 2.1 1.2 3 0.8 4.2 0.8 5.4 0.8 6.7 1.2 7.9 2.1 8.8 3 9.6 4.2 10.1 5.4 10.1 6.5 10.1 7.5 9.8 8.3 9.2L12.4 13.2C12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.3 12.4 13.3 12.5 13.3 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.2L13.2 12.5C13.2 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.3 12.5 13.3 12.4 13.3 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4V12.4ZM7.9 7.9C7.3 8.6 6.4 8.9 5.4 8.9 4.5 8.9 3.6 8.6 3 7.9 2.3 7.3 1.9 6.4 1.9 5.4 1.9 4.5 2.3 3.6 3 3 3.6 2.3 4.5 1.9 5.4 1.9 6.4 1.9 7.3 2.3 7.9 3 8.6 3.6 8.9 4.5 8.9 5.4 8.9 6.4 8.6 7.3 7.9 7.9Z" />
              </svg>
            </button>
            {!hideMenu && (
              <button
                id="h-basic__btn-menu"
                type="button"
                className="h-basic__btn-menu h-basic__btn f"
                aria-haspopup="true"
                aria-controls="menu">
                <MenuIcon sectionStyle={metaValue('section_style')} />
                <span
                  className="h-basic__menu-txt uppercase"
                  aria-hidden="true">
                  Menú
                </span>
              </button>
            )}
          </div>
          <a
            itemProp="url"
            href="/"
            className="h-basic__img-link"
            title={siteDomain}>
            <img
              className="h-basic__img"
              src={mainImage}
              alt={title}
              title={title}
            />
          </a>

          {arcSite === SITE_GESTION && (
            <>
              <div className="h-basic__title">{storyTitle}</div>

              <HeaderInvertedSocialIcons />
            </>
          )}

          {(activePaywall || activeSignwall) && (
            <div className="h-basic__signwall f">
              {activePaywall && (
                <button type="button" className="h-basic__sub uppercase">
                  Suscríbete
                </button>
              )}

              {activeSignwall && (
                <button
                  type="button"
                  alt="Iniciar sesión / Perfil"
                  title="Iniciar sesión / Perfil"
                  className="h-basic__btn-user h-basic__btn uppercase">
                  <span className="h-basic__user-txt" aria-hidden="true">
                    {arcSite === SITE_GESTION ? 'Iniciar Sesión' : 'Iniciar'}
                  </span>
                  <SignwallIcon sectionStyle={metaValue('section_style')} />
                </button>
              )}
            </div>
          )}

          {!hideMenu && (
            <Menu
              isSomos={isSomos}
              menuSections={menuSections || []}
              siteDomain={siteDomain}
              legalLinks={legalLinks}
            />
          )}
        </div>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: scripts.join(''),
          }}
        />
      </header>
      <div id="h-basic-pointer" />
    </>
  )
}
