/*
document.addEventListener('DOMContentLoaded', () => {
  requestIdle(() => {
    const localProfile = JSON.parse(
      window.localStorage.getItem('ArcId.USER_PROFILE')
    )
    const { firstName = '', uuid = '' } = localProfile || {}
    const registerBtn = document.getElementById('btn-register-id')
    const anonymusSuscribe = document.getElementById('<<anonymusId>>')
    const registerSuscribe = document.getElementById('<<registerId>>')
    const welcomeMsgSuscribe = document.getElementById('<<welcomeMsgId>>')
    if (uuid) {
      anonymusSuscribe.classList.remove('block')
      anonymusSuscribe.classList.add('hidden')
      registerSuscribe.classList.remove('hidden')
      registerSuscribe.classList.add('block')

      if (!firstName || /undefined|null/.test(firstName)) {
        welcomeMsgSuscribe.innerHTML = '¡Hola!'
      } else {
        const separador = firstName.split(' ')
        const firstNameSplit = separador[0]
        if (firstNameSplit.length > 15) {
          const shortName = firstNameSplit.substring(0, 15)
          welcomeMsgSuscribe.innerHTML = `¡Hola ${shortName}!`
        } else {
          welcomeMsgSuscribe.innerHTML = `¡Hola ${firstNameSplit}!`
        }
      }
    } else {
      registerBtn?.addEventListener('click', () => {
        window.location.href = '/signwall/?outputType=subscriptions&banner=1'
      })
    }
  })
})
*/
export const handleUserStatus = (
  contAnonymus: string,
  contRegister: string,
  welcomeMsg: string
): string =>
  `"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE"))||{},n=e.firstName,t=void 0===n?"":n,d=e.uuid,i=void 0===d?"":d,o=document.getElementById("btn-register-id"),n=document.getElementById("<<anonymusId>>"),e=document.getElementById("<<registerId>>"),d=document.getElementById("<<welcomeMsgId>>");i?(n.classList.remove("block"),n.classList.add("hidden"),e.classList.remove("hidden"),e.classList.add("block"),!t||/undefined|null/.test(t)?d.innerHTML="¡Hola!":15<(e=t.split(" ")[0]).length?(t=e.substring(0,15),d.innerHTML="¡Hola ".concat(t,"!")):d.innerHTML="¡Hola ".concat(e,"!")):null!=o&&o.addEventListener("click",function(){window.location.href="/signwall/?outputType=subscriptions&banner=1"})})});`
    .replace('<<anonymusId>>', contAnonymus)
    .replace('<<registerId>>', contRegister)
    .replace('<<welcomeMsgId>>', welcomeMsg)
