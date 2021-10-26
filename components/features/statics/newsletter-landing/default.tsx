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
  nnCont1: 'newsletter--landing__container1',
  nnTitle: 'newsletter--landing__container1__title',
  nnLogo: 'newsletter--landing__container1__logo',
  nnText: 'newsletter--landing__container1__Text',

  nnCont2: 'newsletter--landing__container2',

  nnLeftCont: 'newsletter--landing__container2__left-container',
  nnBox: 'newsletter--landing__container2__left-container__box',
  nnLeftSvg: 'newsletter--landing__container2__left-container__left-svg',
  nnInputTerm: 'newsletter--landing__container2__left-container__input-term',
  nnLeftText: 'newsletter--landing__container2__left-container__left-text',

  nnRightCont: 'newsletter--landing__container2__right-container',
  // nnBox: 'newsletter--landing__container2__left-container__box',
  nnRightSvg: 'newsletter--landing__container2__right-container__right-svg',
  // nnBoxCheckbox2: 'newsletter--landing__container2__right-container__box-checkbox2',
  // nnRightText: 'newsletter--landing__container2__right-container__right-text',

  nnCont3: 'newsletter--landing__container3',

  nnForm6: 'newsletter--landing__container3__form6',
  nnTextBox: 'newsletter--landing__container3__form6__text-box',
  nnButtonReceive: 'newsletter--landing__container3__form6__button-receive',
  // nnInputTerm: 'newsletter--landing__container2__left-container__input-term',
  nnTextTerm: 'newsletter--landing__container3__form6__text-term',

  nnForm7: 'newsletter--landing__container3__form7',
  nnMessageSubscribed:
    'newsletter--landing__container3__form7__message-subscribed',
  nnButtonHome: 'newsletter--landing__container3__form7__button-home',

  // nnForm1: 'newsletter--landing__container3__form1',
  // nnButtonReceive2: 'newsletter--landing__container3__form1__button-receive2',
}

// URL DE ESTILOS EN DEPOR
// src/websites/depor/scss/lite-components/features/statics/_newsletter-landing.scss

const NewsletterLanding: FC<FeatureProps> = () => (
  // const { customFields: { UrlTerminos, UrlPolitica, UrlMoreNews } = {} } = props

  // const { newsletterBrand } = getProperties(arcSite)

  <>
    <div className={classes.nnContainer}>
      <div />
      <div />
      <div />
    </div>
  </>
)

NewsletterLanding.static = true
NewsletterLanding.label = 'Newsletter - Landing'

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
