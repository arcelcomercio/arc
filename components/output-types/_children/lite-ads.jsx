import React from 'react'

const LiteAds = ({ requestUri, globalContent, siteProperties }) => {
  /*
    window.addEventListener('load', function() {
      requestIdle(function() {
        const adsSlots = [].slice.call(document.querySelectorAll('div[data-ads-name]'))
        if (adsSlots && adsSlots.length > 0) {
          window.googletag = window.googletag || { cmd: [] }

          const userPaywall = () => {
            let user_type = 'no'
            if(window.localStorage && window.localStorage.hasOwnProperty('ArcId.USER_INFO') && window.localStorage.getItem('ArcId.USER_INFO') !== '{}'){
              let UUID_USER = JSON.parse(window.localStorage.getItem('ArcId.USER_INFO')).uuid;
              let COUNT_USER = JSON.parse(window.localStorage.getItem('ArcP') || '{}')[UUID_USER]
              if(COUNT_USER && COUNT_USER.sub.p.length) { user_type = 'si' }
            } else { user_type = 'no' }
            return user_type;
          }

          const userPaywallStat = userPaywall()

          adsSlots.forEach(function(adItem) {
          const ad = adItem || {}
          const sectionNota = window.section;
          const arcSite = window.arcSite;
          const subsectionNota = window.subsection ? window.subsection : '';
          const adName = ad.getAttribute('data-ads-name').replace('snota',sectionNota)
            const adDesktopDimensions = JSON.parse(ad.getAttribute('data-ads-dimensions') || "[]")
            const adMobileDimensions = JSON.parse(ad.getAttribute('data-ads-dimensions-m') || "[]")
            const adId = ad.id
            if (/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent)) {
              if (adMobileDimensions.length > 0) {
                googletag.cmd.push(function() {
                  // googletag.defineSlot(adName, adMobileDimensions, adId).addService(googletag.pubads());
                  googletag.defineSlot(adName, adMobileDimensions, adId).addService(googletag.pubads())
                  .setTargeting("ab_test", "")
                  .setTargeting("categoria", subsectionNota)
                  .setTargeting("contenido", "st_value3")
                  .setTargeting("fuente", "WEB")
                  .setTargeting("paywall", userPaywallStat)
                  .setTargeting("phatname", "st_value6")
                  .setTargeting("publisher", arcSite)
                  .setTargeting("seccion", sectionNota)
                  .setTargeting("tags", "st_value9")
                  .setTargeting("tipoplantilla", "post")
                  .setTargeting("tmp_ad", "");
                  
                })
              }
            } else if (adDesktopDimensions.length > 0) {
                googletag.cmd.push(function() {
                  // googletag.defineSlot(adName, adDesktopDimensions, adId).addService(googletag.pubads());
                  googletag.defineSlot(adName, adDesktopDimensions, adId).addService(googletag.pubads())
                  .setTargeting("ab_test", "")
                  .setTargeting("categoria", subsectionNota)
                  .setTargeting("contenido", "st_value3")
                  .setTargeting("fuente", "WEB")
                  .setTargeting("paywall", userPaywallStat)
                  .setTargeting("phatname", "st_value6")
                  .setTargeting("publisher", arcSite)
                  .setTargeting("seccion", sectionNota)
                  .setTargeting("tags", "st_value9")
                  .setTargeting("tipoplantilla", "post")
                  .setTargeting("tmp_ad", "");
                })
              }
          })

          googletag.cmd.push(function() {
            // googletag.pubads().enableSingleRequest()
            googletag.pubads().enableLazyLoad({
              fetchMarginPercent: 130,  // Fetch slots within 1.5 viewports.
              renderMarginPercent: 100,  // Render slots within 1 viewports.
              mobileScaling: 1.0  // Scaling the the above values on mobile.
            });

          // Si se activa .enableLazyLoad(), se debe deshabilitar
          // .enableSingleRequest() y .collapseEmptyDivs()
            
            // googletag.pubads().collapseEmptyDivs()
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

  const {
    content_restrictions: { content_code: contentCode = '' } = {},
    taxonomy: { tags = [] } = {},
  } = globalContent
  const typeContent = contentCode === '' ? 'standar' : contentCode
  const targetingTags = tags.map(({ slug = '' }) => slug.split('-').join(''))
  const scrp = '"use strict";window.addEventListener("load",function(){requestIdle(function(){var e=[].slice.call(document.querySelectorAll("div[data-ads-name]"));if(e&&e.length>0){window.googletag=window.googletag||{cmd:[]};var t=function(){var e="no";if(window.localStorage&&window.localStorage.hasOwnProperty("ArcId.USER_INFO")&&"{}"!==window.localStorage.getItem("ArcId.USER_INFO")){var t=JSON.parse(window.localStorage.getItem("ArcId.USER_INFO")).uuid,a=JSON.parse(window.localStorage.getItem("ArcP")||"{}")[t];a&&a.sub.p.length&&(e="si")}else e="no";return e}();e.forEach(function(e){var a=e||{},g=window.section,n=window.arcSite,i=window.subsection?window.subsection:"",o=a.getAttribute("data-ads-name").replace("snota",g),s=JSON.parse(a.getAttribute("data-ads-dimensions")||"[]"),r=JSON.parse(a.getAttribute("data-ads-dimensions-m")||"[]"),l=a.id;/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent)?r.length>0&&googletag.cmd.push(function(){googletag.defineSlot(o,r,l).addService(googletag.pubads()).setTargeting("ab_test","").setTargeting("categoria",i).setTargeting("contenido","st_value3").setTargeting("fuente","WEB").setTargeting("paywall",t).setTargeting("phatname","st_value6").setTargeting("publisher",n).setTargeting("seccion",g).setTargeting("tags","st_value9").setTargeting("tipoplantilla","post").setTargeting("tmp_ad","")}):s.length>0&&googletag.cmd.push(function(){googletag.defineSlot(o,s,l).addService(googletag.pubads()).setTargeting("ab_test","").setTargeting("categoria",i).setTargeting("contenido","st_value3").setTargeting("fuente","WEB").setTargeting("paywall",t).setTargeting("phatname","st_value6").setTargeting("publisher",n).setTargeting("seccion",g).setTargeting("tags","st_value9").setTargeting("tipoplantilla","post").setTargeting("tmp_ad","")})}),googletag.cmd.push(function(){googletag.pubads().enableLazyLoad({fetchMarginPercent:130,renderMarginPercent:100,mobileScaling:1}),googletag.enableServices()}),e.forEach(function(e){var t=(e||{}).id;googletag.cmd.push(function(){googletag.display(t)})})}})});'
    .replace(/st_value3/g, typeContent)
    .replace(/st_value6/g, `${siteProperties.siteUrl}${requestUri}`)
    .replace(/st_value9/g, targetingTags)
  return (
    <>
      <script
        async
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: scrp,
        }}
      />
    </>
  )
}

export default LiteAds
