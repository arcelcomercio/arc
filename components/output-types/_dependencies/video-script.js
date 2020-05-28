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
      const dataVideo = '<div class="powa" id="powa-{uuid}" data-sticky=true data-org="elcomercio" data-env="${env}" data-stream="{stream}" data-uuid="{uuid}" data-aspect-ratio="0.562" data-api="${env}" data-preload=none ></div>'
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
          setTimeout(function(){  
            target.classList.remove("powa-default")
          }, 1000);
        }
     )
  
      observer.unobserve(target)
    }
  })
}

if ('IntersectionObserver' in window) {
  const options = {
    rootMargin: '0px 0px 0px 0px',
  }
  const videos = Array.from(document.querySelectorAll('.lazyload-video'))
  videos.forEach(video => {
         const observer = new IntersectionObserver(videoObserver, options)
      observer.observe(video)
      
  })
}
*/
const videoScript = env =>
  `"use strict";var videoObserver=function(t,e){t.forEach(function(t){var a=t.isIntersecting,i=t.target;if(a){var o=i.getAttribute("data-uuid"),r=i.getAttribute("data-preroll"),n=(i.getAttribute("data-api"),i.getAttribute("data-poster"),i.getAttribute("data-streams"));i.getAttribute("data-reziser");i.innerHTML='<div class="powa" id="powa-{uuid}" data-sticky=true data-org="elcomercio" data-env="${env}" data-stream="{stream}" data-uuid="{uuid}" data-aspect-ratio="0.562" data-api="${env}" data-preload=none ></div>'.replace(/{uuid}/gm,o).replace(/{stream}/gm,n),window.powaBoot&&window.powaBoot(),setTimeout(function(){window.PoWaSettings&&(window.preroll=r,window.PoWaSettings.advertising={adBar:!1,adTag:r})},1e3),window.addEventListener("powaRender",function(){setTimeout(function(){i.classList.remove("powa-default")},1e3)}),e.unobserve(i)}})};if("IntersectionObserver"in window){var options={rootMargin:"0px 0px 0px 0px"},videos=Array.from(document.querySelectorAll(".lazyload-video"));videos.forEach(function(t){new IntersectionObserver(videoObserver,options).observe(t)})}`

export default videoScript
