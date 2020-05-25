import React from 'react'

const LiteAds = () => {
  // window.addEventListener('load', function() {
  //   const adsSlots = [...document.querySelectorAll('div[data-ads-name]')]
  //   if (adsSlots && adsSlots.length > 0) {
  //     window.googletag = window.googletag || { cmd: [] }

  //     adsSlots.forEach((ad = {}) => {
  //     const sectionNota = window.section;
  //     const adName = ad.getAttribute('data-ads-name').replace('snota',sectionNota)
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
            '"use strict";function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.In order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _iterableToArray(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,o=new Array(t);r<t;r++)o[r]=e[r];return o}window.addEventListener("load",function(){var e=_toConsumableArray(document.querySelectorAll("div[data-ads-name]"));e&&e.length>0&&(window.googletag=window.googletag||{cmd:[]},e.forEach(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=window.section,r=e.getAttribute("data-ads-name").replace("snota",t),o=JSON.parse(e.getAttribute("data-ads-dimensions")||"[]"),a=JSON.parse(e.getAttribute("data-ads-dimensions-m")||"[]"),n=e.id;/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent)?a&&googletag.cmd.push(function(){googletag.defineSlot(r,a,n).addService(googletag.pubads())}):o&&googletag.cmd.push(function(){googletag.defineSlot(r,o,n).addService(googletag.pubads())})}),googletag.cmd.push(function(){googletag.pubads().enableSingleRequest(),googletag.pubads().collapseEmptyDivs(),googletag.enableServices()}),e.forEach(function(){var e=(arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}).id;googletag.cmd.push(function(){googletag.display(e)})}))});',
        }}
      />
    </>
  )
}

export default LiteAds
