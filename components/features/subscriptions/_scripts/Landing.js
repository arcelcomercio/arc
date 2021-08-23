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
  '"use strict";document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){var e=/iPhone/i.test(window.navigator.userAgent),t=document.getElementById("btn-arrow-top");window.onscroll=function(){t&&(document.body.scrollTop||document.documentElement.scrollTop>150?t.classList.add("active"):t.classList.remove("active"))},setTimeout(function(){var n;(n=document.getElementById("beneficios"))&&function(){for(var e=n.querySelectorAll(".tab"),t=n.querySelectorAll(".picture"),o=0;o<e.length;o++)e[o].addEventListener("change",function(e){for(var n=e.target.getAttribute("id"),o=0;o<t.length;o++)t[o].classList.remove("move");document.getElementById("picture--".concat(n)).classList.add("move")})}(),t&&t.addEventListener("click",function(){document.body.scrollTop=0,document.documentElement.scrollTop=0}),!e&&"IntersectionObserver"in window&&function(){var e=document.getElementById("video"),t=!1;e&&new window.IntersectionObserver(function(n,o){n[0].isIntersecting?e.readyState>=2&&!e.ended&&(e.paused||0===e.currentTime)&&(e.play(),t=!0):t&&e.pause()},{rootMargin:"0px 0px 0px 0px",threshold:.5}).observe(e)}()},1)},2e3)});'
export default scriptsLanding
