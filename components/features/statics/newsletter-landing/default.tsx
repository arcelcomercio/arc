/* eslint-disable jsx-a11y/label-has-associated-control */
// import { useAppContext } from 'fusion:context'
// import { NEWSLETTER_API, NEWSLETTER_API_TEMATICO } from 'fusion:environment'
// import getProperties from 'fusion:properties'
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

// import { getAssetsPath } from '../../../utilities/assets'
/**
 * @see estilos `src/websites/depor/scss/lite-components/features/statics/_newsletter-landing.scss`
 */

interface FeatureProps {
  customFields?: {
    UrlTerminos?: string
    UrlPolitica?: string
  }
}

const classes = {
  nnContainer: 'newsletter--landing',
  nnCont1: 'newsletter--landing__container1',
  nnBox1: 'newsletter--landing__container1__box1',
  nnTitle: 'newsletter--landing__container1__box1__title',
  nnLogo: 'newsletter--landing__container1__box1__logo',
  nnText: 'newsletter--landing__container1__text',

  nnCont2: 'newsletter--landing__container2',

  nnSecCont: 'newsletter--landing__container2__sec-container',
  nnBox2: 'newsletter--landing__container2__sec-container__box2',
  nnLeftSvg: 'newsletter--landing__container2__sec-container__box2__left-svg',
  nnRightSvg: 'newsletter--landing__container2__sec-container__box2__right-svg',
  nnBoxCheckbox1:
    'newsletter--landing__container2__sec-container__box2__box-checkbox1',
  nnInputTerm:
    'newsletter--landing__container2__sec-container__box2__box-checkbox1__input-term',
  nnSubTitle1:
    'newsletter--landing__container2__sec-container__box2__box-checkbox1__sub-title1',
  nnSubTitle2:
    'newsletter--landing__container2__sec-container__box2__box-checkbox1__sub-title2',
  nnSecText: 'newsletter--landing__container2__sec-container__box2__sec-text',

  nnCont3: 'newsletter--landing__container3',
  nnTextBox: 'newsletter--landing__container3__text-box',
  nnButtonReceive: 'newsletter--landing__container3__button-receive',
  nnBoxCheckbox2: 'newsletter--landing__container3__box-checkbox2',
  nnInputTerm2: 'newsletter--landing__container3__box-checkbox2__input-term2',
  nnTextTerm: 'newsletter--landing__container3__box-checkbox2__text-term',

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
          <div className={classes.nnBox1}>
            <div className={classes.nnTitle}>Boletìn eletrònico</div>
            <div className={classes.nnLogo}>
              <svg
                width="30px"
                height="20px"
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
          </div>
          <div className={classes.nnText}>
            Selecciona los newsletters que te interesan y recibe la informaciòn
            en tu correo electronico
          </div>
        </div>
        <div className={classes.nnCont2}>
          <div className={classes.nnSecCont}>
            <div className={classes.nnBox2}>
              <div className={classes.nnLeftSvg}>
                <svg
                  width="120px"
                  height="120px"
                  // style={{
                  //   enableBackground: 'new 0 0 512 512',
                  // }}
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink">
                  <defs>
                    <circle cx={255.997} cy={255.108} id="a" r={197.391} />
                  </defs>
                  <use
                    style={{
                      overflow: 'visible',
                      fill: '#eee',
                    }}
                    xlinkHref="#a"
                  />
                  <clipPath id="b">
                    <use
                      style={{
                        overflow: 'visible',
                      }}
                      xlinkHref="#a"
                    />
                  </clipPath>
                  <path
                    style={{
                      clipPath: 'url(#b)',
                      fill: '#424242',
                    }}
                    d="m294.403 26 23.734 74.068L256 145.724l-62.138-45.911L217.597 26zM49.955 149.063l77.5-.189 24.472 73.03-62.417 45.311-62.899-44.98zM485.56 223.493l-63.317 44.69-61.995-45.705 25.045-72.95 77.323.666zM359.993 462.855l-62.436-45.913 23.727-73.275 77.127.662 23.847 73.557zM89.736 415.144l25.165-73.301 77.017.756 22.409 73.802-63.075 44.732z"
                  />
                  <path
                    style={{
                      fill: '#424242',
                    }}
                    d="m217.089 316-24.048-74.515L256 195.491l62.958 46.119L294.91 316z"
                  />
                  <g>
                    <path
                      d="M256 70c49.683 0 96.391 19.347 131.522 54.478S442 206.317 442 256s-19.347 96.391-54.478 131.522S305.683 442 256 442s-96.391-19.347-131.522-54.478S70 305.683 70 256s19.347-96.391 54.478-131.522S206.317 70 256 70m0-14C145.543 56 56 145.543 56 256s89.543 200 200 200 200-89.543 200-200S366.457 56 256 56z"
                      style={{
                        fill: '#424242',
                      }}
                    />
                  </g>
                  <path
                    style={{
                      fill: 'none',
                      stroke: '#424242',
                      strokeWidth: 5,
                      strokeMiterlimit: 10,
                    }}
                    d="m291.91 312.407 31.374 35.26M187.91 347.667l31.374-35.26M312.208 244.721l56.578-26.435M199.786 244.721l-56.578-26.435M256.5 204v-69M203.236 417.5l-85.374-62.988-32.61-100.843 32.61-98.752L203.236 94.5h105.528l85.374 60.177 32.61 99.437-32.61 100.861-85.374 62.525z"
                  />
                </svg>
              </div>
              <div className={classes.nnBoxCheckbox1}>
                <input
                  type="checkbox"
                  name="terminos"
                  id="terminos"
                  required
                  className={classes.nnInputTerm}
                />
                <div className={classes.nnSubTitle1}>GENERAL</div>
              </div>
              <div className={classes.nnSecText}>
                La informaciòn mas relevante del futbol nacional, internacional.
                La liga 1, la Selecciòn Peruana, los peruanos en el mundo,
                LaLiga de España y mucho màs.
              </div>
            </div>
          </div>
          <div className={classes.nnSecCont}>
            <div className={classes.nnBox2}>
              <div className={classes.nnRightSvg}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={120}
                  height={120}
                  // style={{
                  //   enableBackground: 'new 0 0 110 110',
                  // }}
                  xmlSpace="preserve"
                  {...props}>
                  <circle
                    style={{
                      fill: '#25b7d3',
                    }}
                    cx={55}
                    cy={55}
                    r={55}
                  />
                  <path
                    style={{
                      fill: '#f0f1f1',
                    }}
                    d="M27 83V25a2 2 0 1 0-4 0v62h62a2 2 0 1 0 0-4H27z"
                  />
                  <path
                    style={{
                      fill: '#0484ab',
                    }}
                    d="M33 67h12v16H33zM51 56h12v27H51zM69 34h12v49H69z"
                  />
                  <path
                    style={{
                      fill: '#9ce5f4',
                    }}
                    d="M70.271 44.665c.403-9.111-6.655-16.824-15.766-17.227-9.111-.403-16.824 6.655-17.227 15.766a16.441 16.441 0 0 0 1.632 7.927L24.613 65.465c1.15 3.433 3.442 5.72 6.878 6.861l14.051-14.087a16.425 16.425 0 0 0 7.502 2.193c9.111.402 16.824-6.656 17.227-15.767z"
                  />
                  <path
                    style={{
                      fill: '#c9f2f8',
                    }}
                    d="M54.505 27.438c-9.111-.404-16.824 6.655-17.227 15.766a16.443 16.443 0 0 0 1.632 7.927L24.613 65.465c.64 1.913 1.649 3.456 2.999 4.657L65.45 32.284c-2.817-2.825-6.646-4.656-10.945-4.846z"
                  />
                  <circle
                    style={{
                      fill: '#40c9e7',
                    }}
                    cx={53.775}
                    cy={43.934}
                    r={11.795}
                  />
                  <path
                    style={{
                      fill: '#6fdaf1',
                    }}
                    d="M54.296 32.151c-6.508-.288-12.017 4.754-12.305 11.261-.153 3.448 1.2 6.606 3.465 8.865l16.661-16.662a11.737 11.737 0 0 0-7.821-3.464z"
                  />
                  <path
                    style={{
                      fill: '#84462d',
                    }}
                    d="M38.91 51.131 24.613 65.465c1.15 3.433 3.442 5.72 6.878 6.861l14.051-14.087a16.588 16.588 0 0 1-6.632-7.108z"
                  />
                  <path
                    style={{
                      fill: '#9c6144',
                    }}
                    d="M38.91 51.131 24.613 65.465c.64 1.913 1.649 3.456 2.999 4.657L42.124 55.61a16.502 16.502 0 0 1-3.214-4.479z"
                  />
                  <path
                    style={{
                      fill: '#f3b607',
                    }}
                    d="m42.506 61.281 3.035-3.043a16.572 16.572 0 0 1-6.631-7.107l-3.282 3.29 6.878 6.86z"
                  />
                  <path
                    style={{
                      fill: '#fbe158',
                    }}
                    d="m38.91 51.131-3.282 3.29 3.847 3.838 2.648-2.648a16.54 16.54 0 0 1-3.213-4.48z"
                  />
                </svg>
              </div>
              <div className={classes.nnBoxCheckbox1}>
                <input
                  type="checkbox"
                  name="terminos"
                  id="terminos"
                  required
                  className={classes.nnInputTerm}
                />
                <div className={classes.nnSubTitle2}>
                  SON DATOS NO OPINIONES
                </div>
              </div>
              <div className={classes.nnSecText}>
                Data exclusiva y corroborada del fùtbol peruano e internacional.
                Ten la mejor informacion sobre el equipo de tus amores, como el
                balompiè en el mundo.
              </div>
            </div>
          </div>
        </div>
        <div className={classes.nnCont3}>
          <input
            type="email"
            placeholder="Ingresa tu Email"
            name="email"
            required
            className={classes.nnTextBox}
          />
          <input
            type="submit"
            value="Recibir"
            required
            className={classes.nnButtonReceive}
          />
          <div className={classes.nnBoxCheckbox2}>
            <input
              type="checkbox"
              name="terminos"
              id="terminos"
              required
              className={classes.nnInputTerm2}
            />
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
