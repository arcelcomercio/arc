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
      msgBtnBanner.addEventListener('click', () => {
        window.location.href = urlLogged
      })
      containerMovil.addEventListener('click', () => {
        window.location.href = urlLogged
      })
      msgTitle.innerHTML = ''
      msgSubtitle.innerHTML = 'ACCEDE A TUS BENEFICIOS EXCLUSIVOS'
      msgBtnBanner.innerHTML = 'AQUÍ'
      messageMovilBanner.innerHTML =
        '¡Presiona aquí y accede a estos increíbles descuentos!'
    } else {
      const urlNoLogged = '/signwall/?outputType=subscriptions&banner=1'
      msgBtnBanner.addEventListener('click', () => {
        window.location.href = urlNoLogged
      })
      containerMovil.addEventListener('click', () => {
        window.location.href = urlNoLogged
      })
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
  `"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e,n,t=(JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE"))||{}).uuid,i=void 0===t?"":t,d=document.getElementById("<<titleId>>"),o=document.getElementById("<<subtitleId>>"),c=document.getElementById("<<messageBtnId>>"),r=document.getElementById("<<containerMovilId>>"),t=document.getElementById("<<messageMovilId>>");i?(e="<<urlCuponera>>",c.addEventListener("click",function(){window.location.href=e}),r.addEventListener("click",function(){window.location.href=e}),d.innerHTML="",o.innerHTML="ACCEDE A TUS BENEFICIOS EXCLUSIVOS",c.innerHTML="AQUÍ",t.innerHTML="¡Presiona aquí y accede a estos increíbles descuentos!"):(n="/signwall/?outputType=subscriptions&banner=1",c.addEventListener("click",function(){window.location.href=n}),r.addEventListener("click",function(){window.location.href=n}))})});`
    .replace('<<titleId>>', titleId)
    .replace('<<subtitleId>>', subtitleId)
    .replace('<<messageBtnId>>', btnBannerId)
    .replace('<<containerMovilId>>', containerMovilId)
    .replace('<<messageMovilId>>', messageMovilId)
    .replace('<<urlCuponera>>', urlCuponera)
