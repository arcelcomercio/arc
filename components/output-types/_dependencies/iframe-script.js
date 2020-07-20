/*
  const iframeObserver = (entries, observer) => {
  entries.forEach(entry => {
    const { isIntersecting, target } = entry
    if (isIntersecting) {
        target.innerHTML = target.getAttribute('data-iframe')
        setTimeout(function(){  
          target.classList.remove("story-contents__p-default")
          target.classList.remove("s-multimedia__p-default")
        }, 1000);
      observer.unobserve(target)
    }
  })
}

requestIdle(()=> {
  if ('IntersectionObserver' in window) {
    const options = {
      rootMargin: '0px 0px 0px 0px',
    }
    const iframesc = Array.from(document.querySelectorAll('.s-multimedia__lL-iframe'))
    const iframes = Array.from(document.querySelectorAll('.story-contents__lL-iframe')).concat(iframesc)
    iframes.forEach(iframe => {
        const observer = new IntersectionObserver(iframeObserver, options)
        observer.observe(iframe)
    })
  }
})
*/
const iframeScript = () => `
"use strict";var iframeObserver=function(e,r){e.forEach(function(e){var t=e.isIntersecting,n=e.target;t&&(n.innerHTML=n.getAttribute("data-iframe"),setTimeout(function(){n.classList.remove("story-contents__p-default"),n.classList.remove("s-multimedia__p-default")},1e3),r.unobserve(n))})};requestIdle(function(){if("IntersectionObserver"in window){var e={rootMargin:"0px 0px 0px 0px"},r=Array.from(document.querySelectorAll(".s-multimedia__lL-iframe"));Array.from(document.querySelectorAll(".story-contents__lL-iframe")).concat(r).forEach(function(r){new IntersectionObserver(iframeObserver,e).observe(r)})}});
`

export default iframeScript
