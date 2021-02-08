import ENV from 'fusion:environment'

// const arcEnv = '${arcEnv}'
// document.addEventListener('DOMContentLoaded', () => {
//   window.requestIdle(() => {
//     const frame = document.createElement('iframe')
//     const urlSiteEC =
//       arcEnv === 'prod'
//         ? 'https://elcomercio.pe'
//         : 'https://elcomercio-elcomercio-sandbox.cdn.arcpublishing.com'
//     const urlSitePathEC = `${urlSiteEC}/paywall-counter-external/?outputType=subscriptions`
//     frame.src = urlSitePathEC
//     frame.style.display = 'none'
//     const urlCanonical = window.document.querySelector('link[rel=canonical]')
//     const urlNoteMAG =
//       (urlCanonical && urlCanonical.href) || window.location.href
//     frame.onload = function() {
//       frame.contentWindow.postMessage(urlNoteMAG, urlSiteEC)
//     }
//     document.body.appendChild(frame)
//   })
// })

const arcEnv = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'

const iframeScriptCounter = () =>
  `"use strict";var arcEnv="${arcEnv}";document.addEventListener("DOMContentLoaded",function(){window.requestIdle(function(){var e=document.createElement("iframe"),n="prod"===arcEnv?"https://elcomercio.pe":"https://elcomercio-elcomercio-sandbox.cdn.arcpublishing.com",o="".concat(n,"/paywall-counter-external/?outputType=subscriptions");e.src=o,e.style.display="none";var t=window.document.querySelector("link[rel=canonical]"),c=t&&t.href||window.location.href;e.onload=function(){e.contentWindow.postMessage(c,n)},document.body.appendChild(e)})});`

export default iframeScriptCounter
