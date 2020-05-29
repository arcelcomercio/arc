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
          setTimeout(function(){  
            target.classList.remove("story-contents__p-default")
            target.classList.remove("s-multimedia__p-default")
          }, 1000);
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
"use strict";var videoObserver=function videoObserver(entries,observer){entries.forEach(function(entry){var isIntersecting=entry.isIntersecting,target=entry.target;if(isIntersecting){var uuid=target.getAttribute('data-uuid');var preroll=target.getAttribute('data-preroll');var api=target.getAttribute('data-api');var poster=target.getAttribute('data-poster');var streams=target.getAttribute('data-streams');var reziser=target.getAttribute('data-reziser');var dataVideo='<div class="powa" id="powa-{uuid}" data-sticky=true data-org="elcomercio" data-env="${env}" data-stream="{stream}" data-uuid="{uuid}" data-aspect-ratio="0.562" data-api="${env}" data-preload=none ></div>';target.innerHTML=dataVideo.replace(/{uuid}/mg,uuid).replace(/{stream}/mg,streams);if(window.powaBoot)window.powaBoot();setTimeout(function(){if(window.PoWaSettings){window.preroll=preroll;window.PoWaSettings.advertising={adBar:!1,adTag:preroll}}},1000);window.addEventListener('powaRender',function(){setTimeout(function(){target.classList.remove("story-contents__p-default");target.classList.remove("s-multimedia__p-default")},1000)});observer.unobserve(target)}})};setTimeout(function(){if('IntersectionObserver' in window){var options={rootMargin:'0px 0px 0px 0px'};var videosc=Array.from(document.querySelectorAll('.s-multimedia__lL-video'));var videos=Array.from(document.querySelectorAll('.story-contents__lL-video')).concat(videosc);videos.forEach(function(video){var observer=new IntersectionObserver(videoObserver,options);observer.observe(video)})}},0)
`

export default videoScript
