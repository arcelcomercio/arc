/* eslint-disable import/prefer-default-export */

// const arcEnv = '${arcEnv}'
// const arcSite = '${arcSite}'
// document.addEventListener('DOMContentLoaded', function() {
//   requestIdle(() => {
//     const Taggeo = (cate, acc) => {
//       if (typeof window !== 'undefined') {
//         window.dataLayer = window.dataLayer || []
//         const dataPush = {
//           event: 'tag_signwall',
//           eventCategory: cate,
//           eventAction: acc,
//         }
//         window.dataLayer.push(dataPush)
//         if (arcEnv === 'sandbox') {
//           window.console.log(dataPush)
//         }
//       }
//     }

//     const localProfile = JSON.parse(
//       window.localStorage.getItem('ArcId.USER_PROFILE') ||
//         window.sessionStorage.getItem('ArcId.USER_PROFILE')
//     )

//     const { email = '', emailVerified = '', displayName = '' } =
//       localProfile || {}

//     const divCintillo = document.getElementById('signwall-cintillo-verify')
//     const textCintillo = document.getElementById('signwall-cintillo-texto')
//     const textCounter = document.getElementById('signwall-cintillo-counter')
//     const linkCintillo = document.getElementById('signwall-cintillo-link')

//     const isFacebook = () => {
//       return email && email.indexOf('@facebook.com') >= 0
//     }

//     const setCookie = (name, value, days) => {
//       const d = new Date()
//       d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
//       document.cookie = `${name}=${value};path=/;expires=${d.toGMTString()}`
//     }

//     const getCookie = name => {
//       const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`)
//       return v ? v[2] : null
//     }

//     const isCookie = () => {
//       return getCookie('show_confirm_notice')
//     }

//     const isDisplayName = () => {
//       return displayName && displayName === email
//     }

//     const requestVerifyEmail = mail => {
//       const response = new Promise(resolve => {
//         fetch(
//           `https://api${
//             arcEnv === 'sandbox' ? '-sandbox' : ''
//           }.${arcSite}.pe/identity/public/v1/email/verify`,
//           {
//             method: 'POST',
//             body: JSON.stringify({
//               email: mail,
//             }),
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         ).then(res => resolve(res.json()))
//       })
//       return response
//     }

//     const sendVerifyEmail = () => {
//       requestVerifyEmail(email)
//       Taggeo('Web_Sign_Wall_Organico', 'web_swo_cintillo_reenviar_correo')
//       let timeleft = 9
//       const downloadTimer = setInterval(() => {
//         if (timeleft <= 0) {
//           clearInterval(downloadTimer)
//           linkCintillo.style.display = 'block'
//           textCounter.style.display = 'none'
//         } else {
//           const divCount = document.getElementById(
//             'signwall-cintillo-countdown'
//           )
//           if (divCount) divCount.innerHTML = ` ${timeleft} `
//         }
//         timeleft -= 1
//       }, 1000)
//     }

//     if (
//       email &&
//       divCintillo &&
//       !emailVerified &&
//       !isFacebook() &&
//       !isCookie() &&
//       isDisplayName()
//     ) {
//       divCintillo.style.display = 'flex'
//     }

//     if (textCintillo) {
//       textCintillo.innerHTML = `Estimado usuario le invitamos a que pueda verificar su correo: <strong>${email}</strong>.`
//     }

//     document
//       .getElementById('signwall-cintillo-link')
//       .addEventListener('click', () => {
//         sendVerifyEmail()
//         linkCintillo.style.display = 'none'
//         textCounter.style.display = 'block'
//       })

//     document
//       .getElementById('signwall-cintillo-close')
//       .addEventListener('click', () => {
//         divCintillo.style.display = 'none'
//         setCookie('show_confirm_notice', 'false', 1)
//       })
//   })
// })

export const cintilloScript = ({ arcEnv, arcSite }) =>
  `"use strict";var arcEnv="${arcEnv}",arcSite="${arcSite}";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e,n,t=JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE")||window.sessionStorage.getItem("ArcId.USER_PROFILE"))||{},o=t.email,i=void 0===o?"":o,a=t.emailVerified,c=void 0===a?"":a,l=t.displayName,d=void 0===l?"":l,r=document.getElementById("signwall-cintillo-verify"),s=document.getElementById("signwall-cintillo-texto"),m=document.getElementById("signwall-cintillo-counter"),w=document.getElementById("signwall-cintillo-link"),u=function(){var e;window.console.log("enviar correoa",i),e=i,new Promise(function(n){fetch("https://api".concat("sandbox"===arcEnv?"-sandbox":"",".").concat(arcSite,".pe/identity/public/v1/email/verify"),{method:"POST",body:JSON.stringify({email:e}),headers:{"Content-Type":"application/json"}}).then(function(e){return n(e.json())})}),function(e,n){if("undefined"!=typeof window){window.dataLayer=window.dataLayer||[];var t={event:"tag_signwall",eventCategory:e,eventAction:n};window.dataLayer.push(t),"sandbox"===arcEnv&&window.console.log(t)}}("Web_Sign_Wall_Organico","web_swo_cintillo_reenviar_correo");var n=9,t=setInterval(function(){if(n<=0)clearInterval(t),w.style.display="block",m.style.display="none";else{var e=document.getElementById("signwall-cintillo-countdown");e&&(e.innerHTML=" ".concat(n," "))}n-=1},1e3)};!i||!r||c||i&&i.indexOf("@facebook.com")>=0||(e="show_confirm_notice",(n=document.cookie.match("(^|;) ?".concat(e,"=([^;]*)(;|$)")))&&n[2])||!d||d!==i||(r.style.display="flex"),s&&(s.innerHTML="Estimado usuario le invitamos a que pueda verificar su correo: <strong>".concat(i,"</strong>.")),document.getElementById("signwall-cintillo-link").addEventListener("click",function(){u(),w.style.display="none",m.style.display="block"}),document.getElementById("signwall-cintillo-close").addEventListener("click",function(){var e,n,t,o;window.console.log("cerrar cintillo"),r.style.display="none",e="show_confirm_notice",n="false",t=1,(o=new Date).setTime(o.getTime()+864e5*t),document.cookie="".concat(e,"=").concat(n,";path=/;expires=").concat(o.toGMTString())})})});`
