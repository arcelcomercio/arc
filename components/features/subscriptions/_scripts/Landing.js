// document.addEventListener('DOMContentLoaded', () => {
//   setTimeout(() => {
//     const isMobile = /iPhone|iPad|iPod|Android/i.test(
//       window.navigator.userAgent
//     )
//     const buttonTop = document.getElementById('btn-arrow-top')
//     const buttonCall = document.getElementById('btn-help-call')
//     const btnSignwall = document.getElementById('btn-signwall')
//     const allinput = document.querySelectorAll('.tab')
//     const allPictures = document.querySelectorAll('.picture')
//     const divBeneficios = document.getElementById('beneficios')
//     const videoPlayer = document.getElementById('video')

//     const checkSession = () => {
//       if (typeof window !== 'undefined') {
//         const profileStorage = window.localStorage.getItem('ArcId.USER_PROFILE')
//         const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
//         if (profileStorage) {
//           return !(profileStorage === 'null' || sesionStorage === '{}') || false
//         }
//       }
//       return false
//     }

//     const cleanUserName = (firstName, lastName) => {
//       let fullName = 'Bienvenido Usuario'
//       const badName = /undefined|null/
//       if (
//         firstName &&
//         !firstName.match(badName) &&
//         lastName &&
//         !lastName.match(badName)
//       ) {
//         fullName = `${firstName} ${lastName}`
//       }
//       if (
//         firstName &&
//         !firstName.match(badName) &&
//         (!lastName || lastName.match(badName))
//       ) {
//         fullName = firstName
//       }
//       if (
//         lastName &&
//         !lastName.match(badName) &&
//         (!firstName || firstName.match(badName))
//       ) {
//         fullName = lastName
//       }
//       return fullName.length <= 20 ? fullName : `${fullName.slice(0, 20)}...`
//     }

//     function updateBtnSignwall() {
//       if (checkSession()) {
//         const userInfo =
//           window.JSON.parse(
//             window.localStorage.getItem('ArcId.USER_PROFILE')
//           ) || {}

//         const { firstName, lastName } = userInfo || {}
//         btnSignwall.innerHTML = cleanUserName(firstName, lastName)
//       }
//     }
//     updateBtnSignwall()

//     function activeButtonScroll() {
//       const scrollCurrent =
//         document.body.scrollTop || document.documentElement.scrollTop

//       if (scrollCurrent > 150) {
//         if (buttonTop) buttonTop.classList.add('active')
//         if (buttonCall) buttonCall.classList.add('active')
//         if (buttonCall && buttonCall.classList.contains('ges')) {
//           buttonCall.classList.remove('ges')
//         }
//       } else {
//         if (buttonTop) buttonTop.classList.remove('active')
//         if (buttonCall) buttonCall.classList.remove('active')
//         if (buttonCall && window.location.href.match(/gestion/)) {
//           buttonCall.classList.add('ges')
//         }
//       }
//     }

//     function activeHeader() {
//       const minScroll = isMobile ? 10 : 60
//       const scrollDevice =
//         document.body.scrollTop || document.documentElement.scrollTop
//       if (scrollDevice > minScroll) {
//         document.getElementById('header').classList.add('active')
//       } else {
//         document.getElementById('header').classList.remove('active')
//       }
//     }

//     function callback(entries, observer) {
//       if (entries[0].isIntersecting) {
//         for (let i = 0; i < allinput.length; i++) {
//           const tabCurrent = allinput[i].getAttribute('id')
//           if (allinput[i].checked) {
//             document
//               .getElementById(`picture--${tabCurrent}`)
//               .classList.add('move')
//           }
//         }
//       } else {
//         for (let j = 0; j < allinput.length; j++) {
//           const tabCurrent = allinput[j].getAttribute('id')
//           if (allinput[j].checked) {
//             document
//               .getElementById(`picture--${tabCurrent}`)
//               .classList.remove('move')
//           }
//         }
//       }
//     }

//     function callbackVideo(entries, observerVideo) {
//       if (entries[0].isIntersecting) {
//         videoPlayer.play()
//       } else {
//         videoPlayer.pause()
//       }
//     }

//     window.onscroll = () => {
//       activeHeader()
//       activeButtonScroll()
//     }

//     if (buttonTop) {
//       buttonTop.addEventListener('click', () => {
//         document.body.scrollTop = 0 // For Safari
//         document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
//       })
//     }

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

//     if (divBeneficios) {
//       const options = {
//         rootMargin: '0px 0px 0px 0px',
//         threshold: 0.5,
//       }
//       const observer = new window.IntersectionObserver(callback, options)
//       observer.observe(divBeneficios)
//     }

//     for (let i = 0; i < allinput.length; i++) {
//       allinput[i].addEventListener('change', e => {
//         const tabCurrent = e.target.getAttribute('id')
//         for (let j = 0; j < allPictures.length; j++) {
//           allPictures[j].classList.remove('move')
//         }
//         document.getElementById(`picture--${tabCurrent}`).classList.add('move')
//       })
//     }
//   }, 1000)
// })

const scriptsLanding =
  '"use strict";document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){var e,t,n,o,c,d,i,s=/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent),r=document.getElementById("btn-arrow-top"),a=document.getElementById("btn-help-call"),l=document.getElementById("btn-signwall"),m=document.querySelectorAll(".tab"),u=document.querySelectorAll(".picture"),g=document.getElementById("beneficios"),v=document.getElementById("video");!function(){if("undefined"!=typeof window){var e=window.localStorage.getItem("ArcId.USER_PROFILE"),t=window.localStorage.getItem("ArcId.USER_INFO");if(e)return!("null"===e||"{}"===t)||!1}return!1}()||(t=(e=window.JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE"))||{}||{}).firstName,n=e.lastName,l.innerHTML=(c=n,d="Bienvenido Usuario",i=/undefined|null/,(o=t)&&!o.match(i)&&c&&!c.match(i)&&(d="".concat(o," ").concat(c)),!o||o.match(i)||c&&!c.match(i)||(d=o),!c||c.match(i)||o&&!o.match(i)||(d=c),d.length<=20?d:"".concat(d.slice(0,20),"..."))),window.onscroll=function(){(s?10:60)<(document.body.scrollTop||document.documentElement.scrollTop)?document.getElementById("header").classList.add("active"):document.getElementById("header").classList.remove("active"),150<(document.body.scrollTop||document.documentElement.scrollTop)?(r&&r.classList.add("active"),a&&a.classList.add("active"),a&&a.classList.contains("ges")&&a.classList.remove("ges")):(r&&r.classList.remove("active"),a&&a.classList.remove("active"),a&&window.location.href.match(/gestion/)&&a.classList.add("ges"))},r&&r.addEventListener("click",function(){document.body.scrollTop=0,document.documentElement.scrollTop=0}),v&&new window.IntersectionObserver(function(e,t){e[0].isIntersecting?v.play():v.pause()},{rootMargin:"0px 0px 0px 0px",threshold:.5}).observe(v),g&&new window.IntersectionObserver(function(e,t){if(e[0].isIntersecting)for(var n=0;n<m.length;n++){var o=m[n].getAttribute("id");m[n].checked&&document.getElementById("picture--".concat(o)).classList.add("move")}else for(var c=0;c<m.length;c++){var d=m[c].getAttribute("id");m[c].checked&&document.getElementById("picture--".concat(d)).classList.remove("move")}},{rootMargin:"0px 0px 0px 0px",threshold:.5}).observe(g);for(var h=0;h<m.length;h++)m[h].addEventListener("change",function(e){for(var t=e.target.getAttribute("id"),n=0;n<u.length;n++)u[n].classList.remove("move");document.getElementById("picture--".concat(t)).classList.add("move")})},1e3)});'
export default scriptsLanding
