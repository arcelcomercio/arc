import React from 'react'
import PropTypes from 'prop-types'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { getAssetsPath } from '../../../utilities/assets'

import HeaderChildSpecialBasic from './_children/basic-header'

const HeaderSpecialBasic = props => {
  const { arcSite, contextPath, requestUri } = useFusionContext()

  const { customFields: { postTitle = '' } = {} } = props

  const {
    siteDomain = '',
    assets: { header: { special: logoSite = '' } = {} },
    social: {
      twitter: { user: siteNameRedSocial },
    },
    siteUrl,
  } = getProperties(arcSite)

  const params = {
    siteDomain,
    logo: {
      src: `${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/${logoSite}?d=1`,
      alt: siteDomain,
    },
    siteUrl,
    requestUri,
    postTitle,
    siteNameRedSocial,
  }

  return <HeaderChildSpecialBasic {...params} />
}

HeaderSpecialBasic.label = 'Especial - Cabecera Básica'
HeaderSpecialBasic.static = true

HeaderSpecialBasic.propTypes = {
  customFields: PropTypes.shape({
    postTitle: PropTypes.string.tag({
      name: 'Titulo de Especial',
    }),
  }),
}

export default HeaderSpecialBasic
