import React from 'react'

const LiteAds = () => {
  /*    
  window.addEventListener('load', function() {
    requestIdle(function() {
      const adsSlots = [].slice.call(document.querySelectorAll('div[data-ads-name]'))
      if (adsSlots && adsSlots.length > 0) {
        window.googletag = window.googletag || { cmd: [] }

        adsSlots.forEach(function(adItem) {
        const ad = adItem || {}
        const sectionNota = window.section;
        const adName = ad.getAttribute('data-ads-name').replace('snota',sectionNota)
          const adDesktopDimensions = JSON.parse(ad.getAttribute('data-ads-dimensions') || "[]")
          const adMobileDimensions = JSON.parse(ad.getAttribute('data-ads-dimensions-m') || "[]")
          const adId = ad.id
          if (/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent)) {
            if (adMobileDimensions.length > 0) {
              googletag.cmd.push(function() {
                googletag.defineSlot(adName, adMobileDimensions, adId).addService(googletag.pubads());
              })
            }
          } else if (adDesktopDimensions.length > 0) {
              googletag.cmd.push(function() {
                googletag.defineSlot(adName, adDesktopDimensions, adId).addService(googletag.pubads());
              })
            }
        })

        googletag.cmd.push(function() {
          googletag.pubads().enableSingleRequest()
         // googletag.pubads().enableLazyLoad({
         //   fetchMarginPercent: 400,  // Fetch slots within 4 viewports.
         //   renderMarginPercent: 200,  // Render slots within 2 viewports.
         //   mobileScaling: 2.0  // Double the above values on mobile.
         // });

         // Si se activa Lazyload para probar, se debe deshabilitar
         // .enableSingleRequest() y .collapseEmptyDivs()
          
          googletag.pubads().collapseEmptyDivs()
          googletag.enableServices()
        })

        adsSlots.forEach(function(adItem) {
          const ad = adItem || {}
          const adId = ad.id
          googletag.cmd.push(function() {
            googletag.display(adId)
          })
        })
      }
    })
  }) 
*/

  return (
    <>
      <script
        async
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html:
            '"use strict";window.addEventListener("load",function(){requestIdle(function(){const e=[].slice.call(document.querySelectorAll("div[data-ads-name]"));e&&e.length>0&&(window.googletag=window.googletag||{cmd:[]},e.forEach(function(e){const o=e||{},t=window.section,a=o.getAttribute("data-ads-name").replace("snota",t),g=JSON.parse(o.getAttribute("data-ads-dimensions")||"[]"),n=JSON.parse(o.getAttribute("data-ads-dimensions-m")||"[]"),d=o.id;/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent)?n.length>0&&googletag.cmd.push(function(){googletag.defineSlot(a,n,d).addService(googletag.pubads())}):g.length>0&&googletag.cmd.push(function(){googletag.defineSlot(a,g,d).addService(googletag.pubads())})}),googletag.cmd.push(function(){googletag.pubads().enableSingleRequest(),googletag.pubads().collapseEmptyDivs(),googletag.enableServices()}),e.forEach(function(e){const o=(e||{}).id;googletag.cmd.push(function(){googletag.display(o)})}))})});',
        }}
      />
    </>
  )
}

export default LiteAds
