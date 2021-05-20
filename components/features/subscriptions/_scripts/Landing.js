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
//       if (divBeneficios) {
//         const allinput = divBeneficios.querySelectorAll('.tab')
//         const allPictures = divBeneficios.querySelectorAll('.picture')

//         for (let i = 0; i < allinput.length; i++) {
//           allinput[i].addEventListener('change', (e) => {
//             const tabCurrent = e.target.getAttribute('id')
//             for (let j = 0; j < allPictures.length; j++) {
//               allPictures[j].classList.remove('move')
//             }
//             document
//               .getElementById(`picture--${tabCurrent}`)
//               .classList.add('move')
//           })
//         }
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
  '"use strict";document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){function e(){var n=document.getElementById("video"),o=!1;n&&new window.IntersectionObserver(function(e,t){e[0].isIntersecting?2<=n.readyState&&!n.ended&&(n.paused||0===n.currentTime)&&(n.play(),o=!0):o&&n.pause()},{rootMargin:"0px 0px 0px 0px",threshold:.5}).observe(n)}function t(){var o=document.getElementById("beneficios");o&&function(){for(var e=o.querySelectorAll(".tab"),n=o.querySelectorAll(".picture"),t=0;t<e.length;t++)e[t].addEventListener("change",function(e){for(var e=e.target.getAttribute("id"),t=0;t<n.length;t++)n[t].classList.remove("move");document.getElementById("picture--"+e).classList.add("move")})}()}function n(){var e,t,n,o,r=document.getElementById("btn-signwall");(function(){var e=!1;try{var t=window.localStorage.getItem("ArcId.USER_PROFILE"),n=window.localStorage.getItem("ArcId.USER_INFO");t&&(e=!("null"===t||"{}"===n)||!1)}catch(e){console.warn("localStorage no está disponible")}return e})()&&r&&(o=(n=window.JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE")||"{}")||{}).firstName,e=n.lastName,r.innerHTML=(t=e,n="Bienvenido Usuario",o=(r=/undefined|null/).test(e=o),r=r.test(t),e&&!o&&t&&!r?n=e+" "+t:!e||o||t&&!r?!t||r||e&&!o||(n=t):n=e,n.length<=17?n:n.slice(0,17)+"..."))}var o=/iPhone/i.test(window.navigator.userAgent),r=document.getElementById("btn-arrow-top");window.onscroll=function(){r&&(document.body.scrollTop||150<document.documentElement.scrollTop?r.classList.add("active"):r.classList.remove("active"))},setTimeout(function(){n(),t(),r&&r.addEventListener("click",function(){document.body.scrollTop=0,document.documentElement.scrollTop=0}),!o&&"IntersectionObserver"in window&&e()},1)},2e3)});'
export default scriptsLanding
