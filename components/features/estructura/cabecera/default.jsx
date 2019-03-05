/* eslint-disable react/destructuring-assignment */
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import Button from '../../../../resources/components/button'
import Resizer from '../../../../resources/utilsJs/resizer'

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

@Consumer
class Header extends Component {
  constructor(props) {
    super(props)
    // ------ Checks if you are in desktop or not
    this.state = {
      device: Resizer.setDevice(),
      temas: [],
    }
    this.fetch()
  }

  componentDidMount() {
    window.addEventListener('resize', this._handleResize)
  }

  _handleResize = () => {
    const wsize = window.innerWidth

    // ------ Set the new state if you change from mobile to desktop
    if (wsize >= 1024 && this.state.device !== 'desktop') {
      this.setState({
        device: 'desktop',
      })
      this.dispatchEvent('displayChange', this.state.device)
      // ------ Set the new state if you change from desktop to mobile
    } else if (wsize < 1024 && wsize >= 640 && this.state.device !== 'tablet') {
      this.setState({
        device: 'tablet',
      })
      this.dispatchEvent('displayChange', this.state.device)
    } else if (wsize < 640 && this.state.device !== 'mobile') {
      // ------ Set the new state if you change from desktop to mobile
      this.setState({
        device: 'mobile',
      })
      this.dispatchEvent('displayChange', this.state.device)
    }
  }

  fechaActual = () => {
    const ndate = new Date()
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

    return `${ndate.getDate()} de ${
      arrayMeses[ndate.getMonth()]
    }, ${ndate.getFullYear()}`
  }

  fetch = () => {
    const { arcSite } = this.props

    const { fetched } = this.getContent('navigation__by-hierarchy', {
      website: arcSite,
      hierarchy: 'navegacion-cabecera-tema-del-dia',
    })

    fetched
      .then(data => {
        this.setState({
          temas: data.children,
        })
      })
      .catch(e => console.log(e))
  }

  lista = () => {
    const { temas } = this.state
    return temas.map(({ display_name: name, url }) => {
      return (
        <li className={classes.headerFeaturedItem} key={url}>
          <a href={url}>{name}</a>
        </li>
      )
    })
  }

  render() {
    const { temas, device } = this.state
    const { contextPath, arcSite } = this.props

    return temas[0] && device === 'desktop' ? (
      <header className={classes.header}>
        <div className={classes.headerMain}>
          <span className={classes.headerDate}>{this.fechaActual()}</span>
          <img
            src={`${contextPath}/resources/dist/${arcSite}/images/logo.png`}
            alt={`Logo de ${arcSite}`}
            className={classes.headerLogo}
          />
          <div className={classes.headerBtnContainer}>
            <Button
              iconClass={classes.headerBtnIconLogin}
              btnText="Ingresar"
              btnClass={classes.headerBtnLogin}
              btnLink="#"
            />
            <Button
              btnText="Suscríbete"
              btnClass={classes.headerBtnSubscribe}
              btnLink="#"
            />
          </div>
        </div>

        <ul className={classes.headerFeatured}>
          <li className={classes.headerFeaturedItem}>
            <i className={classes.headerFeaturedItemIcon} />
            LOS TEMAS DE HOY
          </li>
          {temas[0] && this.lista()}
        </ul>
      </header>
    ) : null
  }
}

//  Header.static = true

export default Header
