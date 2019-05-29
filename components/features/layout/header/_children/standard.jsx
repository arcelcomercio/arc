import React from 'react'
import PropTypes from 'prop-types'

const classes = {
  header: 'header full-width header__main flex-center',
  headerLogo: 'header__logo',
  headerFeatured: 'flex flex--justify-between header__featured full-width',
  headerFeaturedItem: 'flex-center header__item',
  headerNav: 'header__nav-wrapper',
}

const HeaderChildStandard = props => {
  const { logo, sections, device } = props

  const isDesktop = device === 'desktop'

  return (
    isDesktop && (
      <>
        <header className={classes.header}>
          <a href={logo.link}>
            <img src={logo.src} alt={logo.alt} className={classes.headerLogo} />
          </a>
        </header>
        <nav className={classes.headerNav}>
          {sections[0] && (
            <ul className={classes.headerFeatured}>
              {sections.map(section => (
                <li className={classes.headerFeaturedItem} key={section.url}>
                  <a href={section.url}>{section.name}</a>
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
