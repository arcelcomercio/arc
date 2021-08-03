/* eslint-disable jsx-a11y/label-has-associated-control */
import { useAppContext } from 'fusion:context'
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

import { getAssetsPath } from '../../utilities/assets'
// import {
//   sendNewsLettersUser,
// } from '../signwall/_dependencies/services'

interface FeatureProps {
  customFields?: {
    UrlTerminos?: string
    UrlPolitica?: string
    UrlMoreNews?: string
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
  'Regístrate gratis al newsletter e infórmate con lo más completo en'

const NewsletterSection: FC<FeatureProps> = (props) => {
  const { customFields: { UrlTerminos, UrlPolitica, UrlMoreNews } = {} } = props

  const { requestUri, arcSite, contextPath } = useAppContext()

  // Gestion
  const isTecnologia = /^\/tecnologia\//.test(requestUri)
  const isEmpleo = /^\/economia\/management-empleo\//.test(requestUri)
  const isEmpresas = /^\/economia\/empresas\//.test(requestUri)
  const isTuDinero = /^\/tu-dinero\//.test(requestUri)
  const isInternacional = /^\/mundo\/internacional\//.test(requestUri)

  // const setPreference = () => {
  //   const UUID = window.Identity.userIdentity.uuid
  //   const EMAIL = window.Identity.userProfile.email

  //   window.Identity.options({ apiOrigin: getOriginAPI(arcSite) })
  //   window.Identity.extendSession().then((extSess) => {
  //     sendNewsLettersUser(UUID, EMAIL, arcSite, extSess.accessToken, [
  //       ...selectCategories,
  //     ])
  //       .then(() => {
  //         console.log("ENVIADO")
  //       })
  //       .catch((e) => {
  //         window.console.error(e)
  //       })
  //   })
  // }

  return (
    <>
      {isTecnologia ||
      isEmpleo ||
      isEmpresas ||
      isTuDinero ||
      isInternacional ? (
        <div className={classes.nnContainer}>
          <div className={classes.nnLeftCont}>
            <div className={classes.nnLogoMailMob}>
              <svg
                width="64px"
                height="46px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 96"
                xmlSpace="preserve">
                <style />
                <switch>
                  <g>
                    <path
                      d="M112 0H16C7.2 0 0 7.2 0 16v64c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16zM85.7 42.7l33.9-29c.3.7.4 1.5.5 2.3v64c-.1.5-.2 1.1-.3 1.6L85.7 42.7zM112 8c.5 0 1 .2 1.5.3L64 50.7 14.5 8.3c.5-.1 1-.3 1.5-.3h96zM8.3 81.6c-.1-.5-.3-1.1-.3-1.6V16c0-.8.2-1.6.5-2.3l33.9 29L8.3 81.6zM16 88c-.8 0-1.5-.2-2.3-.5l34.7-39.6 13 11.1c1.5 1.3 3.7 1.3 5.2 0l13-11.1 34.7 39.6c-.7.3-1.5.4-2.3.5H16z"
                      style={{ fill: '#a98e7c' }}
                    />
                  </g>
                </switch>
              </svg>
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
              <div className={classes.nnSectionName}>
                {isTecnologia ? 'TECNOLOGÍA' : ''}
                {isEmpleo ? 'EMPLEO Y MANAGEMENT' : ''}
                {isEmpresas ? 'EMPRESAS' : ''}
                {isTuDinero ? 'TU DINERO' : ''}
                {isInternacional ? 'INTERNACIONAL' : ''}
              </div>
            </div>
            <div className={classes.nnText}>
              {textRegister} {isTecnologia ? 'Tecnología' : ''}
              {isEmpleo ? 'Empleo y Management' : ''}
              {isEmpresas ? 'Empresas' : ''}
              {isTuDinero ? 'Tu Dinero' : ''}
              {isInternacional ? 'Internacional' : ''}
            </div>
            <div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const form = e.target as HTMLFormElement
                  const formData = new FormData(form)
                  const correo = formData.get('email')
                  console.log('==========', correo)
                }}>
                <input
                  type="email"
                  placeholder="introduce tu correo electrónico"
                  name="email"
                  required
                  className={classes.nnTextBox}
                />
                <input
                  type="submit"
                  value="Regístrate"
                  required
                  className={classes.nnButtonBox}
                />
                <div className={classes.nnBoxCheckbox}>
                  <input
                    type="checkbox"
                    name="terminos"
                    id="terminos"
                    required
                    className={classes.nnInputTerm}
                  />
                  <label htmlFor="terminos" className={classes.nnTextTerm}>
                    Acepto los{' '}
                    <a href={UrlTerminos} target="_blank" rel="noreferrer">
                      Términos y condiciones
                    </a>{' '}
                    y{' '}
                    <a href={UrlPolitica} target="_blank" rel="noreferrer">
                      Politicas de privacidad
                    </a>
                  </label>
                </div>
              </form>
            </div>
          </div>
          <div className={classes.nnRightCont}>
            <div className={classes.nnLogoMail}>
              <svg
                width="64px"
                height="46px"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 128 96"
                xmlSpace="preserve">
                <style />
                <switch>
                  <g>
                    <path
                      d="M112 0H16C7.2 0 0 7.2 0 16v64c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16zM85.7 42.7l33.9-29c.3.7.4 1.5.5 2.3v64c-.1.5-.2 1.1-.3 1.6L85.7 42.7zM112 8c.5 0 1 .2 1.5.3L64 50.7 14.5 8.3c.5-.1 1-.3 1.5-.3h96zM8.3 81.6c-.1-.5-.3-1.1-.3-1.6V16c0-.8.2-1.6.5-2.3l33.9 29L8.3 81.6zM16 88c-.8 0-1.5-.2-2.3-.5l34.7-39.6 13 11.1c1.5 1.3 3.7 1.3 5.2 0l13-11.1 34.7 39.6c-.7.3-1.5.4-2.3.5H16z"
                      style={{ fill: '#a98e7c' }}
                    />
                  </g>
                </switch>
              </svg>
            </div>
            <div className={classes.nnMoreNews}>
              {' '}
              <a href={UrlMoreNews} target="_blank" rel="noreferrer">
                Más Newsletter{' '}
                <svg
                  width="20px"
                  height="20px"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  xmlSpace="preserve">
                  <style />
                  <switch>
                    <g>
                      <path d="M0 0h48v48H0V0z" style={{ fill: 'none' }} />
                      <path
                        d="M26 14h-4v8h-8v4h8v8h4v-8h8v-4h-8v-8zM24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4zm0 36c-8.8 0-16-7.2-16-16S15.2 8 24 8s16 7.2 16 16-7.2 16-16 16z"
                        style={{ fill: '#1980a8' }}
                      />
                    </g>
                  </switch>
                </svg>{' '}
              </a>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

NewsletterSection.static = true
NewsletterSection.label = 'Newsletter - section (old)'

NewsletterSection.propTypes = {
  customFields: PropTypes.shape({
    UrlTerminos: PropTypes.string.tag({
      name: 'URL Terminos y Condiciones',
    }),
    UrlPolitica: PropTypes.string.tag({
      name: 'URL Politica de Privacidad',
    }),
    UrlMoreNews: PropTypes.string.tag({
      name: 'URL Más Newsletter',
      description: 'Dejar vacio para borrar',
    }),
  }),
}

export default NewsletterSection
