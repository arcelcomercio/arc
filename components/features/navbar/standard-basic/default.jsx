import Consumer from 'fusion:consumer'
import * as React from 'react'
import PropTypes from 'prop-types'

import NavBarComercio from './_children/standard'
import Formatter from './_dependencies/formatter'
import Newsletter from '../../statics/newsletter-custom/default'

@Consumer
class LayoutNavbar extends React.PureComponent {
  constructor(props) {
    super(props)
    const {
      contextPath,
      arcSite,
      deployment,
      siteProperties: {
        assets: { nav },
      },
    } = this.props

    this.formatter = new Formatter({
      deployment,
      contextPath,
      nav,
      arcSite,
    })
    this.fetchContent({
      navbarData: {
        source: 'navigation-by-hierarchy',
        query: { hierarchy: 'navbar-default' },
        filter: this.formatter.getSchema(),
      },
    })
    const { params, source } = this.formatter.main().fetch().config
    /** Solicita la data a la API y setea los resultados en "state.data" */
    this.fetchContent({
      data: {
        source,
        query: params,
        filter: this.formatter.getSchema(),
      },
    })
  }

  render() {
    const {
      customFields: {
        showInDesktop = true,
        showInTablet = true,
        showInMobile = true,
        hideMenu,
      } = {},
    } = this.props
    const { data = [], navbarData = [] } = this.state || {}

    const formatData = (datas = {}) => {
      const LINK = 'link'
      const { children = [] } = datas || {}
      return children.map(child => {
        let name = child.node_type === LINK ? child.display_name : child.name
        const rawMatch = name.match(/\[#.*\]/g)
        const match =
          rawMatch === null
            ? []
            : rawMatch[0]
                .replace('[', '')
                .replace(']', '')
                .split(',')
        if (match) {
          name = name.replace(/\[#.*\]/g, '')
        }
        return {
          name,
          url: child.node_type === LINK ? child.url : child._id,
          styles: match,

          children: child.children,
          _id: child._id,
          display_name: child.display_name,
        }
      })
    }

    const dataFormat = {
      children: formatData(data),
    }
    const headerNewsletter = <Newsletter />
    return (
      <NavBarComercio
        deviceList={{ showInDesktop, showInTablet, showInMobile }}
        data={dataFormat}
        navbarData={navbarData}
        hideMenu={hideMenu}
        headerNewsletter={headerNewsletter}
        {...this.formatter.main().initParams()}
      />
    )
  }
}

LayoutNavbar.propTypes = {
  customFields: PropTypes.shape({
    hideMenu: PropTypes.bool.tag({
      name: 'Ocultar menu',
      defaultValue: true,
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
  }),
}

LayoutNavbar.label = 'Barra de Navegación - básico'
LayoutNavbar.static = true

export default LayoutNavbar
