/* eslint-disable jsx-a11y/label-has-associated-control */
// import { useAppContext } from 'fusion:context'
// import { NEWSLETTER_API, NEWSLETTER_API_TEMATICO } from 'fusion:environment'
// import getProperties from 'fusion:properties'
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

// import { getAssetsPath } from '../../../utilities/assets'

interface FeatureProps {
  customFields?: {
    UrlTerminos?: string
    UrlPolitica?: string
  }
}

const classes = {
  nnContainer: 'newsletter--landing',
  nnCont1: 'newsletter--landing__container1',
  nnBox1: 'newsletter--landing__box1',
  nnTitle: 'newsletter--landing__container1__box1__title',
  nnLogo: 'newsletter--landing__container1__box1__logo',
  nnText: 'newsletter--landing__container1__Text',

  nnCont2: 'newsletter--landing__container2',

  nnSecCont: 'newsletter--landing__container2__sec-container',
  nnBox2: 'newsletter--landing__container2__sec-container__box2',
  nnLeftSvg: 'newsletter--landing__container2__sec-container__left-svg',
  nnBoxCheckbox1:
    'newsletter--landing__container2__sec-container__box-checkbox1',
  nnInputTerm:
    'newsletter--landing__container2__sec-container__box-checkbox1__input-term',
  nnSubTitle:
    'newsletter--landing__container2__sec-container__box-checkbox1__sub-title',
  nnSecText: 'newsletter--landing__container2__sec-container__sec-text',

  // nnSecCont: 'newsletter--landing__container2__sec-container',
  // nnBox: 'newsletter--landing__container2__left-container__box',
  nnRightSvg: 'newsletter--landing__container2__right-container__right-svg',
  // nnInputTerm: 'newsletter--landing__container2__left-container__input-term',
  // nnSubTitle: 'newsletter--landing__container2__left-container__sub-title',
  // nnSecText: 'newsletter--landing__container2__left-container__sec-text',

  nnCont3: 'newsletter--landing__container3',
  nnTextBox: 'newsletter--landing__container3__text-box',
  nnButtonReceive: 'newsletter--landing__container3__button-receive',
  nnBoxCheckbox2: 'newsletter--landing__container3__box-checkbox2',
  // nnInputTerm: 'newsletter--landing__container2__left-container__input-term',
  nnTextTerm: 'newsletter--landing__container3__text-term',

  // pagina 7
  nnMessageSubscribed:
    'newsletter--landing__container3__form7__message-subscribed',
  nnButtonHome: 'newsletter--landing__container3__form7__button-home',

  // nnForm1: 'newsletter--landing__container3__form1',
  // nnButtonReceive2: 'newsletter--landing__container3__form1__button-receive2',
}

// URL DE ESTILOS EN DEPOR
// src/websites/depor/scss/lite-components/features/statics/_newsletter-landing.scss

const NewsletterLanding: FC<FeatureProps> = (props) => {
  const { customFields: { UrlTerminos, UrlPolitica } = {} } = props

  // const { requestUri, arcSite, contextPath } = useAppContext()
  // const { newsletterBrand } = getProperties(arcSite)
  return (
    <>
      <div className={classes.nnContainer}>
        <div className={classes.nnCont1}>
          <div className={classes.nnBox2}>
            <div className={classes.nnTitle}>Boletìn eletrònico</div>
            <div className={classes.nnLogo}>svg</div>
          </div>
          <div className={classes.nnText}>
            Selecciona los newsletters que te interesan y recibe la informaciòn
            en tu correo electronico
          </div>
        </div>
        <div className={classes.nnCont2}>
          <div className={classes.nnSecCont}>
            <div className={classes.nnBox2}>
              <div className={classes.nnLeftSvg}>left-svg</div>
              <div className={classes.nnInputTerm}>check</div>
              <div className={classes.nnSubTitle}>GENERAL</div>
              <div className={classes.nnSecText}>
                La informaciòn mas relevante del futbol nacional, internacional.
                La liga 1, la Selecciòn Peruana, los peruanos en el mundo,
                LaLiga de España y mucho màs.
              </div>
            </div>
          </div>
          <div className={classes.nnSecCont}>
            <div className={classes.nnBox2}>
              <div className={classes.nnRightSvg}>right-svg</div>
              <div className={classes.nnInputTerm}>check</div>
              <div className={classes.nnSubTitle}>SON DATOS NO OPINIONES</div>
              <div className={classes.nnSecText}>
                Data exclusiva y corroborada del fùtbol peruano e internacional.
                Ten la mejor informacion sobre el equipo de tus amores, como el
                balompiè en el mundo.
              </div>
            </div>
          </div>
        </div>
        <div className={classes.nnCont3}>
          <div className={classes.nnTextBox}>ingresa tu email</div>
          <div className={classes.nnButtonReceive}>Recibir</div>
          <div className={classes.nnInputTerm}>check</div>
          <label htmlFor="terminos" className={classes.nnTextTerm}>
            Acepto los{' '}
            <a href={UrlTerminos} target="_blank" rel="noreferrer">
              <u>Términos y condiciones </u>
            </a>{' '}
            y{' '}
            <a href={UrlPolitica} target="_blank" rel="noreferrer">
              <u>Politicas de privacidad </u>
            </a>
          </label>
        </div>
      </div>
    </>
  )
}
NewsletterLanding.static = true
NewsletterLanding.label = 'Newsletter - Landing'

NewsletterLanding.propTypes = {
  customFields: PropTypes.shape({
    UrlTerminos: PropTypes.string.tag({
      name: 'URL Terminos y Condiciones',
    }),
    UrlPolitica: PropTypes.string.tag({
      name: 'URL Politica de Privacidad',
    }),
  }),
}

export default NewsletterLanding
