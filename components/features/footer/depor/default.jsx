import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import getFooterProperties from '../_dependencies/properties'
import FooterDeporColumnSection from './_children/FooterSection'
import FooterInfo from './_children/FooterInfo'
import { getAssetsPath } from '../../../utilities/assets'

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

const FooterDepor = () => {
  const { arcSite, contextPath } = useFusionContext()

  const {
    gecSites,
    siteUrl = '',
    legalLinks = [],
    socialNetworks = [],
  } = getProperties(arcSite)

  const {
    footer: {
      contacts = [],
      corporateInfo = {},
      draftingContact = [],
      copyrightText = '',
    } = {},
  } = getFooterProperties(arcSite)

  const imageDefault = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/logo.png?d=1`

  const sections = useContent({
    source: CONTENT_SOURCE,
    query: {
      website: arcSite,
      hierarchy: DEFAULT_HIERARCHY,
    },
    filter: SCHEMA,
  })

  const { children = [] } = sections || {}

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

FooterDepor.label = 'Pié de página - Depor'
FooterDepor.static = true

export default FooterDepor
