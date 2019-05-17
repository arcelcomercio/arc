/* eslint-disable react/destructuring-assignment */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import { setDevice } from '../../../utilities/resizer'


import HeaderChildElcomercio from './_children/elcomercio'
import SomosAsideMenuContent from './_children/somos-aside-menu-content'
import HeaderSomos from './_children/somos'

import HeaderChildStandard from './_children/standard'


@Consumer
class LayoutHeader extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      device: setDevice(),
      sections: [],
    }
  }

  componentDidMount() {
    // TODO: Si googleTagManager no ejecuta, descomentar.
    // const { googleTagManagerScript } = this.props.siteProperties
    window.addEventListener('resize', this._handleResize)
    this.getNavigationSections()
  }

  getNavigationSections() {
    const { arcSite, contextPath } = this.props

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
    const link = 'link'
    fetched.then(response => {
      const { children = [] } = response || {}
      const auxList = children.map(el => {
        return {
          name: el.node_type === link ? el.display_name : el.name,
          url: el.node_type === link ? el.url : `${contextPath}${el._id}`,
        }
      })
      this.setState({
        sections: auxList || [],
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

  renderHeader = (brand, params) => {
    const headerType = {
      standard: <HeaderChildStandard {...params} />,
      test: <div style={{ backgroundColor: 'red' }}>Prueba de cabecera</div>,
    }
    return headerType[brand] || headerType.standard
  }

  render() {
    const { sections, device } = this.state
    const {
      contextPath,
      arcSite,
      deployment,
      siteProperties: { siteDomain },
      customFields: { headerType },
    } = this.props

<<<<<<< HEAD
    return <SomosAsideMenuContent {...params} />
=======
    const params = {
      sections,
      siteDomain,
      deployment,
      contextPath,
      arcSite,
      device,
    }

    return this.renderHeader(headerType, params)
>>>>>>> Sprint08
  }
}

//return <HeaderSomos {...params} />
//return device === 'desktop' && <HeaderChildElcomercio {...params} />

LayoutHeader.label = 'Cabecera de Página'

LayoutHeader.propTypes = {
  customFields: PropTypes.shape({
    headerType: PropTypes.oneOf(['standard', 'test']).tag({
      name: 'Diseño de la cabecera',
      labels: {
        standard: 'Cabecera estándar',
        test: 'test',
      },
      defaultValue: 'standard',
    }),
  }),
}

export default LayoutHeader
