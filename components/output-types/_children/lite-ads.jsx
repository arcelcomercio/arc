import React from 'react'

const LiteAds = ({ requestUri, tags, contentCode, siteProperties }) => {
  /* window.addEventListener('load', function() {
      requestIdle(function() {
        const isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent)
        const adsSlots = [].slice.call(document.querySelectorAll(isMobile ? 'div[data-ads-name][data-ads-dimensions-m]' : 'div[data-ads-name][data-ads-dimensions]'))

        if (adsSlots && adsSlots.length > 0) {
          window.googletag = window.googletag || { cmd: [] }
          googletag.cmd.push(function() {
            googletag.pubads().enableSingleRequest()
            // googletag.pubads().enableLazyLoad({
            //   fetchMarginPercent: 80,  // Fetch slots within 1.5 viewports.
            //   renderMarginPercent: 50,  // Render slots within 1 viewports.
            //   mobileScaling: 1.0  // Scaling the the above values on mobile.
            // });

            // Si se activa .enableLazyLoad(), se debe deshabilitar
            // .enableSingleRequest() y .collapseEmptyDivs()
            
            // googletag.pubads().collapseEmptyDivs()
            googletag.enableServices()
          })

          const userPaywall = () => {
            let userType = 'no'
            if(window.localStorage && window.localStorage.hasOwnProperty('ArcId.USER_INFO') && window.localStorage.getItem('ArcId.USER_INFO') !== '{}'){
              const UUID_USER = JSON.parse(window.localStorage.getItem('ArcId.USER_INFO')).uuid;
              const COUNT_USER = JSON.parse(window.localStorage.getItem('ArcP') || '{}')[UUID_USER]
              if(COUNT_USER && COUNT_USER.sub.p.length) { userType = 'si' }
            } else { userType = 'no' }
            return userType;
          }

          const userPaywallStat = userPaywall()
          const { section, arcSite, subsection } = window;
          const loadFirstAds = adsSlots.filter(slot => slot.getAttribute('data-ads-load-first')) || []
          
          const pushAds = (dimensions, name, id) => {
            if (dimensions.length > 0) {
              googletag.cmd.push(function() {
                googletag.defineSlot(name, dimensions, id).addService(googletag.pubads())
                .setTargeting("ab_test", "")
                .setTargeting("categoria", subsection)
                .setTargeting("contenido", "st_value3")
                .setTargeting("fuente", "WEB")
                .setTargeting("paywall", userPaywallStat)
                .setTargeting("phatname", "st_value6")
                .setTargeting("publisher", arcSite)
                .setTargeting("seccion", section)
                .setTargeting("tags", "st_value9")
                .setTargeting("tipoplantilla", "post")
                .setTargeting("tmp_ad", "");
                
              })
            }
          }

          const pushSlot = (adItem) => {
            const ad = adItem || {}
            const adName = ad.getAttribute('data-ads-name').replace('snota',section)
            const adDimensions = isMobile ? ad.getAttribute('data-ads-dimensions-m') : ad.getAttribute('data-ads-dimensions')
            const adParsedDimensions = JSON.parse(adDimensions || "[]")
            const adId = ad.id
            pushAds(adParsedDimensions, adName, adId)
          }
          
          const displaySlot = (slot) => {
            const ad = slot || {}
            const adId = ad.id
            googletag.cmd.push(function() {
              googletag.display(adId)
            })
          }

          const firstRequest = () => {
            loadFirstAds.forEach(pushSlot) 
            loadFirstAds.forEach(displaySlot)
          }
          
          if(loadFirstAds.length > 0) firstRequest()
          
          requestIdle(function() {
            const loadLazilyAds = adsSlots.filter(slot => !slot.getAttribute('data-ads-load-first')) || []
            const adsObserver = (entries, observer) => {
              entries.forEach(entry => {
                const { isIntersecting, target } = entry
                if (isIntersecting) {
                  pushSlot(target)
                  displaySlot(target)
                  observer.unobserve(target)
                }
              })
            }

            if ('IntersectionObserver' in window) {
              const options = {
                rootMargin: '0px 0px 200px 0px',
              }
              loadLazilyAds.forEach(lazyAd => {
                  const observer = new IntersectionObserver(adsObserver, options)
                  observer.observe(lazyAd)
              })
            }
          })
        }
      })
    }) */

  const typeContent = contentCode === '' ? 'standar' : contentCode
  const targetingTags = tags.map(({ slug = '' }) => slug.split('-').join(''))
  const scrp = `"use strict";window.addEventListener("load",function(){requestIdle(function(){var e=/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent),t=[].slice.call(document.querySelectorAll(e?"div[data-ads-name][data-ads-dimensions-m]":"div[data-ads-name][data-ads-dimensions]"));if(t&&t.length>0){window.googletag=window.googletag||{cmd:[]},googletag.cmd.push(function(){googletag.pubads().enableSingleRequest(),googletag.enableServices()});var a=function(){var e="no";if(window.localStorage&&window.localStorage.hasOwnProperty("ArcId.USER_INFO")&&"{}"!==window.localStorage.getItem("ArcId.USER_INFO")){var t=JSON.parse(window.localStorage.getItem("ArcId.USER_INFO")).uuid,a=JSON.parse(window.localStorage.getItem("ArcP")||"{}")[t];a&&a.sub.p.length&&(e="si")}else e="no";return e}(),n=window.section,o=n.section,i=n.arcSite,r=n.subsection,g=t.filter(function(e){return e.getAttribute("data-ads-load-first")})||[],s=function(t){var n,g,s,d=t||{},l=d.getAttribute("data-ads-name").replace("snota",o),c=e?d.getAttribute("data-ads-dimensions-m"):d.getAttribute("data-ads-dimensions"),u=JSON.parse(c||"[]"),f=d.id;g=l,s=f,(n=u).length>0&&googletag.cmd.push(function(){googletag.defineSlot(g,n,s).addService(googletag.pubads()).setTargeting("ab_test","").setTargeting("categoria",r).setTargeting("contenido","st_value3").setTargeting("fuente","WEB").setTargeting("paywall",a).setTargeting("phatname","st_value6").setTargeting("publisher",i).setTargeting("seccion",o).setTargeting("tags","st_value9").setTargeting("tipoplantilla","post").setTargeting("tmp_ad","")})},d=function(e){var t=(e||{}).id;googletag.cmd.push(function(){googletag.display(t)})};g.length>0&&(g.forEach(s),g.forEach(d)),requestIdle(function(){var e=t.filter(function(e){return!e.getAttribute("data-ads-load-first")})||[],a=function(e,t){e.forEach(function(e){var a=e.isIntersecting,n=e.target;a&&(s(n),d(n),t.unobserve(n))})};if("IntersectionObserver"in window){var n={rootMargin:"0px 0px 200px 0px"};e.forEach(function(e){new IntersectionObserver(a,n).observe(e)})}})}})});`
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
