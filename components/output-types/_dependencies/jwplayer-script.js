/*
const jwplayerObserver = (entries, observer) => {
  entries.forEach(entry => {
    const { isIntersecting, target } = entry
    if (isIntersecting) {
      console.log('target',target)
      let nameId = target.getAttribute('id')
      nameId = nameId.split('_')
      if( nameId[1]){
        const linkElem =
          'https://cdn.jwplayer.com/players/' + nameId[1] + '-' + nameId[2] + '.js'
        const node = document.createElement('script')
        node.type = 'text/javascript'
        node.src = linkElem
        document.head.append(node)
        jwplayer().on('ready', function () { ns_.StreamingAnalytics.JWPlayer(jwplayer(), { publisherId: "8429002"  }); });
      }
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
const videoScript = `const jwplayerObserver=(e,r)=>{e.forEach(e=>{const{isIntersecting:t,target:n}=e;if(t){console.log("target",n);let e=n.getAttribute("id");if((e=e.split("_"))[1]){const r="https://cdn.jwplayer.com/players/"+e[1]+"-"+e[2]+".js",t=document.createElement("script");t.type="text/javascript",t.src=r,document.head.append(t),jwplayer().on("ready",function(){ns_.StreamingAnalytics.JWPlayer(jwplayer(),{publisherId:"8429002"})})}r.unobserve(n)}})};window.addEventListener("load",function(){requestIdle(function(){if("IntersectionObserver"in window){var e=Array.from(document.body.querySelectorAll(".jwplayer-lazy")),r=new IntersectionObserver(jwplayerObserver,{rootMargin:"0px"});e.forEach(function(e){r.observe(e)})}})});`

export default videoScript
