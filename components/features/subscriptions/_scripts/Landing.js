// document.addEventListener('DOMContentLoaded', () => {
//   const controlVideo = () => {
//     const videoPlayer = document.getElementById('video')
//     let playingVideo = false
//     function callbackVideo(entries, observerVideo) {
//       if (entries[0].isIntersecting) {
//         if (
//           videoPlayer.readyState >= 2 &&
//           !videoPlayer.ended &&
//           (videoPlayer.paused || videoPlayer.currentTime === 0)
//         ) {
//           videoPlayer.play()
//           playingVideo = true
//         }
//       } else if (playingVideo) {
//         videoPlayer.pause()
//       }
//     }

//     // iPhones tienen reestricciones con el autoplay
//     if (videoPlayer) {
//       const optionsVideo = {
//         rootMargin: '0px 0px 0px 0px',
//         threshold: 0.5,
//       }
//       const observerVideo = new window.IntersectionObserver(
//         callbackVideo,
//         optionsVideo
//       )
//       observerVideo.observe(videoPlayer)
//     }
//   }

//   const controlSlider = () => {
//     const divBeneficios = document.getElementById('beneficios')
//     const allinput = divBeneficios.querySelectorAll('.tab')
//     const allPictures = divBeneficios.querySelectorAll('.picture')

//     for (let i = 0; i < allinput.length; i++) {
//       allinput[i].addEventListener('change', (e) => {
//         const tabCurrent = e.target.getAttribute('id')
//         for (let j = 0; j < allPictures.length; j++) {
//           allPictures[j].classList.remove('move')
//         }
//         document.getElementById(`picture--${tabCurrent}`).classList.add('move')
//       })
//     }
//   }

//   const checkSession = () => {
//     let hasSession = false
//     try {
//       const profileStorage = window.localStorage.getItem('ArcId.USER_PROFILE')
//       const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
//       if (profileStorage) {
//         hasSession =
//           !(profileStorage === 'null' || sesionStorage === '{}') || false
//       }
//     } catch (e) {
//       console.warn('localStorage no está disponible')
//     }
//     return hasSession
//   }

//   const cleanUserName = (firstName, lastName) => {
//     let fullName = 'Bienvenido Usuario'
//     const badName = /undefined|null/
//     const isBadFirstName = badName.test(firstName)
//     const isBadLastName = badName.test(lastName)

//     if (firstName && !isBadFirstName && lastName && !isBadLastName) {
//       fullName = `${firstName} ${lastName}`
//     } else if (firstName && !isBadFirstName && (!lastName || isBadLastName)) {
//       fullName = firstName
//     } else if (lastName && !isBadLastName && (!firstName || isBadFirstName)) {
//       fullName = lastName
//     }

//     return fullName.length <= 17 ? fullName : `${fullName.slice(0, 17)}...`
//   }

//   function updateBtnSignwall() {
//     const btnSignwall = document.getElementById('btn-signwall')
//     if (checkSession() && btnSignwall) {
//       const userInfo = window.JSON.parse(
//         window.localStorage.getItem('ArcId.USER_PROFILE') || '{}'
//       )
//       const { firstName, lastName } = userInfo || {}
//       btnSignwall.innerHTML = cleanUserName(firstName, lastName)
//     }
//   }

//   const isIPhone = /iPhone/i.test(window.navigator.userAgent)
//   const isMobile =
//     isIPhone || /iPad|iPod|Android/i.test(window.navigator.userAgent)

//   const buttonTop = document.getElementById('btn-arrow-top')
//   const buttonCall = document.getElementById('btn-help-call')
//   const header = document.getElementById('header')
//   const divCallIn = document.getElementById('callin')

//   const minScroll = isMobile ? 10 : 60

//   function deviceScroll() {
//     return document.body.scrollTop || document.documentElement.scrollTop
//   }

//   function activeButtonScroll() {
//     if (deviceScroll() > 150) {
//       if (buttonTop) buttonTop.classList.add('active')
//       if (buttonCall) buttonCall.classList.add('active')
//       if (buttonCall && buttonCall.classList.contains('ges')) {
//         buttonCall.classList.remove('ges')
//       }
//     } else {
//       if (buttonTop) buttonTop.classList.remove('active')
//       if (buttonCall) buttonCall.classList.remove('active')
//       if (buttonCall && /gestion/.test(window.location.href)) {
//         buttonCall.classList.add('ges')
//       }
//     }
//   }

//   function activeHeader() {
//     if (header) {
//       if (deviceScroll() > minScroll) {
//         header.classList.add('active')
//       } else {
//         header.classList.remove('active')
//       }
//     }
//   }

//   function activeCallIn() {
//     if (divCallIn) {
//       if (deviceScroll() > minScroll) {
//         divCallIn.classList.add('active')
//       } else {
//         divCallIn.classList.remove('active')
//       }
//     }
//   }

//   setTimeout(() => {
//     window.onscroll = () => {
//       activeHeader()
//       activeCallIn()
//       activeButtonScroll()
//     }
//   }, 1)

//   setTimeout(() => updateBtnSignwall(), 1000)

//   setTimeout(() => {
//     if (buttonTop) {
//       buttonTop.addEventListener('click', () => {
//         document.body.scrollTop = 0 // For Safari
//         document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
//       })
//     }
//   }, 1)

//   setTimeout(() => controlSlider(), 1)

//   if (!isIPhone) {
//     setTimeout(() => controlVideo(), 1)
//   }
// })

const scriptsLanding =
  '"use strict";document.addEventListener("DOMContentLoaded",function(){var e=function(){var e=!1;try{var t=window.localStorage.getItem("ArcId.USER_PROFILE"),n=window.localStorage.getItem("ArcId.USER_INFO");t&&(e=!("null"===t||"{}"===n)||!1)}catch(e){console.warn("localStorage no está disponible")}return e},t=function(e,t){var n="Bienvenido Usuario",o=/undefined|null/,c=o.test(e),i=o.test(t);return e&&!c&&t&&!i?n="".concat(e," ").concat(t):!e||c||t&&!i?!t||i||e&&!c||(n=t):n=e,n.length<=17?n:"".concat(n.slice(0,17),"...")};var n=/iPhone/i.test(window.navigator.userAgent),o=n||/iPad|iPod|Android/i.test(window.navigator.userAgent),c=document.getElementById("btn-arrow-top"),i=document.getElementById("btn-help-call"),s=document.getElementById("header"),a=document.getElementById("callin"),r=o?10:60;function d(){return document.body.scrollTop||document.documentElement.scrollTop}setTimeout(function(){window.onscroll=function(){s&&(d()>r?s.classList.add("active"):s.classList.remove("active")),a&&(d()>r?a.classList.add("active"):a.classList.remove("active")),d()>150?(c&&c.classList.add("active"),i&&i.classList.add("active"),i&&i.classList.contains("ges")&&i.classList.remove("ges")):(c&&c.classList.remove("active"),i&&i.classList.remove("active"),i&&/gestion/.test(window.location.href)&&i.classList.add("ges"))}},1),setTimeout(function(){return function(){var n=document.getElementById("btn-signwall");if(e()&&n){var o=window.JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE")||"{}")||{},c=o.firstName,i=o.lastName;n.innerHTML=t(c,i)}}()},1000),setTimeout(function(){c&&c.addEventListener("click",function(){document.body.scrollTop=0,document.documentElement.scrollTop=0})},1),setTimeout(function(){return function(){for(var e=document.getElementById("beneficios"),t=e.querySelectorAll(".tab"),n=e.querySelectorAll(".picture"),o=0;o<t.length;o++)t[o].addEventListener("change",function(e){for(var t=e.target.getAttribute("id"),o=0;o<n.length;o++)n[o].classList.remove("move");document.getElementById("picture--".concat(t)).classList.add("move")})}()},1),n||setTimeout(function(){return function(){var e=document.getElementById("video"),t=!1;e&&new window.IntersectionObserver(function(n,o){n[0].isIntersecting?e.readyState>=2&&!e.ended&&(e.paused||0===e.currentTime)&&(e.play(),t=!0):t&&e.pause()},{rootMargin:"0px 0px 0px 0px",threshold:.5}).observe(e)}()},1)});'
export default scriptsLanding
