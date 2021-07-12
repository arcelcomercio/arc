import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext, useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import customFields from './_dependencies/custom-fields'
import getFooterProperties from '../_dependencies/properties'
import FooterChildStandardG21 from './_lite/_children/footer-g21'
import { getAssetsPath } from '../../../utilities/assets'
import { SITE_ELCOMERCIO } from '../../../utilities/constants/sitenames'

const DEFAULT_HIERARCHY = 'footer-default'
const CONTENT_SOURCE = 'navigation-by-hierarchy'

const SCHEMA = `{ 
  children {
    name
    _id
    display_name
    url
    node_type
  }
}`

const FooterStandardG21 = (props) => {
  const {
    customFields: {
      sectionsHierarchyConfig: {
        contentConfigValues: { hierarchy: sectionsHierarchy = '' } = {},
      } = {},
      customLogoTitle = 'Ir a la portada',
      customLogoLink = '/',
      customLogo = null,
    } = {},
  } = props

  const { contextPath, arcSite } = useFusionContext()

  const {
    gecSites,
    legalLinks,
    socialNetworks = [],
    assets: { footer: { logo } = {} } = {},
  } = getProperties(arcSite)

  const { footer: { siteLegal, story } = {} } = getFooterProperties(arcSite)

  const sections = useContent({
    source: CONTENT_SOURCE,
    query: {
      hierarchy: sectionsHierarchy || DEFAULT_HIERARCHY,
    },
    filter: SCHEMA,
  })

  const formatData = (res) => {
    const { children = [] } = res || {}
    const auxList = children.map((el) => {
      if (el.node_type === 'link') {
        return {
          name: el.display_name,
          url: el.url,
          node_type: el.node_type,
        }
      }
      return {
        name: el.name,
        url: el._id,
        node_type: el.node_type,
      }
    })
    return auxList
  }

  const logoUrl =
    customLogo ||
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/${logo}?d=1` ||
    ''

  const formattedSections = sections && formatData(sections)

  const { requestUri } = useAppContext()
  const socialNetworksSaltarIntro = [
    {
      name: 'facebook',
      url: 'https://www.facebook.com/SaltarIntroPe',
    },
    {
      name: 'twitter',
      url: 'https://twitter.com/SaltarIntroPe',
    },
  ]

  const dataSocialNetwork =
    arcSite === SITE_ELCOMERCIO && requestUri.includes('/saltar-intro/')
      ? socialNetworksSaltarIntro
      : socialNetworks

  const params = {
    socialNetworks: dataSocialNetwork,
    gecSites,
    legalLinks,
    siteLegal,
    logoUrl,
    sections: formattedSections,
    arcSite,
    story,
    customLogoTitle,
    customLogoLink,
  }

  return <FooterChildStandardG21 {...params} />
}

FooterStandardG21.label = 'Pie de Página - G21'
FooterStandardG21.static = true

FooterStandardG21.propTypes = {
  customFields,
}

export default FooterStandardG21
