/*
  const htmlObserver = (entries, observer) => {
  entries.forEach(entry => {
    const { isIntersecting, target } = entry
    if (isIntersecting) {
            const node = document.createElement('script')
  node.type = 'text/javascript'
  node.src = 'https://graphics.afpforum.com/vendors/pym/pym.v1.min.js'
  document.head.append(node)

      observer.unobserve(target)
    }
  })
}

requestIdle(()=> {
  if ('IntersectionObserver' in window) {
    const options = {
      rootMargin: '0px',
    }
    const iframes = Array.from(document.body.querySelectorAll('.story-content__embed'))
    const observer = new IntersectionObserver(htmlObserver, options)
    iframes.forEach(iframe => {
        observer.observe(iframe)
    })
  }
})
*/

const iframeScript = `"use strict";var htmlObserver=function(e,r){e.forEach(function(e){var t=e.isIntersecting,n=e.target;if(t){var o=document.createElement("script");o.type="text/javascript",o.src="https://graphics.afpforum.com/vendors/pym/pym.v1.min.js",document.head.append(o),r.unobserve(n)}})};requestIdle(function(){if("IntersectionObserver"in window){var e=Array.from(document.body.querySelectorAll(".story-content__embed")),r=new IntersectionObserver(htmlObserver,{rootMargin:"0px"});e.forEach(function(e){r.observe(e)})}});`

export default iframeScript
