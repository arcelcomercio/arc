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
setTimeout(()=> {
  if ('IntersectionObserver' in window) {
    const options = {
      rootMargin: '0px 0px 0px 0px',
    }
    const embeds = Array.from(document.querySelectorAll('.embed-script'))
    embeds.forEach(embed => {
        const observer = new IntersectionObserver(widgetsObserver, options)
        observer.observe(embed)
    })
  }
}, 0)
*/

const widgets = `
"use strict";var isScriptLoaded=function(t){return!!document.querySelector('script[src="'+t+'"]')},createScript=function(t){var e=t.src,r=t.async,c=document.createElement("script");return!1===isScriptLoaded(e)&&(e&&(c.type="text/javascript",c.src=e),r&&(c.async=!0)),document.body.append(c)},widgetsObserver=function(t,e){t.forEach(function(t){var r=t.isIntersecting,c=t.target;if(r){var n=c.getAttribute("data-type");createScript("instagram"===n?{src:"https://www.instagram.com/embed.js",async:!0}:{src:"https://platform.twitter.com/widgets.js",async:!0}),e.unobserve(c)}})};setTimeout(function(){if("IntersectionObserver"in window){var t={rootMargin:"0px 0px 0px 0px"};Array.from(document.querySelectorAll(".embed-script")).forEach(function(e){new IntersectionObserver(widgetsObserver,t).observe(e)})}},0);
`

export default widgets
