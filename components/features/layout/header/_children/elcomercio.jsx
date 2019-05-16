import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const classes = {
  header: 'header full-width header__main flex-center',
  headerLogo: 'header__logo',
  headerFeatured: 'flex-center header__featured full-width bg-color--white',
  headerFeaturedItem: 'flex-center header__item',
}

const HeaderChildElcomercio = props => {
  const {
    deployment,
    siteDomain,
    contextPath,
    sections,
    arcSite,
    device,
  } = props

  const isDesktop = device === 'desktop'

  return (
    isDesktop && (
      <Fragment>
        <header className={classes.header}>
          <a href={contextPath}>
            <img
              src={deployment(
                `${contextPath}/resources/dist/${arcSite}/images/logo.png`
              )}
              alt={siteDomain}
              className={classes.headerLogo}
            />
          </a>
        </header>
        <nav>
          {sections[0] && (
            <ul className={classes.headerFeatured}>
              <li className={classes.headerFeaturedItem}>
                <a href={`${contextPath}/archivo`}>Lo último</a>
              </li>
              {sections.map(theme => (
                <li className={classes.headerFeaturedItem} key={theme.url}>
                  <a href={`${contextPath}${theme.url}`}>{theme.name}</a>
                </li>
              ))}
            </ul>
          )}
        </nav>
      </Fragment>
    )
  )
}

HeaderChildElcomercio.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  arcSite: PropTypes.string,
  contextPath: PropTypes.string,
  deployment: PropTypes.func,
  siteDomain: PropTypes.string,
  isDesktop: PropTypes.bool,
}

export default HeaderChildElcomercio
