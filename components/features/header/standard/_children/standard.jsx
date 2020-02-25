import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import {
  sideScroll,
  handleNavScroll,
  checkDisabledIcons,
  getResponsiveClasses,
} from '../../../../utilities/slidernav-helpers'
import ConfigParams from '../../../../utilities/config-params'

// TODO: Agregar el click afuera del menu
const HeaderChildStandard = props => {
  const {
    logo,
    logoLeft,
    sections,
    deviceList,
    tags,
    date,
    arcSite,
    isSlider,
  } = props

  useEffect(() => {
    if (isSlider) checkDisabledIcons()
  }, [isSlider])

  return (
    <>
      <header
        className={`header bg-primary primary-font w-full font-bold flex items-center justify-center pt-0 pb-0 pl-15 pr-15 text-sm text-gray-300 hidden lg:flex position-relative ${getResponsiveClasses(
          deviceList
        )}`}>
        <a href={logo.link}>
          <img src={logo.src} alt={logo.alt} className="header__logo" />
        </a>
        {arcSite === ConfigParams.SITE_PERU21 && (
          <a
            className="header__logo-secondary"
            href="/el-otorongo?ref=portada_home&amp;ft=btn_menu">
            <img
              src={logoLeft.src}
              alt={logo.alt}
              className="w-full h-full object-cover"
            />
          </a>
        )}
      </header>
      <nav
        className={`${deviceList.showInDesktop &&
          'nav__wrapper hidden md:flex justify-between header__wrapper--dashed'} ${getResponsiveClasses(
          deviceList
        )}`}>
        {tags !== '' && (
          <div className="header__tags justify-center mr-20 hidden md:flex">
            {tags}
          </div>
        )}
        {isSlider && (
          <button
            type="button"
            onClick={() => {
              sideScroll('left', 15, 100, 5)
            }}
            className="header__button left disabled position-relative">
            <i className="header__icon-back left icon-back text-white rounded font-bold p-5"></i>
          </button>
        )}
        {sections[0] && (
          <ul
            className={`header__featured flex w-full font-normal overflow-hidden mr-20${
              isSlider ? ' slider' : ''
            }`}
            onScroll={e => {
              if (isSlider) handleNavScroll(e)
            }}>
            {sections.map(({ url, name, styles = [] }) => (
              <li
                className={`header__item flex items-center justify-center h-inherit${
                  styles ? ' header__custom-item' : ''
                }`}
                key={url}>
                <a
                  className="header__link uppercase text-sm p-10"
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
        {isSlider && (
          <button
            type="button"
            onClick={() => {
              sideScroll('right', 15, 100, 5)
            }}
            className="header__button right disabled position-relative">
            <i className="header__icon-back right icon-back text-white rounded font-bold p-5"></i>
          </button>
        )}
        {date.active && (
          <div className="header__date justify-center uppercase ml-5 hidden lg:flex">
            {date.value}
          </div>
        )}
      </nav>
    </>
  )
}

HeaderChildStandard.propTypes = {
  logo: PropTypes.shape({
    src: PropTypes.string,
    link: PropTypes.string,
    alt: PropTypes.string,
  }),
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
}

export default HeaderChildStandard
