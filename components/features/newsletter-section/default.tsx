/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

import { getAssetsPath } from '../../utilities/assets'

interface FeatureProps {
  customFields?: {
    title?: string
    UrlTerminos?: string
    UrlPolitica?: string
  }
}

const classes = {
  nnContainer: 'newsletter-section',
  nnLeftCont: 'newsletter-section__left-container',
  nnRightCont: 'newsletter-section__right-container',
  nnLogoSection: 'newsletter-section__left-container__logo-section',
  nnLogo: 'newsletter-section__left-container__logo',
  nnLogoImg: 'newsletter-section__left-container__logo-img',
  nnSectionName: 'newsletter-section__left-container__section',
  nnText: 'newsletter-section__left-container__texto',
  nnBoxCheckbox: 'newsletter-section__left-container__box-checkbox',
  nnTextBox: 'newsletter-section__left-container__text-box',
  nnInputTerm: 'newsletter-section__left-container__input-term',
  nnTextTerm: 'newsletter-section__left-container__text-term',
  nnButtonBox: 'newsletter-section__left-container__button-box',
  nnLogoMailMob: 'newsletter-section__left-container__logo-mail',
  nnLogoMail: 'newsletter-section__right-container__logo-mail',
  nnMoreNews: 'newsletter-section__right-container__mas-news',
}

const textRegister =
  'Regístrate gratis al newsletter de Tecnologia e infórmate con lo más completo en lorem ipsum'

const NewsletterSection: FC<FeatureProps> = (props) => {
  const { customFields } = props

  const { requestUri, arcSite, contextPath } = useAppContext()

  const paths = requestUri
    .split('?')[0]
    .split('/')
    .filter((el) => el !== '')
  const section = paths[1] || ''
  console.log('============', section)

  return (
    <>
      <div className={classes.nnContainer}>
        <div className={classes.nnLeftCont}>
          <div className={classes.nnLogoMailMob}>
            <img src="http://i.imgur.com/FS7iFtg.png" alt="logo2" />
          </div>
          <div className={classes.nnLogoSection}>
            <div className={classes.nnLogo}>
              <img
                src={`${getAssetsPath(
                  arcSite,
                  contextPath
                )}/resources/dist/${arcSite}/images/logo.png?d=1`}
                alt="Logo"
                className={classes.nnLogoImg}
              />
            </div>
            <div className={classes.nnSectionName}>TECNOLOGIA</div>
          </div>
          <div className={classes.nnText}>{textRegister}</div>
          <div>
            <form>
              <input
                type="text"
                placeholder="introduce tu correo electrónico"
                className={classes.nnTextBox}
              />
              <input
                type="submit"
                value="Regístrate"
                className={classes.nnButtonBox}
              />
              <div className={classes.nnBoxCheckbox}>
                <input
                  type="checkbox"
                  name="terminos"
                  id="terminos"
                  className={classes.nnInputTerm}
                />
                <label htmlFor="terminos" className={classes.nnTextTerm}>
                  Acepto los Términos y condiciones y Politicas de privacidad
                </label>
              </div>
            </form>
          </div>
        </div>
        <div className={classes.nnRightCont}>
          <div className={classes.nnLogoMail}>
            <img src="http://i.imgur.com/FS7iFtg.png" alt="logo2" />
          </div>
          <div className={classes.nnMoreNews}>Más Newsletter</div>
        </div>
      </div>
    </>
  )
}

NewsletterSection.static = true
NewsletterSection.label = 'Newsletter - section'

NewsletterSection.propTypes = {
  customFields: PropTypes.shape({
    title: PropTypes.string.tag({
      name: 'Título',
    }),
    UrlTerminos: PropTypes.string.tag({
      name: 'URL Terminos y Condiciones',
    }),
    UrlPolitica: PropTypes.string.tag({
      name: 'URL Politica de Privacidad',
    }),
    UrlMoreNews: PropTypes.string.tag({
      name: 'URL Más Newsletter333333',
      description: 'Dejar vacio para borrar3333',
    }),
  }),
}

export default NewsletterSection
