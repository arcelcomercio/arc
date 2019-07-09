import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
// import { setDevice } from '../../../utilities/resizer'

import HeaderChildSomos from './_children/somos'
import HeaderChildStandard from './_children/standard'
import Formatter from './_dependencies/formatter'

const DEFAULT_HIERARCHY = 'header-default'
@Consumer
class LayoutHeader extends PureComponent {
  constructor(props) {
    super(props)
    /* this.state = {
      device: setDevice(),
      data: {},
    } */
    const {
      contextPath,
      arcSite,
      deployment,
      siteProperties: {
        siteDomain,
        assets: { header: headerProperties },
      },
      customFields: { headerType, customLogo, customLogoLink, tags, showDate },
    } = this.props
    this.formater = new Formatter(
      deployment,
      contextPath,
      siteDomain,
      headerProperties,
      arcSite,
      {},
      headerType,
      customLogo,
      customLogoLink,
      tags,
      showDate,
    )
    this.getNavigationSections()
  }

  /* componentDidMount() {
    // TODO: Si googleTagManager no ejecuta, descomentar.
    // const { googleTagManagerScript } = this.props.siteProperties
    window.addEventListener('resize', this._handleResize)
  } */

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
          hierarchy: DEFAULT_HIERARCHY,
        }
    this.fetchContent({
      data: {
        source,
        query: params,
        filter: this.formater.getSchema(),
      },
    })
  }

  /* changesResize = device => {
    const displayChangeEvent = 'displayChange'
    this.setState({
      device,
    })
    this.dispatchEvent(displayChangeEvent, device)
  }

  _handleResize = () => {
    const wsize = window.innerWidth
    const mobile = 'mobile'
    const desktop = 'desktop'
    const tablet = 'tablet'

    const { device } = this.state

    // ------ Set the new state if you change from mobile to desktop
    if (wsize >= 1024 && device !== desktop) {
      this.changesResize(desktop)
    } else if (wsize < 1024 && wsize >= 640 && device !== tablet) {
      // ------ Set the new state if you change from desktop to mobile
      this.changesResize(tablet)
    } else if (wsize < 640 && device !== mobile) {
      // ------ Set the new state if you change from desktop to mobile
      this.changesResize(mobile)
    }
  } */

  renderHeader = () => {
    const { data } = this.state
    const {
      customFields: {
        headerType,
        showInDesktop = true,
        showInTablet = true,
        showInMobile = true,
      },
    } = this.props

    this.formater.setData(data)
    const params = { ...this.formater.getParams() }

    const headers = {
      standard: (
        <HeaderChildStandard
          {...params}
          deviceList={{ showInDesktop, showInTablet, showInMobile }}
        />
      ),
      somos: (
        <HeaderChildSomos
          {...params}
          deviceList={{ showInDesktop, showInTablet, showInMobile }}
        />
      ),
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
      description:
        'La configuración de visibilidad por dispositivo depende del tipo de cabecera',
    }),
    showInDesktop: PropTypes.bool.tag({
      name: 'Mostrar en desktop',
      defaultValue: true,
    }),
    showInTablet: PropTypes.bool.tag({
      name: 'Mostrar en tablet',
      defaultValue: true,
    }),
    showInMobile: PropTypes.bool.tag({
      name: 'Mostrar en móviles ',
      defaultValue: true,
    }),
    showDate: PropTypes.bool.tag({
      name: 'Mostrar fecha',
      defaultValue: false,
    }),
    tags: PropTypes.string.tag({
      name: 'Etiqueta'
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
