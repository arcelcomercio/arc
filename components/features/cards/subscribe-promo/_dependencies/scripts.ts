/* document.addEventListener('DOMContentLoaded', () => {
  requestIdle(() => {
    const localProfile = JSON.parse(
      window.localStorage.getItem('ArcId.USER_PROFILE')
    )
    const { uuid = '' } = localProfile || {}

    const promotionTrome = document.getElementById('<<containerBanner>>')
    const promotionSubCont = document.getElementById('<<subcontainerBanner>>')
    const messageBanner = document.getElementById('<<messageContainer>>')
    const metroLogo = document.getElementById('<<metroLogo>>')
    const metroLogoBenefits = document.getElementById('<<metroLogoBenefits>>')
    const messageMovilBanner = document.getElementById('<<messageMovil>>')
    if (uuid) {
      promotionTrome?.addEventListener('click', () => {
        window.location.href = '/cuponera-metro'
      })
      promotionSubCont.style.backgroundColor = '#598f2d'
      messageBanner.innerHTML = 'Haz click y accede a tus beneficios'
      metroLogo.style.display = 'none'
      metroLogoBenefits.style.display = 'initial'
      messageMovilBanner.innerHTML =
        '¡Presiona aquí y accede a estos increíbles descuentos!'
    } else {
      promotionTrome.addEventListener('click', () => {
        window.location.href = '/signwall/?outputType=subscriptions&banner=1'
      })
    }
  })
}) */

export const verifyUserPromotionTrome = (
  container: string,
  subcontainer: string,
  message: string,
  imgLogo: string,
  imgLogo2: string,
  messageMovil: string
): string =>
  `"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=(JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE"))||{}).uuid,n=void 0===e?"":e,t=document.getElementById("<<containerBanner>>"),o=document.getElementById("<<subcontainerBanner>>"),i=document.getElementById("<<messageContainer>>"),d=document.getElementById("<<metroLogo>>"),c=document.getElementById("<<metroLogoBenefits>>"),e=document.getElementById("<<messageMovil>>");n?(null!=t&&t.addEventListener("click",function(){window.location.href="/cuponera-metro"}),o.style.backgroundColor="#598f2d",i.innerHTML="Haz click y accede a tus beneficios",d.style.display="none",c.style.display="initial",e.innerHTML="¡Presiona aquí y accede a estos increíbles descuentos!"):t.addEventListener("click",function(){window.location.href="/signwall/?outputType=subscriptions&banner=1"})})});`
    .replace('<<containerBanner>>', container)
    .replace('<<subcontainerBanner>>', subcontainer)
    .replace('<<messageContainer>>', message)
    .replace('<<metroLogo>>', imgLogo)
    .replace('<<metroLogoBenefits>>', imgLogo2)
    .replace('<<messageMovil>>', messageMovil)
