import React from 'react'
import { NEWSLETTER_API } from 'fusion:environment'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

const classes = {
  newsletter: `newsletter__custom flex flex-col-reverse items-center lg:justify-between lg:justify-center`,
  boxSubscription: `newsletter__box-subscription pr-40 pl-40 primary-font p-15`,
  errorMessage: 'newsletter__error-message block pt-5 text-xs',
  errorMessageMedium: 'text-lg mb-20',
  bannerImage: 'newsletter__banner-image w-full lg:w-inherit',
  image: 'newsletter__image lg:w-full',

  title: 'text-center position-relative font-bold text-xl line-h-xs mt-20',
  subtitle: 'text-center text-black font-bold  title-lg line-h-xs',
  titleConfirmation: 'newsletter__title--confirmation',
  description: 'newsletter__description text-center line-h-xs',
  row: 'newsletter__row mb-20',
  email:
    'newsletter__email w-full pr-15 pl-15 text-md border-1 border-solid border-gray',
  textCenter: 'text-center',
  button: 'newsletter__button bg-black font-bold w-full text-white border-r-10',
  policies: 'newsletter__policies font-bold cursor-pointer text-sm',
  pageLink: 'newsletter__page-link text-gray-300',
  inputCheckbox: 'newsletter__input-checkbox mr-10',
  divConfirmation: 'newsletter__divConfirmation',
  divFormInputs: 'newsletter__formInputs',
  divFormCustom: 'class-news-custom-form',
}
const Newsletter = props => {
  // const { confirmRegister, formMessage } = props

  // const formHtml = confirmRegister ? (
  //   <Confirmation {...props} />
  // ) : (
  //   <Form {...props} />
  // )

  const {
    description,
    colorButton,
    urlTos,
    urlPrivacyPolicies,
    incluyejs,
  } = props
  const { arcSite } = useFusionContext()
  const { newsletterBrand } = getProperties(arcSite)

  /*
    const URL_NEWSLETTER_API = '${NEWSLETTER_API}'
    const brandNL = '${newsletterBrand}'
    window.addEventListener('DOMContentLoaded', () => {requestIdle(() => {
      const formsInPage = document.getElementsByClassName("class-news-custom-form")
      const formButton = document.getElementsByClassName('newsletter__button')
      const first_div = document.getElementsByClassName("newsletter__formInputs")
      const second_div = document.getElementsByClassName("newsletter__divConfirmation")
      formsInPage[0].addEventListener("submit", (event) => {
        event.preventDefault()
        formButton[0].disabled = true
        const IEmailNC = document.getElementsByClassName("newsletter__email")[0]
        const EmailMessageNC = document.getElementsByClassName("newsletter__error-message")[0]
        const re = new RegExp(/[\\w\\.-]+@[\\w\\.-]+/, 'i')
        const validEmail  = re.test(IEmailNC.value)
        if(validEmail) {
          EmailMessageNC.textContent = ""
          first_div[0].style.display = "none";
          second_div[0].style.display = 'block'
        }else{
          formButton[0].disabled = false
          EmailMessageNC.textContent = "Ingrese un correo valido"
          return false
        }
        var xhr = new XMLHttpRequest();
        xhr.open("POST", URL_NEWSLETTER_API, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            email: IEmailNC.value,
            brand: brandNL
        }))
      })

      //solo para trome
      if(brandNL == 'trome'){
        const checkDesk = document.getElementById('stNewsCinDesk')
        const checkMob = document.getElementById('stNewsCinMob')

        const HeaderNewsletter = document.getElementById('HeaderNewsletter')
        HeaderNewsletter.className=''
        HeaderNewsletter.style.display = 'none'
        checkDesk.addEventListener('change', function() {
          if (checkDesk.checked) {
            HeaderNewsletter.className='header-full__newsletter-tooltip showTooltipDesk'
            HeaderNewsletter.style.display = 'flex'
          }else{
            HeaderNewsletter.style.display = 'none'
          }
        })

        checkMob.addEventListener('change', function() {
          if (checkMob.checked) {
            HeaderNewsletter.className='header-full__newsletter-modal active showModalMob'
            HeaderNewsletter.style.display = 'block'
          }else{
            HeaderNewsletter.style.display = 'none'
          }
        })
      }

      if(formsInPage.length > 1){
        formsInPage[1].addEventListener("submit", (event) => {
          event.preventDefault()
          formButton[1].disabled = true
          const IEmailNC = document.getElementsByClassName("newsletter__email")[1]
          const EmailMessageNC = document.getElementsByClassName("newsletter__error-message")[1]
          const re = new RegExp(/[\\w\\.-]+@[\\w\\.-]+/, 'i')
          const validEmail  = re.test(IEmailNC.value)
          if(validEmail) {
            EmailMessageNC.textContent = ""
            first_div[1].style.display = "none";
            second_div[1].style.display = 'block'
          }else{
            formButton[1].disabled = false
            EmailMessageNC.textContent = "Ingrese un correo valido"
            return false
          }
          var xhr = new XMLHttpRequest();
          xhr.open("POST", URL_NEWSLETTER_API, true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify({
              email: IEmailNC.value,
              brand: brandNL
          }))
        })
      }

    })})
  */
  let NewsCustomJs = ''
  NewsCustomJs = `"use strict";var URL_NEWSLETTER_API="${NEWSLETTER_API}",brandNL="${newsletterBrand}";window.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=document.getElementsByClassName("class-news-custom-form"),t=document.getElementsByClassName("newsletter__button"),n=document.getElementsByClassName("newsletter__formInputs"),s=document.getElementsByClassName("newsletter__divConfirmation");if(e[0].addEventListener("submit",function(e){e.preventDefault(),t[0].disabled=!0;var a=document.getElementsByClassName("newsletter__email")[0],l=document.getElementsByClassName("newsletter__error-message")[0];if(!new RegExp(/[\\w\\.-]+@[\\w\\.-]+/,"i").test(a.value))return t[0].disabled=!1,l.textContent="Ingrese un correo valido",!1;l.textContent="",n[0].style.display="none",s[0].style.display="block";var d=new XMLHttpRequest;d.open("POST",URL_NEWSLETTER_API,!0),d.setRequestHeader("Content-Type","application/json"),d.send(JSON.stringify({email:a.value,brand:brandNL}))}),"trome"==brandNL){var a=document.getElementById("stNewsCinDesk"),l=document.getElementById("stNewsCinMob"),d=document.getElementById("HeaderNewsletter");d.className="",d.style.display="none",a.addEventListener("change",function(){a.checked?(d.className="header-full__newsletter-tooltip showTooltipDesk",d.style.display="flex"):d.style.display="none"}),l.addEventListener("change",function(){l.checked?(d.className="header-full__newsletter-modal active showModalMob",d.style.display="block"):d.style.display="none"})}e.length>1&&e[1].addEventListener("submit",function(e){e.preventDefault(),t[1].disabled=!0;var a=document.getElementsByClassName("newsletter__email")[1],l=document.getElementsByClassName("newsletter__error-message")[1];if(!new RegExp(/[\\w\\.-]+@[\\w\\.-]+/,"i").test(a.value))return t[1].disabled=!1,l.textContent="Ingrese un correo valido",!1;l.textContent="",n[1].style.display="none",s[1].style.display="block";var d=new XMLHttpRequest;d.open("POST",URL_NEWSLETTER_API,!0),d.setRequestHeader("Content-Type","application/json"),d.send(JSON.stringify({email:a.value,brand:brandNL}))})})});`
  if (incluyejs === 'FALSE') {
    NewsCustomJs = ''
  }
  return (
    <>
      <div className={classes.newsletter}>
        <div className={`${classes.boxSubscription} ${classes.divFormInputs}`}>
          <h4
            className={`${classes.errorMessage} ${classes.errorMessageMedium}`}>
            {' '}
          </h4>
          <p className={`${classes.textCenter}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              viewBox="0 0 48 24.33">
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
                required="required"
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
              <label className={classes.policies} htmlFor="tos">
                <input
                  type="checkbox"
                  name="tos"
                  required="required"
                  value="1"
                  className={classes.inputCheckbox}
                />
                Acepto los
                <a
                  itemProp="url"
                  className={classes.pageLink}
                  href={urlTos}
                  target="_blank"
                  rel="noopener noreferrer">
                  Términos y condiciones
                </a>
                y
                <a
                  itemProp="url"
                  className={classes.pageLink}
                  href={urlPrivacyPolicies}
                  target="_blank"
                  rel="noopener noreferrer">
                  Políticas de privacidad
                </a>
              </label>
              <p className={classes.errorMessage} id="CheckMessageNC"></p>
            </div>
          </form>
        </div>
        <div
          className={`${classes.boxSubscription} ${classes.divConfirmation}`}
          style={{ display: 'none' }}>
          <p className={classes.textCenter}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              viewBox="0 0 48 24.33">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="60"
              viewBox="0 0 64 64">
              <path
                fill="#e06438"
                d="M32 0A32 32 0 1 0 64 32 32 32 0 0 0 32 0ZM48.2 25.2 30.9 42.6a2.7 2.7 0 0 1-3.8 0h0l-8.7-8.7a2.7 2.7 0 0 1 3.8-3.8L29 36.9 44.5 21.5a2.7 2.7 0 0 1 3.8 3.8Z"
              />
            </svg>
          </p>
          <p className={`${classes.title}`}>¡Recepción exitosa!</p>
        </div>
      </div>

      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: NewsCustomJs,
        }}
      />
    </>
  )
}

export default Newsletter
