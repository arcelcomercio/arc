import React from 'react'
import PropTypes from 'prop-types'

import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import getFooterProperties from '../_dependencies/properties'
import FooterChildElComercio from './children/footer'
import { getAssetsPath } from '../../../utilities/assets'

const URL_BOOK_DEFAULT = 'http://ecomedia.pe/libro/inicio/elcomercio/'

const FooterElComercio = props => {
  const { arcSite, contextPath, isAdmin } = useFusionContext()
  const { customFields: { urlBook = URL_BOOK_DEFAULT } = {} } = props
  const {
    assets: { footer: { logo } = {} } = {},
    legalLinks = [],
    gecSites = [],
    gda = false,
  } = getProperties(arcSite)

  const {
    footer: { siteLegal = [], directors = [], contacts = [] } = {},
  } = getFooterProperties(arcSite)

  const logoUrl =
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/${logo}?d=1` || ''

  const gdaLogo =
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/assets/footer/logo-gda.png?d=1` || ''

  const bookLogo =
    `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/assets/footer/libro-reclamacion.jpg?d=1` || ''

  const params = {
    legalLinks,
    siteLegal,
    directors,
    contacts,
    logoUrl,
    gdaLogo,
    gecSites,
    gda,
    arcSite,
    isAdmin,
    urlBook,
    bookLogo,
  }

  return <FooterChildElComercio {...params} />
}

FooterElComercio.propTypes = {
  customFields: PropTypes.shape({
    urlBook: PropTypes.string.tag({
      name: 'Url de libro de reclamación',
      defaultValue: URL_BOOK_DEFAULT,
      description: `Por defecto es ${URL_BOOK_DEFAULT}`,
    }),
  }),
}
FooterElComercio.label = 'Pié de página - El Comercio'
FooterElComercio.static = true

export default FooterElComercio
