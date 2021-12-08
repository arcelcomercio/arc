/*
document.addEventListener('DOMContentLoaded', () => {
  requestIdle(() => {
    const localProfile = JSON.parse(
      window.localStorage.getItem('ArcId.USER_PROFILE')
    )
    const { uuid = '' } = localProfile || {}

    const msgTitle = document.getElementById('<<titleId>>')
    const msgSubtitle = document.getElementById('<<subtitleId>>')
    const msgBtnBanner = document.getElementById('<<messageBtnId>>')
    const containerMovil = document.getElementById('<<containerMovilId>>')
    const messageMovilBanner = document.getElementById('<<messageMovilId>>')
    
    if (uuid) {
      const urlLogged = '<<urlCuponera>>'
      if (msgBtnBanner) {
        msgBtnBanner.innerHTML = 'AQUÍ'
        msgBtnBanner.addEventListener('click', () => {
          window.location.href = urlLogged
        })
      }
      if (containerMovil) {
        containerMovil.addEventListener('click', () => {
          window.location.href = urlLogged
        })
      }

      if(msgTitle) msgTitle.innerHTML = ''
      if(msgSubtitle) msgSubtitle.innerHTML = 'ACCEDE A TUS BENEFICIOS EXCLUSIVOS'
      if(messageMovilBanner) messageMovilBanner.innerHTML = '¡Presiona aquí y accede a estos increíbles descuentos!'

    } else {
      const urlNoLogged = '/signwall/?outputType=subscriptions&banner=1'
      if (msgBtnBanner) {
        msgBtnBanner.addEventListener('click', () => {
          window.location.href = urlNoLogged
        })
      }

      if (containerMovil) {
        containerMovil.addEventListener('click', () => {
          window.location.href = urlNoLogged
        })
      }
    }
  })
})
*/

export const verifyUserPromotion = (
  titleId: string,
  subtitleId: string,
  btnBannerId: string,
  containerMovilId: string,
  messageMovilId: string,
  urlCuponera: string
): string =>
  '"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=(JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE"))||{}).uuid,n=void 0===e?"":e,t=document.getElementById("<<titleId>>"),i=document.getElementById("<<subtitleId>>"),o=document.getElementById("<<messageBtnId>>"),d=document.getElementById("<<containerMovilId>>"),c=document.getElementById("<<messageMovilId>>");if(n){o&&(o.innerHTML="AQUÍ",o.addEventListener("click",function(){window.location.href="<<urlCuponera>>"})),d&&d.addEventListener("click",function(){window.location.href="<<urlCuponera>>"}),t&&(t.innerHTML=""),i&&(i.innerHTML="ACCEDE A TUS BENEFICIOS EXCLUSIVOS"),c&&(c.innerHTML="¡Presiona aquí y accede a estos increíbles descuentos!")}else{var r="/signwall/?outputType=subscriptions&banner=1";o&&o.addEventListener("click",function(){window.location.href=r}),d&&d.addEventListener("click",function(){window.location.href=r})}})});'
    .replace('<<titleId>>', titleId)
    .replace('<<subtitleId>>', subtitleId)
    .replace('<<messageBtnId>>', btnBannerId)
    .replace('<<containerMovilId>>', containerMovilId)
    .replace('<<messageMovilId>>', messageMovilId)
    .replace('<<urlCuponera>>', urlCuponera)
