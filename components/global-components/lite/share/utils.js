/* window.addEventListener('load', () => {requestIdle(() => {
  if(!window.shareButtons){
    const windowW = 600
    const windowH = 400
    const $shareButtons = document.body.querySelectorAll('a[data-share]')
    if ($shareButtons && $shareButtons.length > 0) {
      const wLeft = window.screen.width / 2 - windowW / 2
      const wTop = window.screen.height / 2 - windowH / 2
      $shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault()
          window.open(
            button.getAttribute('href'),
            '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${windowW}, height=${windowH}, top=${wTop}, left=${wLeft}`
          )
        })
      })
    }
  }
})}) */
export const popup =
  '"use strict";window.addEventListener("load",function(){requestIdle(function(){var t=document.body.querySelectorAll("a[data-share]");if(t&&t.length>0){var n=window.screen.width/2-300,o=window.screen.height/2-200;t.forEach(function(t){t.addEventListener("click",function(e){e.preventDefault(),window.open(t.getAttribute("href"),"","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=".concat(600,", height=").concat(400,", top=").concat(o,", left=").concat(n))})})}})});'

/* window.addEventListener('load', () => {requestIdle(() => {
  function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
      console.info('Async: Copying to clipboard was successful!');
      copyLinkButton.textContent = "\u2713 Enlace copiado"
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
  }

  const copyLinkButton = document.getElementById('copy-link')
  if(copyLinkButton) {
    if ('clipboard' in navigator) {
      copyLinkButton.addEventListener('click', () => {
        if(window.location !== window.parent.location){
          window.top.postMessage({id: "copy-link"}, window.location.origin);
        } else {
          copyTextToClipboard(window.location.href)
        }
      })

      if(window.location === window.parent.location){
        window.addEventListener( "message", function (event) {  
          const { origin, data = {} } = event
          // Solo entra si es el mismo origen
          if(origin === window.location.origin) {
            if(data.id === "copy-link") {
              copyTextToClipboard(window.location.href)
            }
          }
        }, false);
      }
    } else {
      copyLinkButton.style.opacity = "0.2"
      copyLinkButton.style.cursor = "initial"
      copyLinkButton.setAttribute('disabled', true)
      return;
    }
  }
})})
*/

export const copyLink = `"use strict";window.addEventListener("load",function(){requestIdle(function(){function o(o){navigator.clipboard.writeText(o).then(function(){console.info("Async: Copying to clipboard was successful!"),n.textContent="✓ Enlace copiado"},function(o){console.error("Async: Could not copy text: ",o)})}var n=document.getElementById("copy-link");if(n){if(!("clipboard"in navigator))return n.style.opacity="0.2",n.style.cursor="initial",void n.setAttribute("disabled",!0);n.addEventListener("click",function(){window.location!==window.parent.location?window.top.postMessage({id:"copy-link"},window.location.origin):o(window.location.href)}),window.location===window.parent.location&&window.addEventListener("message",function(n){var i=n.origin,t=n.data,e=void 0===t?{}:t;i===window.location.origin&&"copy-link"===e.id&&o(window.location.href)},!1)}})});`
