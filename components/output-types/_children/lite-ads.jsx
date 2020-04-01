import React from 'react'

const LiteAds = () => {
  /* window.addEventListener('load', function() {
    const adsSlots = [...document.querySelectorAll('div[data-ads-name]')]
    if (adsSlots && adsSlots.length > 0) {
      window.googletag = window.googletag || { cmd: [] }

      adsSlots.forEach((ad = {}) => {
        const adName = ad.getAttribute('data-ads-name')
        const adDimensions = ad.getAttribute('data-ads-dimensions')
        const adId = ad.id
        googletag.cmd.push(function() {
          googletag.defineSlot(adName, adDimensions, adId)
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
                const adDimensions = ad.getAttribute('data-ads-dimensions')
                const adId = ad.id
                googletag.cmd.push(function() {
                  googletag.defineSlot(adName, adDimensions, adId)
                  googletag.pubads().enableSingleRequest()
                  googletag.pubads().collapseEmptyDivs()
                  googletag.enableServices()
                })
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
