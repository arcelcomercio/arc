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
//         const profileStorage =
//           window.localStorage.getItem('ArcId.USER_PROFILE') ||
//           window.sessionStorage.getItem('ArcId.USER_PROFILE')

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

//     updateBtnSignwall()

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
//   }, 0)
// })

const scriptsLanding =
  '"use strict";document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){var e=/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent),t=document.getElementById("btn-arrow-top"),n=document.getElementById("btn-help-call"),o=document.getElementById("btn-signwall"),c=document.querySelectorAll(".tab"),i=document.querySelectorAll(".picture"),d=document.getElementById("beneficios"),r=document.getElementById("video"),s=function(){if("undefined"!=typeof window){var e=window.localStorage.getItem("ArcId.USER_PROFILE")||window.sessionStorage.getItem("ArcId.USER_PROFILE"),t=window.localStorage.getItem("ArcId.USER_INFO");if(e)return!("null"===e||"{}"===t)||!1}return!1},a=function(e,t){var n="Bienvenido Usuario",o=/undefined|null/;return e&&!e.match(o)&&t&&!t.match(o)&&(n="".concat(e," ").concat(t)),!e||e.match(o)||t&&!t.match(o)||(n=e),!t||t.match(o)||e&&!e.match(o)||(n=t),n.length<=20?n:"".concat(n.slice(0,20),"...")};if(window.onscroll=function(){var o;o=e?10:60,(document.body.scrollTop||document.documentElement.scrollTop)>o?document.getElementById("header").classList.add("active"):document.getElementById("header").classList.remove("active"),(document.body.scrollTop||document.documentElement.scrollTop)>150?(t&&t.classList.add("active"),n&&n.classList.add("active"),n&&n.classList.contains("ges")&&n.classList.remove("ges")):(t&&t.classList.remove("active"),n&&n.classList.remove("active"),n&&window.location.href.match(/gestion/)&&n.classList.add("ges"))},function(){if(s()){var e=window.JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE"))||{}||{},t=e.firstName,n=e.lastName;o.innerHTML=a(t,n)}}(),t&&t.addEventListener("click",function(){document.body.scrollTop=0,document.documentElement.scrollTop=0}),r){new window.IntersectionObserver(function(e,t){e[0].isIntersecting?r.play():r.pause()},{rootMargin:"0px 0px 0px 0px",threshold:.5}).observe(r)}if(d){new window.IntersectionObserver(function(e,t){if(e[0].isIntersecting)for(var n=0;n<c.length;n++){var o=c[n].getAttribute("id");c[n].checked&&document.getElementById("picture--".concat(o)).classList.add("move")}else for(var i=0;i<c.length;i++){var d=c[i].getAttribute("id");c[i].checked&&document.getElementById("picture--".concat(d)).classList.remove("move")}},{rootMargin:"0px 0px 0px 0px",threshold:.5}).observe(d)}for(var l=0;l<c.length;l++)c[l].addEventListener("change",function(e){for(var t=e.target.getAttribute("id"),n=0;n<i.length;n++)i[n].classList.remove("move");document.getElementById("picture--".concat(t)).classList.add("move")})},0)});'
export default scriptsLanding
