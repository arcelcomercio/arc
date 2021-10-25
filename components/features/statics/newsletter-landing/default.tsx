/* eslint-disable jsx-a11y/label-has-associated-control */
// import { useAppContext } from 'fusion:context'
// import { NEWSLETTER_API, NEWSLETTER_API_TEMATICO } from 'fusion:environment'
// import getProperties from 'fusion:properties'
// import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

// import { getAssetsPath } from '../../../utilities/assets'

interface FeatureProps {
  customFields?: {
    UrlTerminos?: string
    UrlPolitica?: string
    UrlMoreNews?: string
  }
}

const classes = {
  nnContainer: 'newsletter--landing',
}

// URL DE ESTILOS EN DEPOR
// src/websites/depor/scss/lite-components/features/statics/_newsletter-landing.scss

const NewsletterLanding: FC<FeatureProps> = () => (
  // const { customFields: { UrlTerminos, UrlPolitica, UrlMoreNews } = {} } = props

  // const { newsletterBrand } = getProperties(arcSite)

  <>
    <div className={classes.nnContainer}>HOLAAAA</div>
  </>
)

NewsletterLanding.static = true
NewsletterLanding.label = 'Newsletter - landing'

// NewsletterLanding.propTypes = {
//   customFields: PropTypes.shape({
//     UrlTerminos: PropTypes.string.tag({
//       name: 'URL Terminos y Condiciones',
//     }),
//     UrlPolitica: PropTypes.string.tag({
//       name: 'URL Politica de Privacidad',
//     }),
//     UrlMoreNews: PropTypes.string.tag({
//       name: 'URL Más Newsletter',
//     }),
//   }),
// }

export default NewsletterLanding
