/*
const videoObserver = (entries, observer) => {
  entries.forEach(entry => {
    const { isIntersecting, target } = entry
    if (isIntersecting) {
      requestIdle(() => {
        const uuid = target.getAttribute('data-uuid')
        const preroll = target.getAttribute('data-preroll')
        const api = target.getAttribute('data-api')
        const poster = target.getAttribute('data-poster')
        const streams = target.getAttribute('data-streams')
        const dataVideo = '<div class="powa" id="powa-{uuid}" data-sticky=true data-org="elcomercio" data-env="${env}" data-stream="{stream}" data-uuid="{uuid}" data-aspect-ratio="0.562" data-api="${env}" data-preload=none ></div>'
        target.innerHTML = dataVideo.replace(/{uuid}/mg,uuid).replace(/{stream}/mg,streams)
        
        if (window.powaBoot) requestIdle(() => {window.powaBoot()})
        requestIdle(function(){  
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
        });
        
        window.addEventListener('powaRender',
          function () {
            target.classList.remove("story-contents__p-default")
            target.classList.remove("s-multimedia__p-default")
          }
        )
      })
      observer.unobserve(target)
    }
  })
}
requestIdle(()=> {
  if ('IntersectionObserver' in window) {
    const options = {
      rootMargin: '0px',
    }
    const videosc = Array.from(document.querySelectorAll('.s-multimedia__lL-video'))
    const videos = Array.from(document.querySelectorAll('.story-contents__lL-video')).concat(videosc)
    const observer = new IntersectionObserver(videoObserver, options)
    videos.forEach(video => {
        observer.observe(video)
    })
  }
})
*/
const videoScript = env =>
  `"use strict";var videoObserver=function(t,e){t.forEach(function(t){var a=t.isIntersecting,o=t.target;a&&(requestIdle(function(){var t=o.getAttribute("data-uuid"),e=o.getAttribute("data-preroll"),a=(o.getAttribute("data-api"),o.getAttribute("data-poster")),r=o.getAttribute("data-streams");o.innerHTML='<div class="powa" id="powa-{uuid}" data-sticky=true data-org="elcomercio" data-env="${env}" data-stream="{stream}" data-uuid="{uuid}" data-aspect-ratio="0.562" data-api="${env}" data-preload=none ></div>'.replace(/{uuid}/gm,t).replace(/{stream}/gm,r),window.powaBoot&&requestIdle(function(){window.powaBoot()}),requestIdle(function(){window.PoWaSettings&&(window.preroll=e,window.PoWaSettings.advertising={adBar:!1,adTag:e},window.PoWaSettings.promo={style:{".powa-shot-image":{backgroundImage:"url('"+a+"')",backgroundSize:"contain"},".powa-shot-play-btn":{color:"rgb(240, 248, 255)",fill:"rgb(240, 248, 255)",backgroundColor:"rgba(0, 0, 0, 0.25)",boxShadow:"0 0 10px 5px rgba(0, 0, 0, 0.25)",transition:"all 0.25s",borderRadius:"2em"},".powa-shot-play-icon":{opacity:"0.85"},".powa-shot-loading-icon":{opacity:"0.85"}}})}),window.addEventListener("powaRender",function(){o.classList.remove("story-contents__p-default"),o.classList.remove("s-multimedia__p-default")})}),e.unobserve(o))})};requestIdle(function(){if("IntersectionObserver"in window){var t=Array.from(document.querySelectorAll(".s-multimedia__lL-video")),e=Array.from(document.querySelectorAll(".story-contents__lL-video")).concat(t),a=new IntersectionObserver(videoObserver,{rootMargin:"0px"});e.forEach(function(t){a.observe(t)})}});`

export default videoScript
