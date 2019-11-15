import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import FooterDeporColumnSection from './_children/FooterSection'
import FooterInfo from './_children/FooterInfo'

const DEFAULT_HIERARCHY = 'footer-default'

const CONTENT_SOURCE = 'navigation-by-hierarchy'

const SCHEMA = `{ 
  children {
    name
    _id
    display_name
    url
    node_type
    children {
      display_name
      url
    }
  }
}`

const classes = {
  footer: 'bg-white',
  content: 'footer-secction__content-footer ',
}

@Consumer
class FooterDepor extends PureComponent {
  constructor(props) {
    super(props)
    const {arcSite} = this.props
    this.fetchContent({
      sections: {
        source: CONTENT_SOURCE,
        query: {
          website: arcSite,
          hierarchy: DEFAULT_HIERARCHY,
        },
        filter: SCHEMA,
      },
    })
  }

  render() {
    const { sections: { children = [] } = {} } = this.state
    const {
      arcSite,
      siteProperties: {
        gecSites,
        siteUrl = '',
        legalLinks = [],
        footer: {
          socialNetworks = [],
          contacts = [],
          corporateInfo = {},
          draftingContact = [],
          copyrightText = '',
        } = {},
      } = {},
      contextPath,
    } = this.props

    // const imageDefault =  `${contextPath}/resources/dist/depor/images/logo.png`
    const { deployment } = this.props
    const imageDefault = deployment(
      `${contextPath}/resources/dist/${arcSite}/images/logo.png`
    )

    const footerProps = {
      sections: children,
      socialNetworks,
      arcSite,
    }
    const footerInfoProp = {
      siteUrl,
      imageDefault,
      gecSites,
      legalLinks,
      socialNetworks,
      contacts,
      corporateInfo,
      draftingContact,
      copyrightText,
    }
    const keyString = 'key0'
    return (
      <footer className={classes.footer}>
        <div className={classes.content}>
          <FooterDeporColumnSection key={keyString} {...footerProps} />
          <FooterInfo key={0} {...footerInfoProp} />
        </div>
      </footer>
    )
  }
}

FooterDepor.label = 'Pié de página - Depor'
FooterDepor.static = true

export default FooterDepor
