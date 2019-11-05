import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import HeaderChildStandard from './_children/standard'
import Formatter from './_dependencies/formatter'
import customFields from './_dependencies/custom-fields'

const DEFAULT_HIERARCHY = 'header-default'

@Consumer
class HeaderStandard extends PureComponent {
  constructor(props) {
    super(props)
    const {
      contextPath,
      arcSite,
      deployment,
      siteProperties: {
        siteDomain,
        assets: { header: headerProperties },
      },
      customFields: { customLogo, customLogoLink, tags, showDate },
    } = this.props

    this.formater = new Formatter(
      deployment,
      contextPath,
      siteDomain,
      headerProperties,
      arcSite,
      {},
      customLogo,
      customLogoLink,
      tags,
      showDate
    )
    this.getNavigationSections()
  }

  /* componentDidMount() {
    // TODO: Si googleTagManager no ejecuta, descomentar.
    // const { googleTagManagerScript } = this.props.siteProperties
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

  render() {
    const { data } = this.state
    const {
      customFields: {
        showInDesktop = true,
        showInTablet = true,
        showInMobile = true,
        isSlider,
      },
    } = this.props

    this.formater.setData(data)

    const params = { ...this.formater.getParams(), isSlider }

    return (
      <HeaderChildStandard
        {...params}
        deviceList={{ showInDesktop, showInTablet, showInMobile }}
      />
    )
  }
}

HeaderStandard.label = 'Cabecera - Estándar'
// HeaderStandard.static = true

HeaderStandard.propTypes = {
  customFields,
}

export default HeaderStandard
