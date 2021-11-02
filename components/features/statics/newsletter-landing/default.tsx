/* eslint-disable jsx-a11y/label-has-associated-control */
import { useAppContext } from 'fusion:context'
import { NEWSLETTER_API_LANDING } from 'fusion:environment'
import getProperties from 'fusion:properties'
import PropTypes from 'prop-types'
import * as React from 'react'
import { FC } from 'types/features'

// import { getAssetsPath } from '../../../utilities/assets'
/**
 * @see estilos `src/websites/depor/scss/lite-components/features/statics/_newsletter-landing.scss`
 *@import "../lite-components/features/statics/newsletter-landing"
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
  nnMarginL10: 'newsletter--landing__container2__sec-container__marginl10',
  nnBox2: 'newsletter--landing__container2__sec-container__box2',
  nnLeftSvg: 'newsletter--landing__container2__sec-container__box2__left-svg',
  nnLeftImg: 'newsletter--landing__container2__sec-container__box2__left-img',
  nnRightSvg: 'newsletter--landing__container2__sec-container__box2__right-svg',
  nnRightImg: 'newsletter--landing__container2__sec-container__box2__right-img',
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

  nnSuccess: 'newsletter--landing__success',
  nnSuccessButton: 'newsletter--landing__success__button',
  nnSuccessLink: 'newsletter--landing__success__link',

  // pagina 7
  nnMessageSubscribed:
    'newsletter--landing__container3__form7__message-subscribed',
  nnButtonHome: 'newsletter--landing__container3__form7__button-home',

  // nnForm1: 'newsletter--landing__container3__form1',
  // nnButtonReceive2: 'newsletter--landing__container3__form1__button-receive2',
}

// PASE 2 para sandbox martes 02 nov (fix botones para iphone)
// URL DE ESTILOS EN DEPOR
// src/websites/depor/scss/lite-components/features/statics/_newsletter-landing.scss

const NewsletterLanding: FC<FeatureProps> = (props) => {
  const { customFields: { UrlTerminos, UrlPolitica } = {} } = props

  const { arcSite } = useAppContext()
  const { newsletterBrand } = getProperties(arcSite)

  /*
  window.addEventListener('DOMContentLoaded', () => {requestIdle(() => {
    const form = document.getElementById('formNL')
    const formInputs = form.elements

    const divSuccessDesktop = document.getElementById('msg_success')
    const formLast = document.getElementById('formNLlast')

    const URL_API = '${NEWSLETTER_API_LANDING}'
    const brandNL = '${newsletterBrand}'

    const UUID_USER = JSON.parse(window.localStorage.getItem('ArcId.USER_INFO') || "{}").uuid
    const TOKEN_USER = JSON.parse(window.localStorage.getItem('ArcId.USER_INFO') || "{}").accessToken

    const chkb1 = document.getElementById("checkb1")
    const chkb2 = document.getElementById("checkb2")

    let topicNL = ''
    let checkb = []
    
    const mailLS = localStorage.getItem("Correo-NL-"+brandNL)
    const topicLS = JSON.parse(localStorage.getItem("Topic-NL-"+brandNL))

    if(mailLS){
      formLast.style.display = "flex"
      topicLS.forEach(e=>{
          if(chkb1.value == e){
            chkb1.checked = true
          }
          if(chkb2.value == e){
            chkb2.checked = true
          }
      });

    }else{
      form.style.display = "flex"
    }
    
    formLast.addEventListener("submit", e => {
      e.preventDefault()
      if(chkb1.checked == false && chkb2.checked == false){
        alert("Seleccione un Boletín")
        return false
      }

      if(chkb1.checked && chkb2.checked == false){
        topicNL = chkb1.value
        checkb = [chkb1.value]
      }

      if(chkb2.checked && chkb1.checked == false){
        topicNL = chkb2.value
        checkb = [chkb2.value]
      }
      
      if(chkb1.checked && chkb2.checked){
        checkb = [chkb1.value, chkb2.value]
      }

      localStorage.setItem("Topic-NL-"+brandNL, JSON.stringify(checkb));

      var xhr = new XMLHttpRequest()
            xhr.open("POST", URL_API, true)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(JSON.stringify({ 
              email: mailLS, 
              brand: brandNL, 
              topics: checkb
          
      }))
       formLast.style.display = "none"
       divSuccessDesktop.style.display = "flex"

    })
    form.addEventListener("submit", e => {
      e.preventDefault()
      const re = new RegExp(/[\\w\\.-]+@[\\w\\.-]+/, 'i')
      const validEmail  = re.test(formInputs[0].value)

      if(chkb1.checked == false && chkb2.checked == false){
        alert("Seleccione un Boletín")
        return false
      }

      if(chkb1.checked && chkb2.checked == false){
        topicNL = chkb1.value
        checkb = [chkb1.value]
      }

      if(chkb2.checked && chkb1.checked == false){
        topicNL = chkb2.value
        checkb = [chkb2.value]
      }
      
      if(chkb1.checked && chkb2.checked){
        checkb = [chkb1.value, chkb2.value]
      }

      if(validEmail) {

        localStorage.setItem("Correo-NL-"+brandNL, formInputs[0].value);
        localStorage.setItem("Topic-NL-"+brandNL, JSON.stringify(checkb));

        var xhr = new XMLHttpRequest()
            xhr.open("POST", URL_API, true)
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(JSON.stringify({ 
              email: formInputs[0].value, 
              brand: brandNL, 
              topics: checkb
          
        }))

       form.style.display = "none"
       divSuccessDesktop.style.display = "flex"

      }
      return false
    })
  })})
*/

  let customJs = ''
  customJs = `"use strict";window.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=document.getElementById("formNL"),t=e.elements,c=document.getElementById("msg_success"),n=document.getElementById("formNLlast"),l="${NEWSLETTER_API_LANDING}",a="${newsletterBrand}",d=(JSON.parse(window.localStorage.getItem("ArcId.USER_INFO")||"{}").uuid,JSON.parse(window.localStorage.getItem("ArcId.USER_INFO")||"{}").accessToken,document.getElementById("checkb1")),o=document.getElementById("checkb2"),s=[],r=localStorage.getItem("Correo-NL-"+a),i=JSON.parse(localStorage.getItem("Topic-NL-"+a));r?(n.style.display="flex",i.forEach(function(e){d.value==e&&(d.checked=!0),o.value==e&&(o.checked=!0)})):e.style.display="flex",n.addEventListener("submit",function(e){if(e.preventDefault(),0==d.checked&&0==o.checked)return alert("Seleccione un Boletín"),!1;d.checked&&0==o.checked&&(d.value,s=[d.value]),o.checked&&0==d.checked&&(o.value,s=[o.value]),d.checked&&o.checked&&(s=[d.value,o.value]),localStorage.setItem("Topic-NL-"+a,JSON.stringify(s));var t=new XMLHttpRequest;t.open("POST",l,!0),t.setRequestHeader("Content-Type","application/json"),t.send(JSON.stringify({email:r,brand:a,topics:s})),n.style.display="none",c.style.display="flex"}),e.addEventListener("submit",function(n){n.preventDefault();var r=new RegExp(/[\\w\\.-]+@[\\w\\.-]+/,"i").test(t[0].value);if(0==d.checked&&0==o.checked)return alert("Seleccione un Boletín"),!1;if(d.checked&&0==o.checked&&(d.value,s=[d.value]),o.checked&&0==d.checked&&(o.value,s=[o.value]),d.checked&&o.checked&&(s=[d.value,o.value]),r){localStorage.setItem("Correo-NL-"+a,t[0].value),localStorage.setItem("Topic-NL-"+a,JSON.stringify(s));var i=new XMLHttpRequest;i.open("POST",l,!0),i.setRequestHeader("Content-Type","application/json"),i.send(JSON.stringify({email:t[0].value,brand:a,topics:s})),e.style.display="none",c.style.display="flex"}return!1})})});`

  return (
    <>
      <div className={classes.nnContainer}>
        <div className={classes.nnCont1}>
          <div className={classes.nnBox1}>
            <div className={classes.nnTitle}>Boletín electrónico</div>
            <div className={classes.nnLogo}>
              <svg
                width="41px"
                height="24px"
                id="Capa_1"
                data-name="Capa 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 24.33">
                <defs>
                  <style>{'.cls-1{fill:#333}'}</style>
                </defs>
                <path
                  id="Trazado_79132"
                  data-name="Trazado 79132"
                  className="cls-1"
                  d="M47.16 24.65h.16l.06-.06v-.11a.08.08 0 0 1 0-.05v-.05a.43.43 0 0 1 0-.05V1.37a1 1 0 0 0-1-1H13.69v.2a.07.07 0 0 0 0 .05v6.6a1 1 0 0 0 2.08 0V3.69l9.25 8.19a.75.75 0 0 0-.14.12l-9.11 9.11v-6.84a1 1 0 0 0-2.08 0v1.27H7.76a1 1 0 0 0 0 2.09h5.38v6a1 1 0 0 0 1 1h33Zm-1.24-3.54L36.8 12l6.86-5.81a1 1 0 0 0-1.35-1.59l-11.73 9.92-13.67-12.1h29v18.7ZM25.8 13.47a1.14 1.14 0 0 0 .18-.25l3.89 3.45a1 1 0 0 0 1.37 0l4-3.36a.79.79 0 0 0 .12.15l9.12 9.11h-27.8Z"
                  transform="translate(0 -.33)"
                />
                <path
                  id="Trazado_79133"
                  data-name="Trazado 79133"
                  className="cls-1"
                  d="M1 12.19h17.62a1 1 0 0 0 0-2.08H1a1 1 0 0 0 0 2.08Z"
                  transform="translate(0 -.33)"
                />
                <path
                  id="Trazado_79134"
                  data-name="Trazado 79134"
                  className="cls-1"
                  d="M2.86 6.45h7.9a1 1 0 1 0 0-2.08h-7.9a1 1 0 0 0 0 2.08Z"
                  transform="translate(0 -.33)"
                />
                <path
                  id="Trazado_79135"
                  data-name="Trazado 79135"
                  className="cls-1"
                  d="M8.68 19.94H1A1 1 0 1 0 1 22h7.68a1 1 0 1 0 0-2.08Z"
                  transform="translate(0 -.33)"
                />
              </svg>
            </div>
          </div>
          <div className={classes.nnText}>
            Selecciona los newsletters que te interesan y recibe la información
            en tu correo electrónico
          </div>
        </div>
        <div className={classes.nnCont2}>
          <div className={classes.nnSecCont}>
            <div className={classes.nnBox2}>
              <div className={classes.nnLeftSvg}>
                <div className={classes.nnLeftImg} />
              </div>
              <div className={classes.nnBoxCheckbox1}>
                <input
                  type="checkbox"
                  name="terminos"
                  id="checkb1"
                  value="general"
                  className={classes.nnInputTerm}
                />
                <div className={classes.nnSubTitle1}>GENERAL</div>
              </div>
              <div className={classes.nnSecText}>
                La información mas relevante del futbol nacional, internacional
                y polideportivo. La Liga 1, la Selección Peruana, los peruanos
                en el mundo, LaLiga de España y mucho más.
              </div>
            </div>
          </div>
          <div className={classes.nnSecCont}>
            <div className={`${classes.nnBox2} ${classes.nnMarginL10}`}>
              <div className={classes.nnRightSvg}>
                <div className={classes.nnRightImg} />
              </div>
              <div className={classes.nnBoxCheckbox1}>
                <input
                  type="checkbox"
                  id="checkb2"
                  value="son_datos_no_opiniones"
                  className={classes.nnInputTerm}
                />
                <div className={classes.nnSubTitle2}>
                  SON DATOS NO OPINIONES
                </div>
              </div>
              <div className={classes.nnSecText}>
                Data exclusiva y corroborada del fútbol peruano e internacional.
                Ten la mejor información sobre el equipo de tus amores, como el
                balompié en el mundo.
              </div>
            </div>
          </div>
        </div>
        <div className={classes.nnCont3}>
          <form action="" id="formNL" className={classes.nnCont3}>
            <input
              type="email"
              placeholder=" Ingresa tu Email"
              name="email"
              required
              className={classes.nnTextBox}
            />
            <button type="submit" className={classes.nnButtonReceive}>
              Recibir
            </button>
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
          </form>
          <form action="" id="formNLlast" className={classes.nnCont3}>
            <button type="submit" className={classes.nnButtonReceive}>
              {' '}
              Recibir{' '}
            </button>
          </form>
          <div className={classes.nnSuccess} id="msg_success">
            <div className={classes.nnSuccessButton}>
              <button type="button">¡Ya estás suscrito!</button>
            </div>
            <div className={classes.nnSuccessLink}>
              <a href="/">Ir a portada</a>
            </div>
          </div>
        </div>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: customJs,
          }}
        />
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
