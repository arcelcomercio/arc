import React, { useState } from 'react'
import {
  getResponsiveClasses,
  searchQuery,
} from '../../../../utilities/helpers'

const classes = {
  // header
  logocontent: `header-section bg-white flex justify-between items-center text-center w-full p-10 border-t-1 border-b-1 border-solid border-gray lg:pt-15 lg:pb-15 lg:pr-10 lg:pl-10`,
  iconmenuwrapper: 'header-section__icon-wrapper lg:hidden',
  menuicon: 'icon-menu header-section__icon title-xl',
  logoWrapper: `header-section__logo-wrapper bg-black right-0 text-center flex justify-center items-center rounded lg:hidden`,
  logoimgwrapper: 'header-section__img-wrapper flex-1',
  logoLink: 'inline-block',
  logoimg: 'header-section__img block',
  logoIcon: 'icon-marca title-xl text-white',

  // menu
  menu: `section-menu position-absolute bg-gray-300 w-0 top-0 left-0 h-full lg:h-auto lg:w-full`,
  menuContent: `section-menu__content bg-black h-full overflow-y lg:w-full lg:text-center`,
  menuClose:
    'section-menu__close text-right w-full pt-15 pr-10 pl-10 lg:hidden',
  menuCloseIcon: 'icon-close section-menu__close-icon text-md text-white',
  menuSearch: `section-menu__search position-relative pt-15 pr-10 pl-10 lg:hidden`,
  menuSearchInput: `section-menu__search-input bg-transparent text-white border-white w-full font-bold pr-10 pl-10 border-1 border-solid text-md`,
  menuSearchIcon: 'icon-search ',
  menuButtonSearchIcon: `section-menu__search-icon text-white position-absolute text-md`,
  menuLogin: 'section-menu__login w-full pt-20 pr-10 pl-10 lg:hidden',
  menuLoginLink: 'flex justify-center',
  menuLoginIcon: 'icon-user section-menu__login-icon mr-10 text-primary-color',
  menuLoginLabel: `section-menu__login-text uppercase font-bold text-md text-white`,
  menuList: `section-menu__list m-0 block pt-5 pb-5 pr-15 pl-15 lg:flex lg:flex lg:justify-evenly`,
  menuItemLink: 'section-menu__item-link hidden lg:flex lg:items-center',
  menuLinkIcon: 'section-menu__link-icon hidden text-gray-300 lg:block',
  iconHome: 'icon-home',
  menuItem: 'section-menu__item',
  menuLink: `section-menu__link text-xl text-white pt-15 pb-15 inline-block w-full lg:flex lg:items-center`,
  menubtn: 'header-section__btn',

  menuActive: 'section-menu--active w-full',
}
// TODO: Agregar el click afuera del menu
export default ({
  logo = '',
  sections = [],
  queryInput = '',
  deviceList = {},
  customLogoLink = '/',
  showIconHome,
  showVinetas,
}) => {
  const [isMenuActive, toggleMenu] = useState(false)
  const [searchValue, changeSearchValue] = useState('')

  const handleSubmit = e => {
    searchQuery(searchValue)
    e.preventDefault()
  }

  const handleSearchInput = e => {
    changeSearchValue(e.target.value)
  }

  const search = decodeURIComponent(queryInput.query || '').replace(/\+/g, ' ')

  return (
    <>
      <div
        className={`${classes.logocontent} ${getResponsiveClasses(
          deviceList
        )}`}>
        <div className={classes.iconmenuwrapper}>
          <button
            type="button"
            onClick={() => {
              toggleMenu(!isMenuActive)
            }}
            className={classes.menubtn}>
            <i className={classes.menuicon} />
          </button>
        </div>
        <div className={classes.logoimgwrapper}>
          <a href={customLogoLink} className={classes.logoLink}>
            <img className={classes.logoimg} src={logo} alt="Somos" />
          </a>
        </div>
        <div className={classes.logoWrapper}>
          <a href={customLogoLink}>
            <i className={classes.logoIcon} />
          </a>
        </div>
      </div>

      <nav
        className={`${classes.menu} ${
          isMenuActive ? classes.menuActive : ''
        } ${getResponsiveClasses(deviceList)}`}>
        <div className={classes.menuContent}>
          <div className={classes.menuClose}>
            <button
              type="button"
              onClick={() => {
                toggleMenu(!isMenuActive)
              }}>
              <i className={classes.menuCloseIcon} />
            </button>
          </div>
          <div className={classes.menuSearch}>
            <form action="" onSubmit={e => handleSubmit(e)}>
              <input
                type="text"
                placeholder="Buscar"
                className={classes.menuSearchInput}
                defaultValue={search}
                value={searchValue}
                onChange={e => handleSearchInput(e)}
              />
              <button
                className={classes.menuButtonSearchIcon}
                type="submit"
                onClick={() => {}}>
                <i className={classes.menuSearchIcon} />
              </button>
            </form>
          </div>
          <div className={classes.menuLogin}>
            <a href="/" className={classes.menuLoginLink}>
              <i className={classes.menuLoginIcon} />
              <p className={classes.menuLoginLabel}>Ingresa a tu cuenta</p>
            </a>
          </div>
          <ul className={classes.menuList}>
            {showIconHome && (
              <li className={classes.menuItemLink}>
                <a href="/somos" className={classes.menuLinkIcon}>
                  <i className={classes.iconHome} />
                </a>
              </li>
            )}
            {sections.map(section => (
              <li className={classes.menuItem} key={section.url}>
                <a
                  href={section.url}
                  className={`${classes.menuLink} ${
                    showVinetas ? 'section-menu__link--v' : ''
                  }  `}>
                  {section.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  )
}
