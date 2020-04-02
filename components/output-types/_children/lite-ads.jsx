import React from 'react'

const LiteAds = () => {
  /* window.addEventListener('load', function() {
    const adsSlots = [...document.querySelectorAll('div[data-ads-name]')]
    if (adsSlots && adsSlots.length > 0) {
      window.googletag = window.googletag || { cmd: [] }

      adsSlots.forEach((ad = {}) => {
        const adName = ad.getAttribute('data-ads-name')
        const adDimensions = JSON.parse(ad.getAttribute('data-ads-dimensions'))
        const adId = ad.id
        googletag.cmd.push(function() {
          googletag.defineSlot(adName, adDimensions, adId).addService(googletag.pubads());
          googletag.pubads().enableSingleRequest()
          googletag.pubads().collapseEmptyDivs()
          googletag.enableServices()
        })
        googletag.cmd.push(function() {
          googletag.display(adId)
        })
      })
    }
  }) */

  return (
    <>
      <script
        async
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `
          window.addEventListener('load', function() {
            const adsSlots = [...document.querySelectorAll('div[data-ads-name]')]
            if (adsSlots && adsSlots.length > 0) {
              window.googletag = window.googletag || { cmd: [] }
              
              adsSlots.forEach((ad = {}) => {
                const adName = ad.getAttribute('data-ads-name')
                const adDimensions = JSON.parse(ad.getAttribute('data-ads-dimensions'))
                const adId = ad.id
                googletag.cmd.push(function() {
                  googletag.defineSlot(adName, adDimensions, adId).addService(googletag.pubads());
                })
              })
          
              googletag.cmd.push(function() {
                googletag.pubads().enableSingleRequest()
                /* googletag.pubads().enableLazyLoad({
                  fetchMarginPercent: 400,  // Fetch slots within 4 viewports.
                  renderMarginPercent: 200,  // Render slots within 2 viewports.
                  mobileScaling: 2.0  // Double the above values on mobile.
                }); 
                
                Si se activa Lazyload para probar, se debe deshabilitar 
                .enableSingleRequest() y .collapseEmptyDivs()
                */
                googletag.pubads().collapseEmptyDivs()
                googletag.enableServices()
              })
          
              adsSlots.forEach((ad = {}) => {
                const adId = ad.id
                googletag.cmd.push(function() {
                  googletag.display(adId)
                })
              })
            }
          })
                    `,
        }}
      />
    </>
  )
}

export default LiteAds
