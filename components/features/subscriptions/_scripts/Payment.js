// document.addEventListener('DOMContentLoaded', () => {
//   requestIdle(() => {
//     const btnDetailMobile = document.getElementById('btn-detail')
//     const divDetailMobile = document.getElementById('div-detail')
//     const btnDetailClose = document.getElementById('btn-detail-close')
//     const divFooter = document.getElementById('footer')
//     const divValidate = document.getElementById('validate')
//     const btnRemember = document.getElementById('btn-close-remember')
//     const divRemember = document.getElementById('div-remember')
//     const isFirefox =
//       window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1

//     function setCookie(cname, cvalue, exdays) {
//       const d = new Date()
//       d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000)
//       const expires = `expires=${d.toUTCString()}`
//       document.cookie = `${cname}=${cvalue};${expires};path=/`
//     }

//     function getCookie(cname) {
//       const name = `${cname}=`
//       const ca = document.cookie.split(';')
//       for (let i = 0; i < ca.length; i++) {
//         let c = ca[i]
//         while (c.charAt(0) === ' ') {
//           c = c.substring(1)
//         }
//         if (c.indexOf(name) === 0) {
//           return c.substring(name.length, c.length)
//         }
//       }
//       return ''
//     }

//     function hideShowDetails() {
//       window.scrollTo({ top: 0, behavior: 'smooth' })
//       divDetailMobile.classList.toggle('step__show-detail')
//       btnDetailMobile.classList.toggle('step__hidden')
//       divFooter.classList.toggle('step__hidden')
//       if (divValidate) divValidate.classList.toggle('step__hidden')
//       document.body.classList.toggle('no-scroll')
//       window.scrollTo({ top: 0, behavior: 'smooth' })
//     }

//     if (btnDetailMobile) {
//       btnDetailMobile.addEventListener('click', () => {
//         hideShowDetails()
//       })
//     }

//     if (btnDetailClose) {
//       btnDetailClose.addEventListener('click', () => {
//         hideShowDetails()
//       })
//     }

//     function hideToolTip() {
//       if (divRemember) {
//         divRemember.classList.remove('tooltip-inactive')
//         divRemember.classList.add('tooltip-active')
//       }
//     }

//     const toolTipStatus = getCookie('remember-tooltip')
//     if (toolTipStatus !== 'off') {
//       hideToolTip()
//     }

//     if (btnRemember && divRemember) {
//       btnRemember.addEventListener('click', () => {
//         divRemember.classList.add('tooltip-inactive')
//         setCookie('remember-tooltip', 'off', 1)
//       })
//     }
//   })
// })

const scriptsPayment =
  '"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=document.getElementById("btn-detail"),t=document.getElementById("div-detail"),o=document.getElementById("btn-detail-close"),n=document.getElementById("footer"),i=document.getElementById("validate"),c=document.getElementById("btn-close-remember"),d=document.getElementById("div-remember");window.navigator.userAgent.toLowerCase().indexOf("firefox");function s(){window.scrollTo({top:0,behavior:"smooth"}),t.classList.toggle("step__show-detail"),e.classList.toggle("step__hidden"),n.classList.toggle("step__hidden"),i&&i.classList.toggle("step__hidden"),document.body.classList.toggle("no-scroll"),window.scrollTo({top:0,behavior:"smooth"})}e&&e.addEventListener("click",function(){s()}),o&&o.addEventListener("click",function(){s()}),"off"!==function(e){for(var t="".concat(e,"="),o=document.cookie.split(";"),n=0;n<o.length;n++){for(var i=o[n];" "===i.charAt(0);)i=i.substring(1);if(0===i.indexOf(t))return i.substring(t.length,i.length)}return""}("remember-tooltip")&&d&&(d.classList.remove("tooltip-inactive"),d.classList.add("tooltip-active")),c&&d&&c.addEventListener("click",function(){d.classList.add("tooltip-inactive"),function(e,t,o){var n=new Date;n.setTime(n.getTime()+24*o*60*60*1e3);var i="expires=".concat(n.toUTCString());document.cookie="".concat(e,"=").concat(t,";").concat(i,";path=/")}("remember-tooltip","off",1)})})});'
export default scriptsPayment
