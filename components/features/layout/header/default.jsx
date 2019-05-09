/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import Button from '../../../global-components/button'
import { setDevice } from '../../../utilities/resizer'

// TODO: Separar Feature de Componente.

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
class LayoutHeader extends PureComponent {
  constructor(props) {
    super(props)
    // ------ Checks if you are in desktop or not
    this.state = {
      device: setDevice(),
      temas: [],
    }
    this.fetch()
  }

  componentDidMount() {
    // TODO: Si googleTagManager no ejecuta, descomentar.
    // const { googleTagManagerScript } = this.props.siteProperties
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

  // TODO: Homologar con helper de fechas
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

  fetch() {
    const { arcSite } = this.props

    const source = 'navigation-by-hierarchy'
    const params = {
      website: arcSite,
      hierarchy: 'navegacion-cabecera-tema-del-dia',
    }
    const schema = `{ 
      children {
        name
        _id
        display_name
        url
        node_type
      }
    }`

    const { fetched } = this.getContent(source, params, schema)

    fetched.then(response => {
      const { children = [] } = response || {}
      const auxList = children.map(el => {
        return {
          name: el.node_type === 'link' ? el.display_name : el.name,
          url: el.node_type === 'link' ? el.url : el._id,
          node_type: el.node_type,
        }
      })
      this.setState({
        temas: auxList || [],
      })
    })
  }

  renderList() {
    const { temas } = this.state
    return temas.map(({ name, url }) => (
      <li className={classes.headerFeaturedItem} key={url}>
        <a href={url}>{name}</a>
      </li>
    ))
  }

  render() {
    const { temas, device } = this.state
    const {
      contextPath,
      arcSite,
      deployment,
      requestUri,
      siteProperties: { headerLogo = 'logo.png' },
    } = this.props
    const querys = requestUri.split('?')[1]
    const queryString = querys !== undefined ? `?${querys}` : ''

    return (
      device === 'desktop' && (
        <header className={classes.header}>
          <div className={classes.headerMain}>
            <span className={classes.headerDate}>{this.fechaActual()}</span>
            <a href={`${contextPath || ''}/${queryString}`}>
              <img
                src={deployment(
                  `${contextPath}/resources/dist/${arcSite}/images/${headerLogo}`
                )}
                alt={`Logo de ${arcSite}`}
                className={classes.headerLogo}
              />
            </a>
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
          {temas[0] && (
            <ul className={classes.headerFeatured}>
              <li className={classes.headerFeaturedItem}>
                <i className={classes.headerFeaturedItemIcon} />
                LOS TEMAS DE HOY
              </li>
              {this.renderList()}
            </ul>
          )}
        </header>
      )
    )
  }
}

LayoutHeader.label = 'Cabecera de Página'

export default LayoutHeader
