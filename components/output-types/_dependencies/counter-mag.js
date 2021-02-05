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
//     console.log('entro URL => ', e.data)
//     ArcP.run({
//       paywallFunction: function(e) {},
//       customPageData: function() {
//         return { c: 'story', s: '/counter/external', ci: e.data }
//       },
//       customSubCheck: function() {
//         return Promise.resolve({
//           s: !1,
//           p: [],
//           timeTaken: 100,
//           updated: Date.now(),
//         })
//       },
//       customRegCheck: function() {
//         var e = Date.now(),
//           n = checkSession()
//         return Promise.resolve({ l: n, timeTaken: Date.now() - e })
//       },
//     })
//   }
// }
// window.addEventListener('message', handleMessage, !1)

const listenCounterMag = arcEnv =>
  `"use strict";var arcEnv="${arcEnv}";function checkSession(){if("undefined"!=typeof window){var e=window.localStorage.getItem("ArcId.USER_PROFILE"),o=window.localStorage.getItem("ArcId.USER_INFO");if(e)return!("null"===e||"{}"===o)||!1}return!1}function handleMessage(e){var o="prod"===arcEnv?"https://mag.elcomercio.pe":"https://elcomercio-elcomerciomag-sandbox.cdn.arcpublishing.com";(e.origin===o&&e.data.match(/mag.elcomercio.pe/)||"https://especiales.elcomercio.pe"===e.origin&&e.data.match(/especiales.elcomercio.pe/))&&(console.log("entro URL => ",e.data),ArcP.run({paywallFunction:function(e){},customPageData:function(){return{c:"story",s:"/counter/external",ci:e.data}},customSubCheck:function(){return Promise.resolve({s:!1,p:[],timeTaken:100,updated:Date.now()})},customRegCheck:function(){var e=Date.now(),o=checkSession();return Promise.resolve({l:o,timeTaken:Date.now()-e})}}))}window.addEventListener("message",handleMessage,!1);`

export default listenCounterMag
