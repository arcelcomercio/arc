import React from 'react'

export default ({ arcSite, arcEnv }) => {
  const PaywallCounter = `!(function() {
    var dataContTyp = document.querySelector('meta[name="content-type"]')
    var dataContSec = document.querySelector('meta[name="section-id"]')
    var dataContentPremium = content_paywall || false
    console.log('is premium:', dataContentPremium)
  
    window.ArcPOptions = {
      paywallFunction: function(campaign) {
        console.log('arc paywall fired!', campaign)
      },
      contentType: dataContTyp ? dataContTyp.getAttribute('content') : 'none',
      section: dataContSec ? dataContSec.getAttribute('content') : 'none',
      userName: Identity.userIdentity.uuid || null,
      jwt: Identity.userIdentity.accessToken || null,
      apiOrigin: 'api-sandbox.${arcSite}.pe',
    }
  
    var doc = document
    var script = doc.createElement('script')
    script.src =
      'https://elcomercio-${arcSite}-${arcEnv}.cdn.arcpublishing.com/arc/subs/p.js?v=${new Date()
    .toISOString()
    .slice(0, 10)}'
    script.async = 'true'
    doc.body.appendChild(script)
  })()`

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: PaywallCounter }} />
    </>
  )
}

// !(function() {
//     var dataContTyp = document.querySelector('meta[name="content-type"]')
//     var dataContSec = document.querySelector('meta[name="section-id"]')
//     var dataContentPremium = content_paywall || false

//     window.ArcPOptions = {
//       paywallFunction: function(campaign) {
//         console.log('arc paywall fired!', campaign)
//       },
//       contentType: dataContTyp ? dataContTyp.getAttribute('content') : 'none',
//       section: dataContSec ? dataContSec.getAttribute('content') : 'none',
//       userName: Identity.userIdentity.uuid || null,
//       jwt: Identity.userIdentity.accessToken || null,
//       apiOrigin: 'api-sandbox.gestion.pe',
//       resultsCallback: function(results) {
//         console.dir(results, 'ok')
//       },
//     }

//     var doc = document
//     var script = doc.createElement('script')
//     script.src =
//       'https://elcomercio-elcomercio-sandbox.cdn.arcpublishing.com/arc/subs/p.js?v=2020-01-2'
//     script.async = 'true'
//     doc.body.appendChild(script)
//   })()
