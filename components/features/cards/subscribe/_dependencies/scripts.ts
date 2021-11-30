/*
document.addEventListener('DOMContentLoaded', () => {
  requestIdle(() => {
    const localProfile = JSON.parse(
      window.localStorage.getItem('ArcId.USER_PROFILE')
    )
    const { firstName = '', uuid = '' } = localProfile || {}
    const anonymusSuscribe = document.getElementById('<<anonymusId>>')
    const registerSuscribe = document.getElementById('<<registerId>>')
    const welcomeMsgSuscribe = document.getElementById('<<welcomeMsgId>>')
    if (uuid) {
      anonymusSuscribe.classList.remove('block')
      anonymusSuscribe.classList.add('hidden')
      registerSuscribe.classList.remove('hidden')
      registerSuscribe.classList.add('block')

      if (!firstName) {
        welcomeMsgSuscribe.innerHTML = '¡Hola!'
      } else {
        welcomeMsgSuscribe.innerHTML = `¡Hola ${firstName}! `
      }
    }
  })
})
*/

export const handleUserStatus = (
  contAnonymus: string,
  contRegister: string,
  welcomeMsg: string
): string =>
  `"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE"))||{},t=e.firstName,d=void 0===t?"":t,n=e.uuid,o=void 0===n?"":n,t=document.getElementById("<<anonymusId>>"),e=document.getElementById("<<registerId>>"),n=document.getElementById("<<welcomeMsgId>>");o&&(t.classList.remove("block"),t.classList.add("hidden"),e.classList.remove("hidden"),e.classList.add("block"),n.innerHTML=d?"¡Hola ".concat(d,"! "):"¡Hola!")})});`
    .replace('<<anonymusId>>', contAnonymus)
    .replace('<<registerId>>', contRegister)
    .replace('<<welcomeMsgId>>', welcomeMsg)
