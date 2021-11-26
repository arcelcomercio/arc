/*
document.addEventListener('DOMContentLoaded', () => {
  requestIdle(() => {
    const localProfile = JSON.parse(
      window.localStorage.getItem('ArcId.USER_PROFILE')
    )
    const { firstName = '', uuid = '' } = localProfile || {}
    const anonymusSuscribe = document.getElementById('anonymus-suscribe')
    const registerSuscribe = document.getElementById('register-suscribe')
    const helloRegisterSuscribe = document.getElementById('suscriber-user')
    if (uuid) {
      anonymusSuscribe.style.display = 'none'
      registerSuscribe.style.display = 'block'

      if (!firstName) {
        helloRegisterSuscribe.innerHTML = '¡Hola!'
      } else {
        helloRegisterSuscribe.innerHTML = `¡Hola ${firstName}! `
      }
    } else {
      anonymusSuscribe.style.display = 'block'
      registerSuscribe.style.display = 'none'
    }
  })
})
*/
export const handleUserStatus = (): string =>
  `"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE"))||{},t=e.firstName,n=void 0===t?"":t,s=e.uuid,d=void 0===s?"":s,o=document.getElementById("anonymus-suscribe"),i=document.getElementById("register-suscribe"),l=document.getElementById("suscriber-user");d?(o.style.display="none",i.style.display="block",l.innerHTML=n?"¡Hola ".concat(n,"! "):"¡Hola!"):(o.style.display="block",i.style.display="none")})});`
