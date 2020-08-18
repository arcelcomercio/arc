/*
const isScriptLoaded = (src) =>{
  return document.querySelector('script[src="' + src + '"]') ? true : false;
};

  const createScript = ({ src, async }) => {
    const node = document.createElement('script')
    if (isScriptLoaded(src) === false) {
    if (src) {
      node.type = 'text/javascript'
      node.src = src
    }
    if (async) {
      node.async = true
    }
  }
    return document.body.append(node)
  }


const widgetsObserver = (entries, observer) => {
  entries.forEach(entry => {
    const { isIntersecting, target } = entry
    if (isIntersecting) {
      const type = target.getAttribute('data-type')
      if(type ==='instagram'){
        createScript({
          src: 'https://www.instagram.com/embed.js',
          async: true
        });
      }else{
        createScript({
          src: 'https://platform.twitter.com/widgets.js',
          async: true
        });
      }
      observer.unobserve(target)
    }
  })
}
window.addEventListener('load', ()=> {
  requestIdle(()=> {
    if ('IntersectionObserver' in window) {
      const options = {
        rootMargin: '0px',
      }
      const embeds = Array.from(document.querySelectorAll('.embed-script'))
      const observer = new IntersectionObserver(widgetsObserver, options)
      embeds.forEach(embed => {
          observer.observe(embed)
      })
    }
  })
})
*/

const widgets = `"use strict";var isScriptLoaded=function(e){return!!document.querySelector('script[src="'+e+'"]')},createScript=function(e){var t=e.src,r=e.async,n=document.createElement("script");return!1===isScriptLoaded(t)&&(t&&(n.type="text/javascript",n.src=t),r&&(n.async=!0)),document.body.append(n)},widgetsObserver=function(e,t){e.forEach(function(e){var r=e.isIntersecting,n=e.target;if(r){var c=n.getAttribute("data-type");createScript("instagram"===c?{src:"https://www.instagram.com/embed.js",async:!0}:{src:"https://platform.twitter.com/widgets.js",async:!0}),t.unobserve(n)}})};window.addEventListener("load",function(){requestIdle(function(){if("IntersectionObserver"in window){var e=Array.from(document.querySelectorAll(".embed-script")),t=new IntersectionObserver(widgetsObserver,{rootMargin:"0px"});e.forEach(function(e){t.observe(e)})}})});`

export default widgets
