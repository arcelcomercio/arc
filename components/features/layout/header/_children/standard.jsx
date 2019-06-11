import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  header:
    'header primary-font full-width header__main font-bold flex items-center justify-center',
  logo: 'header__logo',
  featured: 'flex justify-between header__featured full-width font-normal',
  item: 'flex items-center justify-center header__item',
  link: 'header__link uppercase',
}

const HeaderChildStandard = props => {
  const { logo, sections, device, deviceList } = props

  const _handleHide = () => {
    switch (device) {
      case 'desktop':
        return deviceList.showInDesktop

      case 'tablet':
        return deviceList.showInTablet

      case 'mobile':
        return deviceList.showInMobile

      default:
        return true
    }
  }

  return (
    _handleHide() && (
      <>
        <header className={classes.header}>
          <a href={logo.link}>
            <img src={logo.src} alt={logo.alt} className={classes.logo} />
          </a>
        </header>
        <nav>
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
  device: PropTypes.string,
}

export default HeaderChildStandard
