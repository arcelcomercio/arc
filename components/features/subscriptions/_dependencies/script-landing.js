/*
window.addEventListener('DOMContentLoaded', () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)
  const buttonTop = document.getElementById('btn-arrow-top')
  const buttonCall = document.getElementById('btn-help-call')
  const btnSignwall = document.getElementById('btn-signwall')
  const allinput = document.querySelectorAll('.tab')
  const allPictures = document.querySelectorAll('.picture')
  const divBeneficios = document.getElementById('beneficios')
  const videoPlayer = document.getElementById('video')

  function updateBtnSignwall() {
    const PROFILE = window.Identity.userProfile
    if (!PROFILE) return
    const { firstName, lastName } = PROFILE || {}
    btnSignwall.innerHTML = `${firstName || 'Bienvenido Usuario'} ${
      lastName !== 'undefined' ? lastName : '' || ''
    }`
  }

  function activeButtonScroll() {
    const scrollCurrent =
      document.body.scrollTop || document.documentElement.scrollTop
    if (scrollCurrent > 150) {
      buttonTop.classList.add('active')
      buttonCall.classList.add('active')
      if (buttonCall.classList.contains('ges')) {
        buttonCall.classList.remove('ges')
      }
    } else {
      buttonTop.classList.remove('active')
      buttonCall.classList.remove('active')
      if (window.location.href.match(/gestion/)) {
        buttonCall.classList.add('ges')
      }
    }
  }

  function activeHeader() {
    const minScroll = isMobile ? 10 : 60
    const scrollDevice =
      document.body.scrollTop || document.documentElement.scrollTop
    if (scrollDevice > minScroll) {
      document.getElementById('header').classList.add('active')
    } else {
      document.getElementById('header').classList.remove('active')
    }
  }

  function callback(entries, observer) {
    if (entries[0].isIntersecting) {
      for (let i = 0; i < allinput.length; i++) {
        const tabCurrent = allinput[i].getAttribute('id')
        if (allinput[i].checked) {
          document
            .getElementById(`picture--${tabCurrent}`)
            .classList.add('move')
        }
      }
    } else {
      for (let j = 0; j < allinput.length; j++) {
        const tabCurrent = allinput[j].getAttribute('id')
        if (allinput[j].checked) {
          document
            .getElementById(`picture--${tabCurrent}`)
            .classList.remove('move')
        }
      }
    }
  }

  function callbackVideo(entries, observerVideo) {
    if (entries[0].isIntersecting) {
      videoPlayer.play()
    } else {
      videoPlayer.pause()
    }
  }

  window.onscroll = () => {
    activeHeader()
    activeButtonScroll()
  }

  window.onload = () => {
    updateBtnSignwall()

    buttonTop.addEventListener('click', () => {
      document.body.scrollTop = 0 // For Safari
      document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    })

    if (videoPlayer) {
      const optionsVideo = {
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.5,
      }
      const observerVideo = new window.IntersectionObserver(
        callbackVideo,
        optionsVideo
      )
      observerVideo.observe(videoPlayer)
    }

    if (divBeneficios) {
      const options = {
        rootMargin: '0px 0px 0px 0px',
        threshold: 0.5,
      }
      const observer = new window.IntersectionObserver(callback, options)
      observer.observe(divBeneficios)
    }

    for (let i = 0; i < allinput.length; i++) {
      allinput[i].addEventListener('change', e => {
        const tabCurrent = e.target.getAttribute('id')
        for (let j = 0; j < allPictures.length; j++) {
          allPictures[j].classList.remove('move')
        }
        document.getElementById(`picture--${tabCurrent}`).classList.add('move')
      })
    }
  }
})
*/

const scriptsLanding =
  '"use strict";window.addEventListener("DOMContentLoaded",function(){var e=/iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent),t=document.getElementById("btn-arrow-top"),n=document.getElementById("btn-help-call"),o=document.getElementById("btn-signwall"),c=document.querySelectorAll(".tab"),i=document.querySelectorAll(".picture"),d=document.getElementById("beneficios"),s=document.getElementById("video");function r(e,t){if(e[0].isIntersecting)for(var n=0;n<c.length;n++){var o=c[n].getAttribute("id");c[n].checked&&document.getElementById("picture--".concat(o)).classList.add("move")}else for(var i=0;i<c.length;i++){var d=c[i].getAttribute("id");c[i].checked&&document.getElementById("picture--".concat(d)).classList.remove("move")}}function a(e,t){e[0].isIntersecting?s.play():s.pause()}window.onscroll=function(){var o;o=e?10:60,(document.body.scrollTop||document.documentElement.scrollTop)>o?document.getElementById("header").classList.add("active"):document.getElementById("header").classList.remove("active"),(document.body.scrollTop||document.documentElement.scrollTop)>150?(t.classList.add("active"),n.classList.add("active"),n.classList.contains("ges")&&n.classList.remove("ges")):(t.classList.remove("active"),n.classList.remove("active"),window.location.href.match(/gestion/)&&n.classList.add("ges"))},window.onload=function(){if(function(){var e=window.Identity.userProfile;if(e){var t=e||{},n=t.firstName,c=t.lastName;o.innerHTML="".concat(n||"Bienvenido Usuario"," ").concat("undefined"!==c?c:"")}}(),t.addEventListener("click",function(){document.body.scrollTop=0,document.documentElement.scrollTop=0}),s){new window.IntersectionObserver(a,{rootMargin:"0px 0px 0px 0px",threshold:.5}).observe(s)}if(d){new window.IntersectionObserver(r,{rootMargin:"0px 0px 0px 0px",threshold:.5}).observe(d)}for(var e=0;e<c.length;e++)c[e].addEventListener("change",function(e){for(var t=e.target.getAttribute("id"),n=0;n<i.length;n++)i[n].classList.remove("move");document.getElementById("picture--".concat(t)).classList.add("move")})}});'
export default scriptsLanding
