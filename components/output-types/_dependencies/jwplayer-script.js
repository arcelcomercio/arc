/*
const jwplayerObserver = (entries, observer) => {
  entries.forEach(entry => {
    const { isIntersecting, target } = entry
    if (isIntersecting) {
      const nameId = target.getAttribute('id')
      const [, name = '', mediaId = ''] = nameId.split('_')

      const [nameAds = '', mediaIdAds = ''] = nameId.split('-')
      if (mediaIdAds) {
        jwplayer(nameAds).setup({
          playlist: 'https://cdn.jwplayer.com/v2/media/' + mediaIdAds,
        })
      } else {
        const linkElem =
          'https://cdn.jwplayer.com/players/' + name + '-' + mediaId + '.js'
        const node = document.createElement('script')
        node.type = 'text/javascript'
        node.src = linkElem
        document.head.append(node)
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

const videoScript = `"use strict";var jwplayerObserver=function(t,e){t.forEach(function(t){var s=t.isIntersecting,r=t.target;if(s){const t=r.getAttribute("id"),[,s="",c=""]=t.split("_"),[a="",p=""]=t.split("-");if(p)jwplayer(t).setup({playlist:"https://cdn.jwplayer.com/v2/media/"+c});else{const t="https://cdn.jwplayer.com/players/"+s+"-"+c+".js",e=document.createElement("script");e.type="text/javascript",e.src=t,document.head.append(e)}e.unobserve(r)}})};window.addEventListener("load",function(){requestIdle(function(){if("IntersectionObserver"in window){var e=Array.from(document.body.querySelectorAll(".jwplayer-lazy")),r=new IntersectionObserver(jwplayerObserver,{rootMargin:"0px"});e.forEach(function(e){r.observe(e)})}})});
`

export default videoScript
