import React from 'react'
import PropTypes from 'prop-types'

import { getResponsiveClasses } from '../../../../utilities/helpers'

const classes = {
  header: `header bg-primary primary-font w-full font-bold flex items-center justify-center pt-0 pb-0 pl-15 pr-15 text-sm text-gray-300 hidden lg:flex`,
  logo: 'header__logo',
  featured: 'header__featured flex justify-around w-full font-normal',
  item: 'header__item flex items-center justify-center h-inherit',
  link: 'header__link uppercase text-sm p-10',
  navWrapper: 'nav__wrapper hidden md:block',
}
// TODO: Agregar el click afuera del menu
const HeaderChildStandard = props => {
  const { logo, sections, deviceList } = props

  return (
    <>
      <header
        className={`${classes.header} ${getResponsiveClasses(deviceList)}`}>
        <a href={logo.link}>
          <img src={logo.src} alt={logo.alt} className={classes.logo} />
        </a>
      </header>
      <nav
        className={`${deviceList.showInDesktop &&
          classes.navWrapper} ${getResponsiveClasses(deviceList)}`}>
        {sections[0] && (
          <ul className={classes.featured}>
            {sections.map(section => (
              <li className={classes.item} key={section.url}>
                <a className={classes.link} href={section.url}>
                  {section.name}
                </a>
              </li>
            ))}
          </ul>
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
