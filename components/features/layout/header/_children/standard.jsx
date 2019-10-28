import React from 'react'
import PropTypes from 'prop-types'

import { getResponsiveClasses } from '../../../../utilities/helpers'

const classes = {
  header: `header bg-primary primary-font w-full font-bold flex items-center justify-center pt-0 pb-0 pl-15 pr-15 text-sm text-gray-300 hidden lg:flex position-relative`,
  logo: 'header__logo',
  featured:
    'header__featured flex justify-around w-full font-normal overflow-hidden mr-20',
  item: 'header__item flex items-center justify-center h-inherit',
  link: 'header__link uppercase text-sm p-10',
  navWrapper:
    'nav__wrapper hidden md:flex justify-between header__wrapper--dashed',
  tags: 'header__tags justify-center mr-20 hidden md:flex',
  date: 'header__date justify-center uppercase ml-5 hidden lg:flex',
}
// TODO: Agregar el click afuera del menu
const HeaderChildStandard = props => {
  const { logo, sections, deviceList, tags, date } = props
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
        {tags !== '' && <div className={classes.tags}>{tags}</div>}
        {sections[0] && (
          <ul className={classes.featured}>
            {sections.map(({ url, name, styles = [] }) => (
              <li
                className={`${classes.item}${
                  styles ? ' header__custom-item' : ''
                }`}
                key={url}>
                <a
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
        {date.active && <div className={classes.date}>{date.value}</div>}
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
