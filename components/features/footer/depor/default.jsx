import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import PropTypes from 'prop-types'
import React from 'react'

import { getAssetsPath } from '../../../utilities/assets'
import getFooterProperties from '../_dependencies/properties'
import FooterInfo from './_children/FooterInfo'
import FooterDeporColumnSection from './_children/FooterSection'
import customFields from './_dependencies/custom-fields'

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
  footer: 'footer-secction__footer',
  content: 'footer-secction__content-footer ',
}

const FooterDepor = (props) => {
  const { arcSite, contextPath, isAdmin } = useFusionContext()

  const { customFields: { newDesign, isBook, bookUrl } = {} } = props

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

  const bookLogo =
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/assets/footer/libro-reclamacion.jpg?d=1` || ''

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
    isBook,
    bookUrl,
    bookLogo,
    isAdmin,
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
    newDesign,
    isBook,
    bookUrl,
    bookLogo,
    isAdmin,
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

FooterDepor.propTypes = {
  customFields,
}

FooterDepor.label = 'Pié de página - Depor'
// FooterDepor.static = true

FooterDepor.propTypes = {
  customFields: PropTypes.shape({
    isBook: PropTypes.bool.tag({
      name: 'Activar Libro de Reclamaciones',
      group: 'Extras',
    }),
    bookUrl: PropTypes.string.tag({
      name: 'URL Libro de Reclamaciones',
      group: 'Extras',
    }),
  }),
}

export default FooterDepor
