// 'use strict'
// const arcEnv = '${arcEnv}'
// const arcSite = '${arcSite}'

// const checkSession = () => {
//   if (typeof window !== 'undefined') {
//     const profileStorage = window.localStorage.getItem('ArcId.USER_PROFILE')
//     const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
//     if (profileStorage) {
//       return !(profileStorage === 'null' || sesionStorage === '{}') || false
//     }
//   }
//   return false
// }

// const postExtendSession = oldToken => {
//   const response = new Promise(resolve => {
//     fetch(
//       "https://api${arcEnv === 'sandbox' ? '-sandbox' : ''}.${arcSite}.pe/identity/public/v1/auth/token",
//       {
//         method: 'POST',
//         body: JSON.stringify({
//           grantType: 'refresh-token',
//           token: oldToken,
//         }),
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }
//     ).then(res => resolve(res.json()))
//   })
//   return response
// }

// const getEntitlement = newToken => {
//   const response = new Promise(resolve => {
//     fetch(
//       "https://api${arcEnv === 'sandbox' ? '-sandbox' : ''}.${arcSite}.pe/sales/public/v1/entitlements",
//       {
//         method: 'GET',
//         headers: {
//           Authorization: newToken,
//         },
//       }
//     ).then(res => resolve(res.json()))
//   })
//   return response
// }

// const getListSubs = oldRefreshToken => {
//   return postExtendSession(oldRefreshToken).then(resExt => {
//     const checkEntitlement = getEntitlement(resExt.accessToken)
//       .then(res => {
//         if (res.skus) {
//           const result = Object.keys(res.skus).map(key => {
//             return res.skus[key].sku
//           })
//           return result
//         }
//         return []
//       })
//       .catch(err => window.console.error(err))

//     return checkEntitlement
//   })
// }

// const handleMessage = e => {
//   const originDomainMag =
//     arcEnv === 'prod'
//       ? 'https://mag.elcomercio.pe'
//       : 'https://elcomercio-elcomerciomag-sandbox.cdn.arcpublishing.com'
//   const pathCompareMag = /mag.elcomercio.pe/

//   const originDomainSpecial = 'https://especiales.elcomercio.pe'
//   const pathCompareSpecial = /especiales.elcomercio.pe/

//   const userInfo =
//     window.JSON.parse(window.localStorage.getItem('ArcId.USER_INFO')) || {}

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
//       userName: userInfo.uuid || null,
//       jwt: userInfo.accessToken || null,
//       apiOrigin:
//         "https://api${arcEnv === 'sandbox' ? '-sandbox' : ''}.${arcSite}.pe",
//       customSubCheck: () => {
//         if (userInfo.accessToken) {
//           return getListSubs(userInfo.refreshToken).then(p => {
//             const isLoggedInSubs = checkSession()
//             return {
//               s: isLoggedInSubs,
//               p: p || null,
//               timeTaken: 100,
//               updated: Date.now(),
//             }
//           })
//         }
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

const listenCounterMag = (arcEnv, arcSite) =>
  `"use strict";var arcEnv="${arcEnv}",arcSite="${arcSite}",checkSession=function(){if("undefined"!=typeof window){var e=window.localStorage.getItem("ArcId.USER_PROFILE"),n=window.localStorage.getItem("ArcId.USER_INFO");if(e)return!("null"===e||"{}"===n)||!1}return!1},postExtendSession=function(e){return new Promise(function(n){fetch("https://api${
    arcEnv === 'sandbox' ? '-sandbox' : ''
  }.${arcSite}.pe/identity/public/v1/auth/token",{method:"POST",body:JSON.stringify({grantType:"refresh-token",token:e}),headers:{"Content-Type":"application/json"}}).then(function(e){return n(e.json())})})},getEntitlement=function(e){return new Promise(function(n){fetch("https://api${
    arcEnv === 'sandbox' ? '-sandbox' : ''
  }.${arcSite}.pe/sales/public/v1/entitlements",{method:"GET",headers:{Authorization:e}}).then(function(e){return n(e.json())})})},getListSubs=function(e){return postExtendSession(e).then(function(e){return getEntitlement(e.accessToken).then(function(e){return e.skus?Object.keys(e.skus).map(function(n){return e.skus[n].sku}):[]}).catch(function(e){return window.console.error(e)})})},handleMessage=function(e){var n="prod"===arcEnv?"https://mag.elcomercio.pe":"https://elcomercio-elcomerciomag-sandbox.cdn.arcpublishing.com",t=window.JSON.parse(window.localStorage.getItem("ArcId.USER_INFO"))||{};(e.origin===n&&e.data.match(/mag.elcomercio.pe/)||"https://especiales.elcomercio.pe"===e.origin&&e.data.match(/especiales.elcomercio.pe/))&&(window.console.log("entro URL => ",e.data),window.ArcP.run({paywallFunction:function(){},customPageData:function(){return{c:"story",s:"/counter/external",ci:e.data}},userName:t.uuid||null,jwt:t.accessToken||null,apiOrigin:"https://api${
    arcEnv === 'sandbox' ? '-sandbox' : ''
  }.${arcSite}.pe",customSubCheck:function(){return t.accessToken?getListSubs(t.refreshToken).then(function(e){return{s:checkSession(),p:e||null,timeTaken:100,updated:Date.now()}}):{s:!1,p:null,timeTaken:100,updated:Date.now()}},customRegCheck:function(){var e=Date.now(),n=checkSession();return Promise.resolve({l:n,timeTaken:Date.now()-e,updated:Date.now()})}}))};window.addEventListener("message",handleMessage,!1);`

export default listenCounterMag
