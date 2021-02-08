// 'use strict'
// const arcEnv = '${arcEnv}'

// function checkSession() {
//   if ('undefined' != typeof window) {
//     var e = window.localStorage.getItem('ArcId.USER_PROFILE'),
//       n = window.localStorage.getItem('ArcId.USER_INFO')
//     if (e) return !('null' === e || '{}' === n) || !1
//   }
//   return !1
// }

// function handleMessage(e) {
//   const originDomainMag =
//     arcEnv === 'prod'
//       ? 'https://mag.elcomercio.pe'
//       : 'https://elcomercio-elcomerciomag-sandbox.cdn.arcpublishing.com'
//   const pathCompareMag = /mag.elcomercio.pe/

//   const originDomainSpecial = 'https://especiales.elcomercio.pe'
//   const pathCompareSpecial = /especiales.elcomercio.pe/

//   if (
//     (e.origin === originDomainMag && e.data.match(pathCompareMag)) ||
//     (e.origin === originDomainSpecial && e.data.match(pathCompareSpecial))
//   ) {
//     window.console.log('entro URL => ', e.data)
//     window.ArcP.run({
//       paywallFunction: () => {},
//       customPageData: () => {
//         return { c: 'story', s: '/counter/external', ci: e.data }
//       },
//       customSubCheck: () => {
//         return {
//           s: false,
//           p: null,
//           timeTaken: 100,
//           updated: Date.now(),
//         }
//       },
//       customRegCheck: () => {
//         const start = Date.now()
//         const isLoggedIn = checkSession()
//         return Promise.resolve({
//           l: isLoggedIn,
//           timeTaken: Date.now() - start,
//           updated: Date.now(),
//         })
//       },
//     })
//   }
// }
// window.addEventListener('message', handleMessage, !1)

const listenCounterMag = arcEnv =>
  `"use strict";const arcEnv="${arcEnv}";function checkSession(){if("undefined"!=typeof window){var e=window.localStorage.getItem("ArcId.USER_PROFILE"),o=window.localStorage.getItem("ArcId.USER_INFO");if(e)return!("null"===e||"{}"===o)||!1}return!1}function handleMessage(e){const o="prod"===arcEnv?"https://mag.elcomercio.pe":"https://elcomercio-elcomerciomag-sandbox.cdn.arcpublishing.com";(e.origin===o&&e.data.match(/mag.elcomercio.pe/)||"https://especiales.elcomercio.pe"===e.origin&&e.data.match(/especiales.elcomercio.pe/))&&(window.console.log("entro URL => ",e.data),window.ArcP.run({paywallFunction:()=>{},customPageData:()=>({c:"story",s:"/counter/external",ci:e.data}),customSubCheck:()=>({s:!1,p:null,timeTaken:100,updated:Date.now()}),customRegCheck:()=>{const e=Date.now(),o=checkSession();return Promise.resolve({l:o,timeTaken:Date.now()-e,updated:Date.now()})}}))}window.addEventListener("message",handleMessage,!1);`

export default listenCounterMag
