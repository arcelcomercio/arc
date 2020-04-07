/*
 const videoObserver = (entries, observer) => {
  entries.forEach(entry => {
    const { isIntersecting, target } = entry
    if (isIntersecting) {
      const uuid = target.getAttribute('data-uuid')
      const preroll = target.getAttribute('data-preroll')
      const api = target.getAttribute('data-api')
      const poster = target.getAttribute('data-poster')
      const streams = target.getAttribute('data-streams')
      const reziser = target.getAttribute('data-reziser')
      const dataVideo = '<div class="powa" id="powa-{uuid}" data-sticky=true data-org="elcomercio" data-env="qqq" data-stream="{stream}" data-uuid="{uuid}" data-aspect-ratio="0.562" data-api="qqq" data-preload=none ></div>'
      target.innerHTML = dataVideo.replace(/{uuid}/mg,uuid).replace(/{stream}/mg,streams)
      if (window.powaBoot) window.powaBoot()
      setTimeout(function(){  
        if (window.PoWaSettings) {
          window.preroll = preroll
          window.PoWaSettings.advertising = {
            adBar: false,
            adTag: preroll,
          }
        }
      }, 1000);
      window.addEventListener('powaRender',
        function () {
          Array.from(document.getElementsByClassName('s-multimedia__p-default')).forEach(function (contShare) {
            contShare.classList.remove("s-multimedia__p-default")
        });
        }
     )
      observer.unobserve(target)
    }
  })
}
setTimeout(()=> {
  if ('IntersectionObserver' in window) {
    const options = {
      rootMargin: '0px 0px 0px 0px',
    }
    const videosc = Array.from(document.querySelectorAll('.s-multimedia__lL-video'))
    const videos = Array.from(document.querySelectorAll('.story-contents__lL-video')).concat(videosc)
    videos.forEach(video => {
        const observer = new IntersectionObserver(videoObserver, options)
        observer.observe(video)
    })
  }
}, 0)
*/
const videoScript = env => `
"use strict";var videoObserver=function(t,e){t.forEach(function(t){var a=t.isIntersecting,r=t.target;if(a){var i=r.getAttribute("data-uuid"),o=r.getAttribute("data-preroll"),n=(r.getAttribute("data-api"),r.getAttribute("data-poster"),r.getAttribute("data-streams"));r.getAttribute("data-reziser");r.innerHTML='<div class="powa" id="powa-{uuid}" data-sticky=true data-org="elcomercio" data-env="${env}" data-stream="{stream}" data-uuid="{uuid}" data-aspect-ratio="0.562" data-api="${env}" data-preload=none ></div>'.replace(/{uuid}/gm,i).replace(/{stream}/gm,n),window.powaBoot&&window.powaBoot(),setTimeout(function(){window.PoWaSettings&&(window.preroll=o,window.PoWaSettings.advertising={adBar:!1,adTag:o})},1e3),window.addEventListener("powaRender",function(){Array.from(document.getElementsByClassName("s-multimedia__p-default")).forEach(function(t){t.classList.remove("s-multimedia__p-default")})}),e.unobserve(r)}})};setTimeout(function(){if("IntersectionObserver"in window){var t={rootMargin:"0px 0px 0px 0px"},e=Array.from(document.querySelectorAll(".s-multimedia__lL-video"));Array.from(document.querySelectorAll(".story-contents__lL-video")).concat(e).forEach(function(e){new IntersectionObserver(videoObserver,t).observe(e)})}},0);
`

export default videoScript
