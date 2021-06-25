/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import * as React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'

import MenuLite from './menu'

import ShareButtons from '../../../../../global-components/lite/share'

import {
  menuScript,
  searchScript,
  InvertedStickyScript,
} from '../_dependencies/scripts'

const classes = {
  header: `header-inverted-featured header`,
  wrapper: `header-inverted-featured__wrapper wrapper`,
  logoContainer: 'header-inverted-featured__logo-container',
  logo: 'header-inverted-featured__logo',
  featured: 'header-inverted-featured__features',
  item: 'header-inverted-featured__item header__item',
  link: 'header-inverted-featured__features-link',
  bandWrapper: 'header-inverted-featured__band-wrapper',
  band: 'header-inverted-featured__band',
  tags: 'header-inverted-featured__tags',
  navBtnContainer: `header-inverted-featured__nav-btn-container`,
  leftBtnContainer: `header-inverted-featured__left-btn-container`,
  rightBtnContainer: `header-inverted-featured__right-btn-container`,
  form: 'header-inverted-featured__form',
  search: `header-inverted-featured__search`,
  searchLabel: 'header-inverted-featured__search-label',
  btnSearch: `header-inverted-featured__btn-search`,
  iconSearch: 'header-inverted-featured__icon-search icon-search',
  btnMenu: 'header-inverted-featured__btn-menu',
  iconMenu: 'header-inverted-featured__icon-hamburguer icon-hamburguer',
  navStoryTitle: 'header-inverted-featured__nav-story-title',
  navLoader: 'nav__loader-bar position-absolute h-full left-0 bg-link',
  listIcon: 'header-inverted-featured__list-icon story-header__list',
  callImg: 'header-inverted-featured__call-img',
}

// TODO: Agregar el click afuera del menu
const HeaderChildInverted = ({
  logo,
  bandLinks,
  menuSections,
  tags,
  date,
  logoImg,
  winningCallLogo,
}) => {
  const {
    siteProperties: { siteDomain = '', legalLinks = [] } = {},
  } = useFusionContext()

  const scripts = [searchScript, menuScript, InvertedStickyScript]

  return (
    <>
      <header id="header-inverted-featured" className={`${classes.header}`}>
        <div className={classes.navLoader} />
        <div className={classes.wrapper}>
          {/** ************* LEFT *************** */}
          <div
            className={`${classes.navBtnContainer} ${classes.leftBtnContainer}`}>
            <button
              id="h-basic__btn-menu"
              type="button"
              className="h-basic__btn-menu h-basic__btn f"
              aria-haspopup="true"
              aria-controls="menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-basic__menu"
                height="26"
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
                width="18"
                height="18"
                strokeWidth="3"
                viewBox="0 0 14 14">
                <title>abrir cuadro de búsqueda</title>
                <path d="M13.2 12.4L9.2 8.3C9.8 7.5 10.1 6.5 10.1 5.4 10.1 4.2 9.6 3 8.8 2.1 7.9 1.2 6.7 0.8 5.4 0.8 4.2 0.8 3 1.2 2.1 2.1 1.2 3 0.8 4.2 0.8 5.4 0.8 6.7 1.2 7.9 2.1 8.8 3 9.6 4.2 10.1 5.4 10.1 6.5 10.1 7.5 9.8 8.3 9.2L12.4 13.2C12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.3 12.4 13.3 12.5 13.3 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.2L13.2 12.5C13.2 12.5 13.2 12.5 13.2 12.5 13.2 12.5 13.3 12.5 13.3 12.4 13.3 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4 13.2 12.4V12.4ZM7.9 7.9C7.3 8.6 6.4 8.9 5.4 8.9 4.5 8.9 3.6 8.6 3 7.9 2.3 7.3 1.9 6.4 1.9 5.4 1.9 4.5 2.3 3.6 3 3 3.6 2.3 4.5 1.9 5.4 1.9 6.4 1.9 7.3 2.3 7.9 3 8.6 3.6 8.9 4.5 8.9 5.4 8.9 6.4 8.6 7.3 7.9 7.9Z" />
              </svg>
            </button>
          </div>
          {/** ************* // LEFT *************** */}
          <a
            itemProp="url"
            id="header-inverted-featured__logo"
            href="/"
            className={`${classes.logoContainer} `}
            title={logo.alt}>
            <img
              // src={
              //   scrolled && auxLogo.src !== logo.src ? auxLogo.src : logo.src
              // }
              src={logoImg}
              alt={logo.alt}
              title={logo.alt}
              className={classes.logo}
            />
          </a>
          <div className={classes.navStoryTitle} />
          {/** ************* RIGHT *************** */}
          <div
            className={`${classes.navBtnContainer} ${classes.rightBtnContainer}`}>
            <div className="flex header-inverted-featured__socials">
              <ShareButtons activeGoogleNews googleNewsText={false} />
            </div>
          </div>
          {/** ************* // RIGHT *************** */}
        </div>
        <MenuLite
          // isSomos={isSomos}
          menuSections={menuSections || []}
          siteDomain={siteDomain}
          legalLinks={legalLinks}
        />
        <div className={classes.callImg}>
          <a
            itemProp="url"
            href="https://promociones.trome.pe/registro/super-llamada-ganadora/"
            title="Llamada Ganadora">
            <img src={winningCallLogo} alt="Llamada Ganadora" />
          </a>
        </div>
        <div className="layer" />
      </header>
      <nav className={classes.band}>
        <div className={classes.bandWrapper}>
          {tags && <div className={classes.tags}>{tags}</div>}

          {bandLinks && bandLinks[0] && (
            <ul className={`${classes.featured}`}>
              {bandLinks.map(({ url, name, styles = [] }) => (
                <li
                  className={`${classes.item}${
                    styles ? ' header__custom-item' : ''
                  }`}
                  key={`band-${url}`}>
                  <a
                    itemProp="url"
                    className={classes.link}
                    href={url}
                    {...(styles && {
                      style: {
                        backgroundColor: styles[0],
                        color: styles[1] || '#ffffff',
                      },
                    })}>
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          )}
          {date.active && (
            <time className={classes.date} dateTime={date.raw}>
              {date.value}
            </time>
          )}
        </div>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: scripts.join(''),
          }}
        />
      </nav>
      <div id="h-basic-pointer" />
    </>
  )
}

HeaderChildInverted.propTypes = {
  logo: PropTypes.shape({
    src: PropTypes.string,
    link: PropTypes.string,
    alt: PropTypes.string,
  }),
  bandLinks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
}

export default React.memo(HeaderChildInverted)
