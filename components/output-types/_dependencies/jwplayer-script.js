/*
const jwplayerObserver = (entries, observer) => {
  entries.forEach(entry => {
    const { isIntersecting, target } = entry
    if (isIntersecting) {
      const nameId = target.getAttribute('id')
      const [, name = '', mediaId = ''] = nameId.split('_')

      const [nameAds = '', mediaIdAds = ''] = nameId.split('-')
      if (mediaIdAds) {
        jwplayer(nameId).setup({
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

const videoScript = `
const jwplayerObserver=(e,t)=>{e.forEach(e=>{const{isIntersecting:r,target:n}=e;if(r){const e=n.getAttribute("id"),[,r="",s=""]=e.split("_"),[o="",c=""]=e.split("-");if(c)jwplayer(e).setup({playlist:"https://cdn.jwplayer.com/v2/media/"+c});else{const e="https://cdn.jwplayer.com/players/"+r+"-"+s+".js",t=document.createElement("script");t.type="text/javascript",t.src=e,document.head.append(t)}t.unobserve(n)}})};window.addEventListener("load",function(){requestIdle(function(){if("IntersectionObserver"in window){var e=Array.from(document.body.querySelectorAll(".jwplayer-lazy")),t=new IntersectionObserver(jwplayerObserver,{rootMargin:"0px"});e.forEach(function(e){t.observe(e)})}})});
`

export default videoScript
