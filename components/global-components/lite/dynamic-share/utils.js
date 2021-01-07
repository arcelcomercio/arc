/* eslint-disable import/prefer-default-export */
/* window.addEventListener('load', () => {requestIdle(() => {
  if(!window.shareButtons){
    const windowW = 600
    const windowH = 400
    const $shareButtons = document.body.querySelectorAll('a[data-dynamic-share]')
    if ($shareButtons && $shareButtons.length > 0) {
      const wLeft = window.screen.width / 2 - windowW / 2
      const wTop = window.screen.height / 2 - windowH / 2
      $shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault()
          window.open(
            button.getAttribute('href').replace('shareLink', document.location.pathname).replace('shareTitle', encodeURIComponent(document.title)),
            '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${windowW}, height=${windowH}, top=${wTop}, left=${wLeft}`
          )
        })
      })
    }
  }
})}) */
export const socialShare =
  '"use strict";window.addEventListener("load",function(){requestIdle(function(){if(!window.shareButtons){var e=document.body.querySelectorAll("a[data-dynamic-share]");if(e&&e.length>0){var n=window.screen.width/2-300,t=window.screen.height/2-200;e.forEach(function(e){e.addEventListener("click",function(o){o.preventDefault(),window.open(e.getAttribute("href").replace("shareLink",document.location.pathname).replace("shareTitle",encodeURIComponent(document.title)),"","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=".concat(600,", height=").concat(400,", top=").concat(t,", left=").concat(n))})})}}})});'
