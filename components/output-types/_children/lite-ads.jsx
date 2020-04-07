import React from 'react'

const LiteAds = () => {
  // window.addEventListener('load', function() {
  //   const adsSlots = [...document.querySelectorAll('div[data-ads-name]')]
  //   if (adsSlots && adsSlots.length > 0) {
  //     window.googletag = window.googletag || { cmd: [] }

  //     adsSlots.forEach((ad = {}) => {
  //       const adName = ad.getAttribute('data-ads-name')
  //       const adDesktopDimensions = JSON.parse(ad.getAttribute('data-ads-dimensions') || "[]")
  //       const adMobileDimensions = JSON.parse(ad.getAttribute('data-ads-dimensions-m') || "[]")
  //       const adId = ad.id
  //       if (/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent)) {
  //         if (adMobileDimensions) {
  //           googletag.cmd.push(function() {
  //             googletag.defineSlot(adName, adMobileDimensions, adId).addService(googletag.pubads());
  //           })
  //         }
  //       } else if (adDesktopDimensions) {
  //           googletag.cmd.push(function() {
  //             googletag.defineSlot(adName, adDesktopDimensions, adId).addService(googletag.pubads());
  //           })
  //         }
  //     })

  //     googletag.cmd.push(function() {
  //       googletag.pubads().enableSingleRequest()
  //       /* googletag.pubads().enableLazyLoad({
  //         fetchMarginPercent: 400,  // Fetch slots within 4 viewports.
  //         renderMarginPercent: 200,  // Render slots within 2 viewports.
  //         mobileScaling: 2.0  // Double the above values on mobile.
  //       });

  //       Si se activa Lazyload para probar, se debe deshabilitar
  //       .enableSingleRequest() y .collapseEmptyDivs()
  //       */
  //       googletag.pubads().collapseEmptyDivs()
  //       googletag.enableServices()
  //     })

  //     adsSlots.forEach((ad = {}) => {
  //       const adId = ad.id
  //       googletag.cmd.push(function() {
  //         googletag.display(adId)
  //       })
  //     })
  //   }
  // })

  return (
    <>
      <script
        async
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html:
            '"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e)){for(var t=0,o=new Array(e.length);t<e.length;t++)o[t]=e[t];return o}}window.addEventListener("load",function(){var e=_toConsumableArray(document.querySelectorAll("div[data-ads-name]"));e&&e.length>0&&(window.googletag=window.googletag||{cmd:[]},e.forEach(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.getAttribute("data-ads-name"),o=JSON.parse(e.getAttribute("data-ads-dimensions")||"[]"),a=JSON.parse(e.getAttribute("data-ads-dimensions-m")||"[]"),n=e.id;/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent)?a&&googletag.cmd.push(function(){googletag.defineSlot(t,a,n).addService(googletag.pubads())}):o&&googletag.cmd.push(function(){googletag.defineSlot(t,o,n).addService(googletag.pubads())})}),googletag.cmd.push(function(){googletag.pubads().enableSingleRequest(),googletag.pubads().collapseEmptyDivs(),googletag.enableServices()}),e.forEach(function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).id;googletag.cmd.push(function(){googletag.display(e)})}))});',
        }}
      />
    </>
  )
}

export default LiteAds
