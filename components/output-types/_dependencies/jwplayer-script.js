/*
const jwplayerObserver = (entries, observer) => {
  entries.forEach(entry => {
    const { isIntersecting, target } = entry
    if (isIntersecting) {
      console.log('target',target)
      let nameId = target.getAttribute('id')
      let playerId = target.getAttribute('data-playerId')
      const hasAds = target.getAttribute('data-hasAds')
      var script = document.getElementById('jwplayerIdScript')
      if(script){
        script.parentNode.removeChild(script);
      }
      if( playerId){
        const linkElem = 'https://cdn.jwplayer.com/libraries/'+  playerId + '.js'
        const node = document.createElement('script')
        node.type = 'text/javascript'
        node.id='jwplayerIdScript'
        node.src = linkElem
        document.head.append(node)
      }
      
      var image_id = document.getElementById('image_'+nameId)
      const playlist =  [{
        file: "https://cdn.jwplayer.com/manifests/" + nameId + ".m3u8",
        title: image_id.getAttribute('alt'),
        recommendations: 'https://cdn.jwplayer.com/v2/media/' + nameId,
        image: image_id.getAttribute('src')
      }]
      setTimeout(function () {
        if(hasAds == 0){
            jwplayer(nameId).setup({
              playlist,
              advertising: ""
            });
          }else{
            jwplayer(nameId).setup({
              playlist,
            });
          }
          jwplayer().on('ready', function () { ns_.StreamingAnalytics.JWPlayer(jwplayer(), { publisherId: "8429002"  }); });
        }, 558);

      observer.unobserve(target)
    }
  })
}
window.addEventListener('load', function() {
  requestIdle(function() {
    if ('IntersectionObserver' in window) {
      var options = {
        rootMargin: '0px',
      }
      var videos = Array.from(document.body.querySelectorAll('.jwplayer-lazy'))
      var observer = new IntersectionObserver(jwplayerObserver, options)
      videos.forEach(function(video) {
        observer.observe(video)
      })
    }
  })
})
*/

// const videoScript = `"use strict";var jwplayerObserver=function(e,r){e.forEach(function(e){var t=e.isIntersecting,n=e.target;if(t){console.log("target",n);var o=n.getAttribute("id");if((o=o.split("_"))[1]){var a="https://cdn.jwplayer.com/players/"+o[1]+"-"+o[2]+".js",i=document.createElement("script");i.type="text/javascript",i.src=a,document.head.append(i)}r.unobserve(n)}})};window.addEventListener("load",function(){requestIdle(function(){if("IntersectionObserver"in window){var e=Array.from(document.body.querySelectorAll(".jwplayer-lazy")),r=new IntersectionObserver(jwplayerObserver,{rootMargin:"0px"});e.forEach(function(e){r.observe(e)})}})});`
const videoScript = `"use strict";const jwplayerObserver=(e,t)=>{e.forEach(e=>{const{isIntersecting:r,target:n}=e;if(r){console.log("target",n);let e=n.getAttribute("id"),r=n.getAttribute("data-playerId");const s=n.getAttribute("data-hasAds");var a=document.getElementById("jwplayerIdScript");if(a&&a.parentNode.removeChild(a),r){const e="https://cdn.jwplayer.com/libraries/"+r+".js",t=document.createElement("script");t.type="text/javascript",t.id="jwplayerIdScript",t.src=e,document.head.append(t)}var i=document.getElementById("image_"+e);const o=[{file:"https://cdn.jwplayer.com/manifests/"+e+".m3u8",title:i.getAttribute("alt"),recommendations:"https://cdn.jwplayer.com/v2/media/"+e,image:i.getAttribute("src")}];setTimeout(function(){0==s?jwplayer(e).setup({playlist:o,advertising:""}):jwplayer(e).setup({playlist:o}),jwplayer().on("ready",function(){ns_.StreamingAnalytics.JWPlayer(jwplayer(),{publisherId:"8429002"})})},558),t.unobserve(n)}})};window.addEventListener("load",function(){requestIdle(function(){if("IntersectionObserver"in window){var e=Array.from(document.body.querySelectorAll(".jwplayer-lazy")),t=new IntersectionObserver(jwplayerObserver,{rootMargin:"0px"});e.forEach(function(e){t.observe(e)})}})});`

export default videoScript
