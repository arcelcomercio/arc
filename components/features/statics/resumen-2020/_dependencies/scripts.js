/*
  document.addEventListener('DOMContentLoaded', () => {requestIdle(() => {
    const $anchor = document.getElementById("anchor")
    $anchor.addEventListener("click", () => {
      window.scrollTo(0,0)
    })
  })})
*/

export const anchorScript = `"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){document.getElementById("anchor").addEventListener("click",function(){window.scrollTo(0,0)})})});`
