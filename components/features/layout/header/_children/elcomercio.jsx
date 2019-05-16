import React from 'react'
import PropTypes from 'prop-types'

import GlobalComponentButton from '../../../../global-components/button'

const classes = {
  header: 'header full-width',
  headerMain:
    'header__main full-width flex-center-vertical flex--justify-between',
  headerDate: 'flex-1',
  headerLogo: 'header__logo',
  headerBtnContainer:
    'flex-center-vertical flex-1 flex--justify-end height-inherit',
  headerBtnLogin: 'flex-center-vertical btn bg-color--white',
  headerBtnSubscribe: 'flex-center-vertical btn bg-color--link',
  headerBtnIconLogin: 'icon icon--login icon--margin-right',
  headerFeatured: 'flex-center header__featured full-width bg-color--white',
  headerFeaturedItem: 'flex-center header__item',
  headerFeaturedItemIcon: 'icon icon--fire icon--margin-right',
}

const HeaderChildElcomercio = props => {
  const currentDate = () => {
    const date = new Date()
    const arrayMeses = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ]

    return `${date.getDate()} de ${
      arrayMeses[date.getMonth()]
    }, ${date.getFullYear()}`
  }

  const { deployment, siteDomain, contextPath, data, arcSite } = props

  return (
    <header className={classes.header}>
      <div className={classes.headerMain}>
        <span className={classes.headerDate}>{currentDate()}</span>
        <a href="/">
          <img
            src={deployment(
              `${contextPath}/resources/dist/${arcSite}/images/logo.png`
            )}
            alt={siteDomain}
            className={classes.headerLogo}
          />
        </a>
        <div className={classes.headerBtnContainer}>
          <GlobalComponentButton
            iconClass={classes.headerBtnIconLogin}
            btnText="Ingresar"
            btnClass={classes.headerBtnLogin}
            btnLink="#"
          />
          <GlobalComponentButton
            btnText="Suscríbete"
            btnClass={classes.headerBtnSubscribe}
            btnLink="#"
          />
        </div>
      </div>
      {data[0] && (
        <ul className={classes.headerFeatured}>
          <li className={classes.headerFeaturedItem}>
            <i className={classes.headerFeaturedItemIcon} />
            LOS TEMAS DE HOY
          </li>
          {data.map(theme => (
            <li className={classes.headerFeaturedItem} key={theme.url}>
              <a href={theme.url}>{theme.name}</a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

HeaderChildElcomercio.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  arcSite: PropTypes.string,
  contextPath: PropTypes.string,
  deployment: PropTypes.func,
  siteDomain: PropTypes.string,
}

export default HeaderChildElcomercio
