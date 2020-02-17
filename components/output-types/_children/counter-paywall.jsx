import React from 'react'

export default ({ arcSite, arcEnv }) => {
  const PaywallCounter = `!(function(w, d) {
    var dataContentPremium = w.content_paywall || false
    if(!dataContentPremium){
      var dataContTyp = d.querySelector('meta[name="content-type"]')
      var dataContSec = d.querySelector('meta[name="section-id"]')
      var userInfo = w.JSON.parse(w.localStorage.getItem('ArcId.USER_INFO')) || {}
      w.ArcPOptions = {
        paywallFunction: function(campaign) {
          w.location.href = campaign + '&ref=' + w.location.pathname
        },
        contentType: dataContTyp ? dataContTyp.getAttribute('content') : 'none',
        section: dataContSec ? dataContSec.getAttribute('content') : 'none',
        userName: userInfo.uuid || null,
        jwt: userInfo.accessToken || null,
        apiOrigin: 'api${arcEnv === 'sandbox' ? '-sandbox' : ''}.${arcSite}.pe',
      }
      var script = d.createElement('script')
      script.src =
        'https://elcomercio-${arcSite}-${arcEnv}.cdn.arcpublishing.com/arc/subs/p.js?v=${new Date()
    .toISOString()
    .slice(0, 10)}'
      script.async = 'true'
      d.head.appendChild(script)
    }
  })(window, document)`
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: PaywallCounter }} />
    </>
  )
}
