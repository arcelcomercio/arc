// document.addEventListener('DOMContentLoaded', () => {
//   setTimeout(() => {
//     const isIPhone = /iPhone/i.test(window.navigator.userAgent)
//     const buttonTop = document.getElementById('btn-arrow-top')

//     const controlVideo = () => {
//       const videoPlayer = document.getElementById('video')
//       let playingVideo = false
//       function callbackVideo(entries, observerVideo) {
//         if (entries[0].isIntersecting) {
//           if (
//             videoPlayer.readyState >= 2 &&
//             !videoPlayer.ended &&
//             (videoPlayer.paused || videoPlayer.currentTime === 0)
//           ) {
//             videoPlayer.play()
//             playingVideo = true
//           }
//         } else if (playingVideo) {
//           videoPlayer.pause()
//         }
//       }

//       if (videoPlayer) {
//         const optionsVideo = {
//           rootMargin: '0px 0px 0px 0px',
//           threshold: 0.5,
//         }
//         const observerVideo = new window.IntersectionObserver(
//           callbackVideo,
//           optionsVideo
//         )
//         observerVideo.observe(videoPlayer)
//       }
//     }

//     const controlSlider = () => {
//       const divBeneficios = document.getElementById('beneficios')
//       const allinput = divBeneficios.querySelectorAll('.tab')
//       const allPictures = divBeneficios.querySelectorAll('.picture')

//       for (let i = 0; i < allinput.length; i++) {
//         allinput[i].addEventListener('change', (e) => {
//           const tabCurrent = e.target.getAttribute('id')
//           for (let j = 0; j < allPictures.length; j++) {
//             allPictures[j].classList.remove('move')
//           }
//           document
//             .getElementById(`picture--${tabCurrent}`)
//             .classList.add('move')
//         })
//       }
//     }

//     const checkSession = () => {
//       let hasSession = false
//       try {
//         const profileStorage = window.localStorage.getItem('ArcId.USER_PROFILE')
//         const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
//         if (profileStorage) {
//           hasSession =
//             !(profileStorage === 'null' || sesionStorage === '{}') || false
//         }
//       } catch (e) {
//         console.warn('localStorage no está disponible')
//       }
//       return hasSession
//     }

//     const cleanUserName = (firstName, lastName) => {
//       let fullName = 'Bienvenido Usuario'
//       const badName = /undefined|null/
//       const isBadFirstName = badName.test(firstName)
//       const isBadLastName = badName.test(lastName)

//       if (firstName && !isBadFirstName && lastName && !isBadLastName) {
//         fullName = `${firstName} ${lastName}`
//       } else if (firstName && !isBadFirstName && (!lastName || isBadLastName)) {
//         fullName = firstName
//       } else if (lastName && !isBadLastName && (!firstName || isBadFirstName)) {
//         fullName = lastName
//       }

//       return fullName.length <= 17 ? fullName : `${fullName.slice(0, 17)}...`
//     }

//     const updateBtnSignwall = () => {
//       const btnSignwall = document.getElementById('btn-signwall')
//       if (checkSession() && btnSignwall) {
//         const userInfo = window.JSON.parse(
//           window.localStorage.getItem('ArcId.USER_PROFILE') || '{}'
//         )
//         const { firstName, lastName } = userInfo || {}
//         btnSignwall.innerHTML = cleanUserName(firstName, lastName)
//       }
//     }

//     const activeButtonScroll = () => {
//       if (buttonTop) {
//         if (
//           document.body.scrollTop ||
//           document.documentElement.scrollTop > 150
//         ) {
//           buttonTop.classList.add('active')
//         } else {
//           buttonTop.classList.remove('active')
//         }
//       }
//     }

//     window.onscroll = () => {
//       activeButtonScroll()
//     }

//     setTimeout(() => {
//       updateBtnSignwall()
//       controlSlider()
//       if (buttonTop) {
//         buttonTop.addEventListener('click', () => {
//           document.body.scrollTop = 0 // For Safari
//           document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
//         })
//       }
//       if (!isIPhone && 'IntersectionObserver' in window) {
//         controlVideo()
//       }
//     }, 1)
//   }, 2000)
// })

const scriptsLanding =
  '"use strict";document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){var e=/iPhone/i.test(window.navigator.userAgent),t=document.getElementById("btn-arrow-top"),n=function(){var e=document.getElementById("btn-signwall");if(function(){var e=!1;try{var t=window.localStorage.getItem("ArcId.USER_PROFILE"),n=window.localStorage.getItem("ArcId.USER_INFO");t&&(e=!("null"===t||"{}"===n)||!1)}catch(e){console.warn("localStorage no está disponible")}return e}()&&e){var t=window.JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE")||"{}")||{},n=t.firstName,o=t.lastName;e.innerHTML=function(e,t){var n="Bienvenido Usuario",o=/undefined|null/,c=o.test(e),r=o.test(t);return e&&!c&&t&&!r?n="".concat(e," ").concat(t):!e||c||t&&!r?!t||r||e&&!c||(n=t):n=e,n.length<=17?n:"".concat(n.slice(0,17),"...")}(n,o)}};window.onscroll=function(){t&&(document.body.scrollTop||document.documentElement.scrollTop>150?t.classList.add("active"):t.classList.remove("active"))},setTimeout(function(){n(),function(){for(var e=document.getElementById("beneficios"),t=e.querySelectorAll(".tab"),n=e.querySelectorAll(".picture"),o=0;o<t.length;o++)t[o].addEventListener("change",function(e){for(var t=e.target.getAttribute("id"),o=0;o<n.length;o++)n[o].classList.remove("move");document.getElementById("picture--".concat(t)).classList.add("move")})}(),t&&t.addEventListener("click",function(){document.body.scrollTop=0,document.documentElement.scrollTop=0}),!e&&"IntersectionObserver"in window&&function(){var e=document.getElementById("video"),t=!1;e&&new window.IntersectionObserver(function(n,o){n[0].isIntersecting?e.readyState>=2&&!e.ended&&(e.paused||0===e.currentTime)&&(e.play(),t=!0):t&&e.pause()},{rootMargin:"0px 0px 0px 0px",threshold:.5}).observe(e)}()},1)},2e3)});'
export default scriptsLanding
