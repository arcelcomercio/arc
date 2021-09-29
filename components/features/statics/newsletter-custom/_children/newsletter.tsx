/* eslint-disable no-nested-ternary */
import { NEWSLETTER_API } from 'fusion:environment'
import getProperties from 'fusion:properties'
import * as React from 'react'
import { ArcSite } from 'types/fusion'

import {
  SITE_DIARIOCORREO,
  SITE_GESTION,
  SITE_TROME,
} from '../../../../utilities/constants/sitenames'
import { newsletterScript } from '../_dependencies/scripts'

const classes = {
  newsletter: `newsletter__custom`,
  boxSubscription: `newsletter__box-subscription pr-40 pl-40 primary-font p-15`,
  errorMessage: 'newsletter__error-message block pt-5 text-xs',
  errorMessageMedium: 'text-lg mb-20',
  bannerImage: 'newsletter__banner-image w-full lg:w-inherit',
  image: 'newsletter__image lg:w-full',

  title:
    'newsletter__subtitle text-center position-relative line-h-xs mt-15 mb-10',
  subtitle: 'text-center text-black font-bold  title-lg line-h-xs',
  titleConfirmation: 'newsletter__title--confirmation',
  description: 'newsletter__description text-center line-h-xs',
  row: 'newsletter__row mb-20 flex',
  email:
    'newsletter__email w-full pr-15 pl-15 border-1 border-solid border-gray',
  textCenter: 'text-center',
  button: 'newsletter__button bg-black font-bold w-full text-white border-r-10',
  policies: 'newsletter__policies cursor-pointer block mb-15',
  pageLink: 'newsletter__page-link text-gray-300',
  inputCheckbox: 'newsletter__input-checkbox mr-10',
  divConfirmation: 'newsletter__divConfirmation',
  divFormInputs: 'newsletter__formInputs',
  divFormCustom: 'class-news-custom-form',
  terms: 'newsletter__tos',
  wrapperLogo: 'newsletter__wrapper-logo',
  correohoy: 'block mx-auto newsletter__logo',
  cafe: 'block mx-auto newsletter__cafe',
  icon: 'block mx-auto newsletter__icon',
  checkmark: 'block mx-auto mb-30 mt-30 newsletter__checkmark',
  nnMoreNews: 'newsletter__mas-news',
}

interface CustomNewsletterChildProps {
  arcSite: ArcSite
  description: string
  colorButton: string
  urlTerms: string
  urlPrivacyPolicies: string
  urlMoreNews: string
  activateJS: string
}

const CustomNewsletterChild: React.FC<CustomNewsletterChildProps> = ({
  arcSite,
  description,
  colorButton,
  urlTerms,
  urlPrivacyPolicies,
  urlMoreNews,
  activateJS,
}) => {
  const { newsletterBrand } = getProperties(arcSite)

  return (
    <>
      {arcSite === SITE_DIARIOCORREO ? (
        <div className={classes.newsletter}>
          <div
            className={`${classes.boxSubscription} ${classes.divFormInputs}`}>
            <h4
              className={`${classes.errorMessage} ${classes.errorMessageMedium}`}>
              {' '}
            </h4>
            <img
              className={classes.icon}
              src="https://cdna.diariocorreo.pe/resources/dist/diariocorreo/images/email_correo.svg?d=1"
              alt="icono newsletter"
            />

            <h3 itemProp="name" className={`${classes.title}`}>
              Recibe nuestro boletín
            </h3>
            <div className={classes.wrapperLogo}>
              <img
                className={classes.correohoy}
                src="https://cdna.diariocorreo.pe/resources/dist/diariocorreo/images/Correo_Hoy_Text.svg?d=1"
                alt="correo hoy"
              />
            </div>
            <form
              action="submit"
              method="post"
              className={`${classes.divFormCustom}`}>
              <div className={classes.row}>
                <input
                  className={`${classes.email}`}
                  type="text"
                  name="email"
                  placeholder="Ingresa tu Email"
                  required
                />
              </div>
              <div className={`${classes.row} ${classes.textCenter}`}>
                <button className={`${classes.button}`} type="submit">
                  Recibir
                </button>
              </div>
              <div className={`${classes.terms} ${classes.row}`}>
                <input
                  type="checkbox"
                  name="terms"
                  required
                  value="1"
                  className={classes.inputCheckbox}
                />
                <label className={classes.policies} htmlFor="terms">
                  Acepto los
                  <a
                    itemProp="url"
                    className={`${classes.pageLink}`}
                    href={urlTerms}
                    target="_blank"
                    rel="noopener noreferrer">
                    {' '}
                    Términos y condiciones{' '}
                  </a>
                  y
                  <a
                    itemProp="url"
                    className={`${classes.pageLink}`}
                    href={urlPrivacyPolicies}
                    target="_blank"
                    rel="noopener noreferrer">
                    {' '}
                    Políticas de privacidad
                  </a>
                </label>
                <p className={classes.errorMessage} id="CheckMessageNC" />
              </div>
            </form>
          </div>
          <div
            className={`${classes.boxSubscription} ${classes.divConfirmation}`}
            style={{ display: 'none' }}>
            <h4
              className={`${classes.errorMessage} ${classes.errorMessageMedium}`}>
              {' '}
            </h4>
            <img
              className={classes.icon}
              src="https://cdna.diariocorreo.pe/resources/dist/diariocorreo/images/email_correo.svg?d=1"
              alt="icono newsletter"
            />
            <h3
              itemProp="name"
              className={`${classes.title} ${classes.titleConfirmation}`}>
              Estás suscrito <br />a nuestro boletín
            </h3>
            <div className={classes.wrapperLogo}>
              <img
                className={classes.correohoy}
                src="https://cdna.diariocorreo.pe/resources/dist/diariocorreo/images/Correo_Hoy_Text.svg?d=1"
                alt="correo hoy"
              />
            </div>
            {/* <p className={classes.subtitle}>Boletín</p> */}
            <p className={classes.textCenter}>
              <img
                className={classes.checkmark}
                src="https://cdna.diariocorreo.pe/resources/dist/diariocorreo/images/check_correo.svg?d=1"
                alt="icono check"
              />
            </p>
            <p className={`${classes.title}`}>¡Recepción exitosa!</p>
          </div>
        </div>
      ) : arcSite === SITE_TROME ? (
        <div className={classes.newsletter}>
          <div
            className={`${classes.boxSubscription} ${classes.divFormInputs}`}>
            <h4
              className={`${classes.errorMessage} ${classes.errorMessageMedium}`}>
              {' '}
            </h4>
            <img
              className={classes.icon}
              src="https://cdna.trome.pe/resources/dist/trome/images/email.svg?d=1"
              alt="icono newsletter"
            />

            <h3 itemProp="name" className={`${classes.title}`}>
              Recibe nuestro
            </h3>
            <img
              className={classes.cafe}
              src="https://cdna.trome.pe/resources/dist/trome/images/cafe_final.svg?d=1"
              alt="cafe de noticias"
            />
            <form
              action="submit"
              method="post"
              className={`${classes.divFormCustom}`}>
              <div className={classes.row}>
                <input
                  className={`${classes.email}`}
                  type="text"
                  name="email"
                  placeholder="Ingresa tu Email"
                  required
                />
              </div>
              <div className={`${classes.row} ${classes.textCenter}`}>
                <button
                  className={`${classes.button}`}
                  style={{ backgroundColor: colorButton }}
                  type="submit">
                  Recibir
                </button>
              </div>
              <div className={`${classes.terms} ${classes.row}`}>
                <input
                  type="checkbox"
                  name="terms"
                  required
                  value="1"
                  className={classes.inputCheckbox}
                />
                <label className={classes.policies} htmlFor="terms">
                  Acepto los
                  <a
                    itemProp="url"
                    className={`${classes.pageLink}`}
                    href={urlTerms}
                    target="_blank"
                    rel="noopener noreferrer">
                    {' '}
                    Términos y condiciones{' '}
                  </a>
                  y
                  <a
                    itemProp="url"
                    className={`${classes.pageLink}`}
                    href={urlPrivacyPolicies}
                    target="_blank"
                    rel="noopener noreferrer">
                    {' '}
                    Políticas de privacidad
                  </a>
                </label>
                <p className={classes.errorMessage} id="CheckMessageNC" />
              </div>
            </form>
          </div>
          <div
            className={`${classes.boxSubscription} ${classes.divConfirmation}`}
            style={{ display: 'none' }}>
            <p className={classes.textCenter}>
              <svg width="45" viewBox="0 0 48 24.33">
                <path
                  id="Trazado_79132"
                  data-name="Trazado 79132"
                  d="M47.16,24.31h.1l.05,0,0,0,0,0,.05,0,0,0,0,0,0,0,0,0,.06-.06h0l0-.07,0,0,0,0,0-.05,0,0a.17.17,0,0,1,0-.05l0,0,0-.05a.17.17,0,0,1,0-.05.11.11,0,0,1,0-.05s0,0,0,0,0,0,0-.06v-.05s0-.06,0-.1V1a1,1,0,0,0-1-1h-33l0,0h0l-.05,0,0,0-.05,0,0,0,0,0,0,0-.05,0,0,0,0,0s0,0,0,0l0,0h0l0,0,0,0,0,0,0,0,0,0a.08.08,0,0,0,0,0l0,.05a.08.08,0,0,0,0,0,.06.06,0,0,0,0,0s0,0,0,.05a.07.07,0,0,1,0,0v6.6a1,1,0,0,0,2.08,0h0V3.35l9.25,8.2-.14.11-9.11,9.12V13.94a1,1,0,0,0-2.08,0v1.27H7.76a1,1,0,0,0,0,2.08h5.38v6a1,1,0,0,0,1,1H47.11Zm-1.24-3.53L36.8,11.67l0,0,6.86-5.82a1,1,0,1,0-1.35-1.58h0L30.58,14.18,16.91,2.08h29v18.7ZM25.8,13.13a1.08,1.08,0,0,0,.18-.24l3.9,3.45a1,1,0,0,0,1.36,0l4-3.37a.44.44,0,0,0,.12.15l9.12,9.12H16.68Z"
                />
                <path
                  id="Trazado_79133"
                  data-name="Trazado 79133"
                  d="M1,11.86H18.62a1,1,0,0,0,0-2.09H1a1,1,0,0,0,0,2.09Z"
                />
                <path
                  id="Trazado_79134"
                  data-name="Trazado 79134"
                  d="M2.86,6.12h7.9a1,1,0,0,0,0-2.08H2.86a1,1,0,0,0,0,2.08Z"
                />
                <path
                  id="Trazado_79135"
                  data-name="Trazado 79135"
                  d="M8.68,19.61H1a1,1,0,0,0,0,2.08H8.68a1,1,0,1,0,0-2.08Z"
                />
              </svg>
            </p>
            <h3
              itemProp="name"
              className={`${classes.title} ${classes.titleConfirmation}`}>
              Estás suscrito a nuestro
            </h3>
            <img
              className={classes.cafe}
              src="https://cdna.trome.pe/resources/dist/trome/images/cafe_final.svg?d=1"
              alt="cafe de noticias"
            />
            {/* <p className={classes.subtitle}>Boletín</p> */}
            <p className={classes.textCenter}>
              <img
                className={classes.checkmark}
                src="https://cdna.trome.pe/resources/dist/trome/images/checkgrad.svg?d=1"
                alt="icono check"
              />
            </p>
            <p className={`${classes.title}`}>¡Recepción exitosa!</p>
          </div>
        </div>
      ) : arcSite === SITE_GESTION ? (
        <div className={classes.newsletter}>
          <div
            className={`${classes.boxSubscription} ${classes.divFormInputs}`}>
            <h4
              className={`${classes.errorMessage} ${classes.errorMessageMedium}`}>
              {' '}
            </h4>
            <p className={`${classes.textCenter}`}>
              <svg width="45" viewBox="0 0 48 24.33">
                <path
                  id="Trazado_79132"
                  data-name="Trazado 79132"
                  d="M47.16,24.31h.1l.05,0,0,0,0,0,.05,0,0,0,0,0,0,0,0,0,.06-.06h0l0-.07,0,0,0,0,0-.05,0,0a.17.17,0,0,1,0-.05l0,0,0-.05a.17.17,0,0,1,0-.05.11.11,0,0,1,0-.05s0,0,0,0,0,0,0-.06v-.05s0-.06,0-.1V1a1,1,0,0,0-1-1h-33l0,0h0l-.05,0,0,0-.05,0,0,0,0,0,0,0-.05,0,0,0,0,0s0,0,0,0l0,0h0l0,0,0,0,0,0,0,0,0,0a.08.08,0,0,0,0,0l0,.05a.08.08,0,0,0,0,0,.06.06,0,0,0,0,0s0,0,0,.05a.07.07,0,0,1,0,0v6.6a1,1,0,0,0,2.08,0h0V3.35l9.25,8.2-.14.11-9.11,9.12V13.94a1,1,0,0,0-2.08,0v1.27H7.76a1,1,0,0,0,0,2.08h5.38v6a1,1,0,0,0,1,1H47.11Zm-1.24-3.53L36.8,11.67l0,0,6.86-5.82a1,1,0,1,0-1.35-1.58h0L30.58,14.18,16.91,2.08h29v18.7ZM25.8,13.13a1.08,1.08,0,0,0,.18-.24l3.9,3.45a1,1,0,0,0,1.36,0l4-3.37a.44.44,0,0,0,.12.15l9.12,9.12H16.68Z"
                />
                <path
                  id="Trazado_79133"
                  data-name="Trazado 79133"
                  d="M1,11.86H18.62a1,1,0,0,0,0-2.09H1a1,1,0,0,0,0,2.09Z"
                />
                <path
                  id="Trazado_79134"
                  data-name="Trazado 79134"
                  d="M2.86,6.12h7.9a1,1,0,0,0,0-2.08H2.86a1,1,0,0,0,0,2.08Z"
                />
                <path
                  id="Trazado_79135"
                  data-name="Trazado 79135"
                  d="M8.68,19.61H1a1,1,0,0,0,0,2.08H8.68a1,1,0,1,0,0-2.08Z"
                />
              </svg>
            </p>
            <h3 itemProp="name" className={`${classes.title}`}>
              Regístrate gratis a nuestro
            </h3>
            <p className={`${classes.subtitle}`}>Newsletter</p>
            <p itemProp="description" className={`${classes.description}`}>
              {description}
            </p>
            <form
              action="submit"
              method="post"
              className={`${classes.divFormCustom}`}>
              <div className={classes.row}>
                <input
                  className={classes.email}
                  type="text"
                  name="email"
                  placeholder="Introduce tu correo electrónico"
                  required
                />
              </div>
              <div className={`${classes.row} ${classes.textCenter}`}>
                <button
                  className={classes.button}
                  style={{ backgroundColor: colorButton }}
                  type="submit">
                  Regístrate
                </button>
              </div>
              <div className={classes.row}>
                <label className={classes.policies} htmlFor="terms">
                  <input
                    type="checkbox"
                    name="terms"
                    required
                    value="1"
                    className={classes.inputCheckbox}
                  />
                </label>
                <span className="newsletter__policies-span">
                  Acepto los
                  <a
                    itemProp="url"
                    className={classes.pageLink}
                    href={urlTerms}
                    target="_blank"
                    rel="noopener noreferrer">
                    {' '}
                    Términos y condiciones{' '}
                  </a>
                  y
                  <a
                    itemProp="url"
                    className={classes.pageLink}
                    href={urlPrivacyPolicies}
                    target="_blank"
                    rel="noopener noreferrer">
                    {' '}
                    Políticas de privacidad
                  </a>
                </span>
                <p className={classes.errorMessage} id="CheckMessageNC" />
              </div>
              <div className={classes.nnMoreNews}>
                {' '}
                <a href={urlMoreNews} target="_blank" rel="noreferrer">
                  Más newsletter{' '}
                  <svg
                    width="20px"
                    height="20px"
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
            </form>
          </div>
          <div
            className={`${classes.boxSubscription} ${classes.divConfirmation}`}
            style={{ display: 'none' }}>
            <p className={classes.textCenter}>
              <svg width="45" viewBox="0 0 48 24.33">
                <path
                  id="Trazado_79132"
                  data-name="Trazado 79132"
                  d="M47.16,24.31h.1l.05,0,0,0,0,0,.05,0,0,0,0,0,0,0,0,0,.06-.06h0l0-.07,0,0,0,0,0-.05,0,0a.17.17,0,0,1,0-.05l0,0,0-.05a.17.17,0,0,1,0-.05.11.11,0,0,1,0-.05s0,0,0,0,0,0,0-.06v-.05s0-.06,0-.1V1a1,1,0,0,0-1-1h-33l0,0h0l-.05,0,0,0-.05,0,0,0,0,0,0,0-.05,0,0,0,0,0s0,0,0,0l0,0h0l0,0,0,0,0,0,0,0,0,0a.08.08,0,0,0,0,0l0,.05a.08.08,0,0,0,0,0,.06.06,0,0,0,0,0s0,0,0,.05a.07.07,0,0,1,0,0v6.6a1,1,0,0,0,2.08,0h0V3.35l9.25,8.2-.14.11-9.11,9.12V13.94a1,1,0,0,0-2.08,0v1.27H7.76a1,1,0,0,0,0,2.08h5.38v6a1,1,0,0,0,1,1H47.11Zm-1.24-3.53L36.8,11.67l0,0,6.86-5.82a1,1,0,1,0-1.35-1.58h0L30.58,14.18,16.91,2.08h29v18.7ZM25.8,13.13a1.08,1.08,0,0,0,.18-.24l3.9,3.45a1,1,0,0,0,1.36,0l4-3.37a.44.44,0,0,0,.12.15l9.12,9.12H16.68Z"
                />
                <path
                  id="Trazado_79133"
                  data-name="Trazado 79133"
                  d="M1,11.86H18.62a1,1,0,0,0,0-2.09H1a1,1,0,0,0,0,2.09Z"
                />
                <path
                  id="Trazado_79134"
                  data-name="Trazado 79134"
                  d="M2.86,6.12h7.9a1,1,0,0,0,0-2.08H2.86a1,1,0,0,0,0,2.08Z"
                />
                <path
                  id="Trazado_79135"
                  data-name="Trazado 79135"
                  d="M8.68,19.61H1a1,1,0,0,0,0,2.08H8.68a1,1,0,1,0,0-2.08Z"
                />
              </svg>
            </p>
            <h3
              itemProp="name"
              className={`${classes.title} ${classes.titleConfirmation}`}>
              Estás suscrito a nuestro
            </h3>
            <p className={classes.subtitle}>Boletín</p>
            <p className={classes.textCenter}>
              <svg width="60" viewBox="0 0 64 64">
                <path
                  fill="#e06438"
                  d="M32 0A32 32 0 1 0 64 32 32 32 0 0 0 32 0ZM48.2 25.2 30.9 42.6a2.7 2.7 0 0 1-3.8 0h0l-8.7-8.7a2.7 2.7 0 0 1 3.8-3.8L29 36.9 44.5 21.5a2.7 2.7 0 0 1 3.8 3.8Z"
                />
              </svg>
            </p>
            <p className={`${classes.title}`}>¡Recepción exitosa!</p>
          </div>
        </div>
      ) : (
        <div className={classes.newsletter}>
          <div
            className={`${classes.boxSubscription} ${classes.divFormInputs}`}>
            <h4
              className={`${classes.errorMessage} ${classes.errorMessageMedium}`}>
              {' '}
            </h4>
            <p className={`${classes.textCenter}`}>
              <svg width="45" viewBox="0 0 48 24.33">
                <path
                  id="Trazado_79132"
                  data-name="Trazado 79132"
                  d="M47.16,24.31h.1l.05,0,0,0,0,0,.05,0,0,0,0,0,0,0,0,0,.06-.06h0l0-.07,0,0,0,0,0-.05,0,0a.17.17,0,0,1,0-.05l0,0,0-.05a.17.17,0,0,1,0-.05.11.11,0,0,1,0-.05s0,0,0,0,0,0,0-.06v-.05s0-.06,0-.1V1a1,1,0,0,0-1-1h-33l0,0h0l-.05,0,0,0-.05,0,0,0,0,0,0,0-.05,0,0,0,0,0s0,0,0,0l0,0h0l0,0,0,0,0,0,0,0,0,0a.08.08,0,0,0,0,0l0,.05a.08.08,0,0,0,0,0,.06.06,0,0,0,0,0s0,0,0,.05a.07.07,0,0,1,0,0v6.6a1,1,0,0,0,2.08,0h0V3.35l9.25,8.2-.14.11-9.11,9.12V13.94a1,1,0,0,0-2.08,0v1.27H7.76a1,1,0,0,0,0,2.08h5.38v6a1,1,0,0,0,1,1H47.11Zm-1.24-3.53L36.8,11.67l0,0,6.86-5.82a1,1,0,1,0-1.35-1.58h0L30.58,14.18,16.91,2.08h29v18.7ZM25.8,13.13a1.08,1.08,0,0,0,.18-.24l3.9,3.45a1,1,0,0,0,1.36,0l4-3.37a.44.44,0,0,0,.12.15l9.12,9.12H16.68Z"
                />
                <path
                  id="Trazado_79133"
                  data-name="Trazado 79133"
                  d="M1,11.86H18.62a1,1,0,0,0,0-2.09H1a1,1,0,0,0,0,2.09Z"
                />
                <path
                  id="Trazado_79134"
                  data-name="Trazado 79134"
                  d="M2.86,6.12h7.9a1,1,0,0,0,0-2.08H2.86a1,1,0,0,0,0,2.08Z"
                />
                <path
                  id="Trazado_79135"
                  data-name="Trazado 79135"
                  d="M8.68,19.61H1a1,1,0,0,0,0,2.08H8.68a1,1,0,1,0,0-2.08Z"
                />
              </svg>
            </p>
            <h3 itemProp="name" className={`${classes.title}`}>
              Recibe nuestro
            </h3>
            <p className={`${classes.subtitle}`}>Boletín</p>
            <p itemProp="description" className={`${classes.description}`}>
              {description}
            </p>
            <form
              action="submit"
              method="post"
              className={`${classes.divFormCustom}`}>
              <div className={classes.row}>
                <input
                  className={classes.email}
                  type="text"
                  name="email"
                  placeholder="Ingresa tu Email"
                  required
                />
              </div>
              <div className={`${classes.row} ${classes.textCenter}`}>
                <button
                  className={classes.button}
                  style={{ backgroundColor: colorButton }}
                  type="submit">
                  Recibir
                </button>
              </div>
              <div className={classes.row}>
                <label className={classes.policies} htmlFor="terms">
                  <input
                    type="checkbox"
                    name="terms"
                    required
                    value="1"
                    className={classes.inputCheckbox}
                  />
                  Acepto los
                  <a
                    itemProp="url"
                    className={classes.pageLink}
                    href={urlTerms}
                    target="_blank"
                    rel="noopener noreferrer">
                    {' '}
                    Términos y condiciones{' '}
                  </a>
                  y
                  <a
                    itemProp="url"
                    className={classes.pageLink}
                    href={urlPrivacyPolicies}
                    target="_blank"
                    rel="noopener noreferrer">
                    {' '}
                    Políticas de privacidad
                  </a>
                </label>
                <p className={classes.errorMessage} id="CheckMessageNC" />
              </div>
            </form>
          </div>
          <div
            className={`${classes.boxSubscription} ${classes.divConfirmation}`}
            style={{ display: 'none' }}>
            <p className={classes.textCenter}>
              <svg width="45" viewBox="0 0 48 24.33">
                <path
                  id="Trazado_79132"
                  data-name="Trazado 79132"
                  d="M47.16,24.31h.1l.05,0,0,0,0,0,.05,0,0,0,0,0,0,0,0,0,.06-.06h0l0-.07,0,0,0,0,0-.05,0,0a.17.17,0,0,1,0-.05l0,0,0-.05a.17.17,0,0,1,0-.05.11.11,0,0,1,0-.05s0,0,0,0,0,0,0-.06v-.05s0-.06,0-.1V1a1,1,0,0,0-1-1h-33l0,0h0l-.05,0,0,0-.05,0,0,0,0,0,0,0-.05,0,0,0,0,0s0,0,0,0l0,0h0l0,0,0,0,0,0,0,0,0,0a.08.08,0,0,0,0,0l0,.05a.08.08,0,0,0,0,0,.06.06,0,0,0,0,0s0,0,0,.05a.07.07,0,0,1,0,0v6.6a1,1,0,0,0,2.08,0h0V3.35l9.25,8.2-.14.11-9.11,9.12V13.94a1,1,0,0,0-2.08,0v1.27H7.76a1,1,0,0,0,0,2.08h5.38v6a1,1,0,0,0,1,1H47.11Zm-1.24-3.53L36.8,11.67l0,0,6.86-5.82a1,1,0,1,0-1.35-1.58h0L30.58,14.18,16.91,2.08h29v18.7ZM25.8,13.13a1.08,1.08,0,0,0,.18-.24l3.9,3.45a1,1,0,0,0,1.36,0l4-3.37a.44.44,0,0,0,.12.15l9.12,9.12H16.68Z"
                />
                <path
                  id="Trazado_79133"
                  data-name="Trazado 79133"
                  d="M1,11.86H18.62a1,1,0,0,0,0-2.09H1a1,1,0,0,0,0,2.09Z"
                />
                <path
                  id="Trazado_79134"
                  data-name="Trazado 79134"
                  d="M2.86,6.12h7.9a1,1,0,0,0,0-2.08H2.86a1,1,0,0,0,0,2.08Z"
                />
                <path
                  id="Trazado_79135"
                  data-name="Trazado 79135"
                  d="M8.68,19.61H1a1,1,0,0,0,0,2.08H8.68a1,1,0,1,0,0-2.08Z"
                />
              </svg>
            </p>
            <h3
              itemProp="name"
              className={`${classes.title} ${classes.titleConfirmation}`}>
              Estás suscrito a nuestro
            </h3>
            <p className={classes.subtitle}>Boletín</p>
            <p className={classes.textCenter}>
              <svg width="60" viewBox="0 0 64 64">
                <path
                  fill="#e06438"
                  d="M32 0A32 32 0 1 0 64 32 32 32 0 0 0 32 0ZM48.2 25.2 30.9 42.6a2.7 2.7 0 0 1-3.8 0h0l-8.7-8.7a2.7 2.7 0 0 1 3.8-3.8L29 36.9 44.5 21.5a2.7 2.7 0 0 1 3.8 3.8Z"
                />
              </svg>
            </p>
            <p className={`${classes.title}`}>¡Recepción exitosa!</p>
          </div>
        </div>
      )}

      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: newsletterScript(NEWSLETTER_API, newsletterBrand, activateJS),
        }}
      />
    </>
  )
}

export default CustomNewsletterChild
