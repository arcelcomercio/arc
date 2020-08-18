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
          window.PoWaSettings.promo = {
            style: {
              '.powa-shot-image': {
                backgroundImage: `url('${poster}')`,
                backgroundSize: 'contain',
              },
              '.powa-shot-play-btn': {
                color: 'rgb(240, 248, 255)',
                fill: 'rgb(240, 248, 255)',
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.25)',
                transition: 'all 0.25s',
                borderRadius: '2em',
              },
              '.powa-shot-play-icon': {
                opacity: '0.85',
              },
              '.powa-shot-loading-icon': {
                opacity: '0.85',
              },
            },
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

requestIdle(()=> {
  if ('IntersectionObserver' in window) {
    const options = {
      rootMargin: '0px',
    }
    const videos = Array.from(document.querySelectorAll('.lazyload-video'))
    const observer = new IntersectionObserver(videoObserver, options)
    videos.forEach(video => {
        observer.observe(video)
        
    })
  }
})
*/
const videoScript = env =>
  `"use strict";var videoObserver=function(t,e){t.forEach(function(t){var a=t.isIntersecting,o=t.target;if(a){var r=o.getAttribute("data-uuid"),i=o.getAttribute("data-preroll"),n=(o.getAttribute("data-api"),o.getAttribute("data-poster")),d=o.getAttribute("data-streams");o.getAttribute("data-reziser");o.innerHTML='<div class="powa" id="powa-{uuid}" data-sticky=true data-org="elcomercio" data-env="${env}" data-stream="{stream}" data-uuid="{uuid}" data-aspect-ratio="0.562" data-api="${env}" data-preload=none ></div>'.replace(/{uuid}/gm,r).replace(/{stream}/gm,d),window.powaBoot&&window.powaBoot(),setTimeout(function(){window.PoWaSettings&&(window.preroll=i,window.PoWaSettings.advertising={adBar:!1,adTag:i},window.PoWaSettings.promo={style:{".powa-shot-image":{backgroundImage:"url('"+n+"')",backgroundSize:"contain"},".powa-shot-play-btn":{color:"rgb(240, 248, 255)",fill:"rgb(240, 248, 255)",backgroundColor:"rgba(0, 0, 0, 0.25)",boxShadow:"0 0 10px 5px rgba(0, 0, 0, 0.25)",transition:"all 0.25s",borderRadius:"2em"},".powa-shot-play-icon":{opacity:"0.85"},".powa-shot-loading-icon":{opacity:"0.85"}}})},1e3),window.addEventListener("powaRender",function(){setTimeout(function(){o.classList.remove("powa-default")},1e3)}),e.unobserve(o)}})};requestIdle(function(){if("IntersectionObserver"in window){var t=Array.from(document.querySelectorAll(".lazyload-video")),e=new IntersectionObserver(videoObserver,{rootMargin:"0px"});t.forEach(function(t){e.observe(t)})}});`

export default videoScript
