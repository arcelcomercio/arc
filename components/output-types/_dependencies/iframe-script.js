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
      rootMargin: '0px',
    }
    const iframesc = Array.from(document.querySelectorAll('.s-multimedia__lL-iframe'))
    const iframes = Array.from(document.querySelectorAll('.story-contents__lL-iframe')).concat(iframesc)
    const observer = new IntersectionObserver(iframeObserver, options)
    iframes.forEach(iframe => {
        observer.observe(iframe)
    })
  }
})
*/
const iframeScript = () =>
  `"use strict";var iframeObserver=function(e,r){e.forEach(function(e){var t=e.isIntersecting,n=e.target;t&&(n.innerHTML=n.getAttribute("data-iframe"),setTimeout(function(){n.classList.remove("story-contents__p-default"),n.classList.remove("s-multimedia__p-default")},1e3),r.unobserve(n))})};requestIdle(function(){if("IntersectionObserver"in window){var e=Array.from(document.querySelectorAll(".s-multimedia__lL-iframe")),r=Array.from(document.querySelectorAll(".story-contents__lL-iframe")).concat(e),t=new IntersectionObserver(iframeObserver,{rootMargin:"0px"});r.forEach(function(e){t.observe(e)})}});`

export default iframeScript
