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
*/
const iframeScript = () => `
"use strict";var iframeObserver=function iframeObserver(entries,observer){entries.forEach(function(entry){var isIntersecting=entry.isIntersecting,target=entry.target;if(isIntersecting){target.innerHTML=target.getAttribute('data-iframe');setTimeout(function(){target.classList.remove("story-contents__p-default");target.classList.remove("s-multimedia__p-default")},1000);observer.unobserve(target)}})};if('IntersectionObserver' in window){var options={rootMargin:'0px 0px 0px 0px'};var iframesc=Array.from(document.querySelectorAll('.s-multimedia__lL-iframe'));var iframes=Array.from(document.querySelectorAll('.story-contents__lL-iframe')).concat(iframesc);iframes.forEach(function(iframe){var observer=new IntersectionObserver(iframeObserver,options);observer.observe(iframe)})};function aprm(){var t=document.getElementById("rpm");if(t&&!document.getElementById("ifprm")){var e=t&&t.getAttribute("data-roll");t.innerHTML=atob(e)}}document.body.onload=aprm();
`

export default iframeScript
