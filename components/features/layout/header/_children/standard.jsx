import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  header: `header bg-primary primary-font w-full header__main font-bold flex items-center justify-center pt-0 pb-0 pl-15 pr-15 text-sm text-gray-300 hidden lg:flex`,
  logo: 'header__logo',
  featured: 'flex justify-evenly header__featured w-full font-normal',
  item: 'flex items-center justify-center header__item h-inherit',
  link: 'header__link uppercase text-sm',
  navWrapper: 'nav__wrapper hidden md:block',
}
// TODO: Agregar el click afuera del menu
const HeaderChildStandard = props => {
  const { logo, sections, device, deviceList } = props

  const _handleHide = () => {
    let option = false
    switch (device) {
      case 'desktop':
        option = deviceList.showInDesktop
        break
      case 'tablet':
        option = deviceList.showInTablet
        break
      case 'mobile':
        option = deviceList.showInMobile
        break
      default:
        option = true
    }
    return option
  }

  return (
    _handleHide() && (
      <>
        <header className={classes.header}>
          <a href={logo.link}>
            <img src={logo.src} alt={logo.alt} className={classes.logo} />
          </a>
        </header>
        <nav className={classes.navWrapper}>
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
