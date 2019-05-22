/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import { setDevice } from '../../../utilities/resizer'

import HeaderChildSomos from './_children/somos'
import HeaderChildStandard from './_children/standard'
import Formater from './_dependencies/formater'

const defaultHierarchy = 'navegacion-cabecera-tema-del-dia'
@Consumer
class LayoutHeader extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      device: setDevice(),
    }
    const {
      contextPath,
      arcSite,
      deployment,
      siteProperties: { siteDomain },
      customFields: { headerType, customLogo, customLogoLink },
    } = this.props
    this.formater = new Formater(
      deployment,
      contextPath,
      siteDomain,
      arcSite,
      {},
      headerType,
      customLogo,
      customLogoLink
    )
  }

  componentDidMount() {
    // TODO: Si googleTagManager no ejecuta, descomentar.
    // const { googleTagManagerScript } = this.props.siteProperties
    window.addEventListener('resize', this._handleResize)
    this.getNavigationSections()
  }

  getNavigationSections() {
    const {
      arcSite,
      customFields: { hierarchyConfig },
    } = this.props

    const { contentService = '', contentConfigValues = {} } =
      hierarchyConfig || {}

    const isHierarchyReady = !!contentConfigValues.hierarchy
    const source = isHierarchyReady ? contentService : 'navigation-by-hierarchy'
    const params = isHierarchyReady
      ? contentConfigValues
      : {
          website: arcSite,
          hierarchy: defaultHierarchy,
        }
    const { schema } = this.formater
    const { fetched } = this.getContent(source, params, schema)
    fetched.then(response => {
      this.setState({
        data: response || [],
      })
    })
  }

  _handleResize = () => {
    const wsize = window.innerWidth
    const mobile = 'mobile'
    const desktop = 'desktop'
    const tablet = 'tablet'
    const displayChangeEvent = 'displayChange'

    // ------ Set the new state if you change from mobile to desktop
    if (wsize >= 1024 && this.state.device !== desktop) {
      this.setState({
        device: desktop,
      })
      this.dispatchEvent(displayChangeEvent, this.state.device)
      // ------ Set the new state if you change from desktop to mobile
    } else if (wsize < 1024 && wsize >= 640 && this.state.device !== tablet) {
      this.setState({
        device: tablet,
      })
      this.dispatchEvent(displayChangeEvent, this.state.device)
    } else if (wsize < 640 && this.state.device !== mobile) {
      // ------ Set the new state if you change from desktop to mobile
      this.setState({
        device: mobile,
      })
      this.dispatchEvent(displayChangeEvent, this.state.device)
    }
  }

  renderHeader = () => {
    const { device, data } = this.state
    const {
      customFields: { headerType },
    } = this.props

    this.formater.setData(data)
    const params = { ...this.formater.getParams(), device }

    const headers = {
      standard: <HeaderChildStandard {...params} />,
      somos: <HeaderChildSomos {...params} />,
    }
    return headers[headerType] || headers.standard
  }

  render() {
    return this.renderHeader()
  }
}

LayoutHeader.label = 'Cabecera de Página'

LayoutHeader.propTypes = {
  customFields: PropTypes.shape({
    headerType: PropTypes.oneOf(['standard', 'somos']).tag({
      name: 'Diseño de la cabecera',
      labels: {
        standard: 'Cabecera estándar',
        somos: 'Cabecera somos',
      },
      defaultValue: 'standard',
      description: `La jerarquía por defecto es "${defaultHierarchy}"`,
    }),
    customLogo: PropTypes.string.tag({
      name: 'Url de la imagen',
      group: 'Editar logo',
    }),
    customLogoLink: PropTypes.string.tag({
      name: 'Path de redireccionamiento',
      description:
        'Por defecto la url del logo es "/". Ejemplo de path: "/somos"',
      group: 'Editar logo',
    }),
    hierarchyConfig: PropTypes.contentConfig('navigation').tag({
      name: 'Editar navegación',
      group: 'Configuración del contenido',
    }),
  }),
}

export default LayoutHeader
