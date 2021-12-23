/*
    const URL_NEWSLETTER_API = '${NEWSLETTER_API}'
    const brandNL = '${newsletterBrand}'
    window.addEventListener('DOMContentLoaded', () => {requestIdle(() => {
      const formsInPage = document.getElementsByClassName("class-news-custom-form")
      const formButton = document.getElementsByClassName('newsletter__button')
      const first_div = document.getElementsByClassName("newsletter__formInputs")
      const second_div = document.getElementsByClassName("newsletter__divConfirmation")

      let estadoNL = false
      if(formsInPage[0]){
        estadoNL = true
      }

      if(estadoNL){
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
      }

      //solo para trome
      if((brandNL == 'trome' || brandNL == 'correo') && estadoNL){
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
export const newsletterScript = (
  newsletterAPI: string,
  newsletterBrand: string,
  activateJS: string
): string =>
  activateJS === 'DESACTIVAR'
    ? ''
    : `"use strict";var URL_NEWSLETTER_API="${newsletterAPI}",brandNL="${newsletterBrand}";window.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=document.getElementsByClassName("class-news-custom-form"),t=document.getElementsByClassName("newsletter__button"),n=document.getElementsByClassName("newsletter__formInputs"),s=document.getElementsByClassName("newsletter__divConfirmation"),a=!1;if(e[0]&&(a=!0),a&&e[0].addEventListener("submit",function(e){e.preventDefault(),t[0].disabled=!0;var a=document.getElementsByClassName("newsletter__email")[0],l=document.getElementsByClassName("newsletter__error-message")[0];if(!new RegExp(/[\\w\\.-]+@[\\w\\.-]+/,"i").test(a.value))return t[0].disabled=!1,l.textContent="Ingrese un correo valido",!1;l.textContent="",n[0].style.display="none",s[0].style.display="block";var d=new XMLHttpRequest;d.open("POST",URL_NEWSLETTER_API,!0),d.setRequestHeader("Content-Type","application/json"),d.send(JSON.stringify({email:a.value,brand:brandNL}))}),("trome"==brandNL||"correo"==brandNL)&&a){var l=document.getElementById("stNewsCinDesk"),d=document.getElementById("stNewsCinMob"),o=document.getElementById("HeaderNewsletter");o.className="",o.style.display="none",l.addEventListener("change",function(){l.checked?(o.className="header-full__newsletter-tooltip showTooltipDesk",o.style.display="flex"):o.style.display="none"}),d.addEventListener("change",function(){d.checked?(o.className="header-full__newsletter-modal active showModalMob",o.style.display="block"):o.style.display="none"})}e.length>1&&e[1].addEventListener("submit",function(e){e.preventDefault(),t[1].disabled=!0;var a=document.getElementsByClassName("newsletter__email")[1],l=document.getElementsByClassName("newsletter__error-message")[1];if(!new RegExp(/[\\w\\.-]+@[\\w\\.-]+/,"i").test(a.value))return t[1].disabled=!1,l.textContent="Ingrese un correo valido",!1;l.textContent="",n[1].style.display="none",s[1].style.display="block";var d=new XMLHttpRequest;d.open("POST",URL_NEWSLETTER_API,!0),d.setRequestHeader("Content-Type","application/json"),d.send(JSON.stringify({email:a.value,brand:brandNL}))})})});`
