/*
  const videoObserver = (entries, observer) => {
  entries.forEach(entry => {
    const { isIntersecting, target } = entry
    if (isIntersecting) {
      const preroll = target.getAttribute('data-preroll')
      target.classList.add("powa")
      target.classList.remove("powa-lazy")

      if (window.powaBoot) {
        window.preroll = preroll
        window.PoWaSettings.advertising = {
          adBar: false,
          adTag: preroll || "",
        }
        requestIdle(()=>window.powaBoot())
      }
      observer.unobserve(target)
    }
  })
}

window.addEventListener("load", () => {
  requestIdle(()=> {
    if ('IntersectionObserver' in window) {
      const options = {
        rootMargin: '0px',
      }
      const videos = Array.from(document.querySelectorAll('.powa-lazy'))
      const observer = new IntersectionObserver(videoObserver, options)
      videos.forEach(video => {
          observer.observe(video)
          
      })
    }
  })
})
*/
const videoScript = `"use strict";var videoObserver=function(e,r){e.forEach(function(e){var o=e.isIntersecting,t=e.target;if(o){var n=t.getAttribute("data-preroll");t.classList.add("powa"),t.classList.remove("powa-lazy"),window.powaBoot&&(window.preroll=n,window.PoWaSettings.advertising={adBar:!1,adTag:n||""},requestIdle(function(){return window.powaBoot()})),r.unobserve(t)}})};window.addEventListener("load",function(){requestIdle(function(){if("IntersectionObserver"in window){var e=Array.from(document.querySelectorAll(".powa-lazy")),r=new IntersectionObserver(videoObserver,{rootMargin:"0px"});e.forEach(function(e){r.observe(e)})}})});`

export default videoScript
