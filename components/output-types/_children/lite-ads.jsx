/* eslint-disable */
import React from 'react'

const LiteAds = ({
  requestUri,
  tags,
  contentCode,
  siteProperties,
  arcSite,
  section,
  subtype,
}) => {
  /* 
        window.lazier = function lazier(elementToObserve, intersectionCb, rootMargin = '0px 0px 200px 0px') {
            const adsObserver = (entries, observer) => {
                entries.forEach(entry => {
                    const {
                        isIntersecting,
                        target
                    } = entry
                    if (isIntersecting) {
                        intersectionCb(target)
                        observer.unobserve(target)
                    }
                })
            }
            if ('IntersectionObserver' in window) {
                const options = {
                    rootMargin,
                }
                elementToObserve.forEach(el => {
                    const observer = new IntersectionObserver(adsObserver, options)
                    observer.observe(el)
                })
            }
        }
        window.isMobiles = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent);
        window.mobile = (window.isMobiles) ? "mobile" : "desktop";
        const userPaywall = () => {
            let userType = 'no'
            if (window.localStorage && window.localStorage.hasOwnProperty('ArcId.USER_INFO') && window.localStorage.getItem('ArcId.USER_INFO') !== '{}') {
                const UUID_USER = JSON.parse(window.localStorage.getItem('ArcId.USER_INFO')).uuid;
                const COUNT_USER = JSON.parse(window.localStorage.getItem('ArcP') || '{}')[UUID_USER]
                if (COUNT_USER && COUNT_USER.sub.p.length) {
                    userType = 'si'
                }
            } else {
                userType = 'no'
            }
            return userType;
        }
        const userPaywallStat = userPaywall()
        const getTmpAd = () => {
            let tmpAdTargeting = window.location.search.match(/tmp_ad=([^&]*)/) || [];
            return tmpAdTargeting[1] || ''
        };
        const getTarget = () => {
            return {
                "contenido": "st_value3",
                "publisher": "${arcSite}",
                "seccion": section,
                "categoria": subsection,
                "fuente": "WEB",
                "tipoplantilla": "post",
                "phatname": "st_value6",
                "tags": 'st_value9',
                "ab_test": "",
                "paywall": userPaywallStat,
                "tmp_ad": getTmpAd()
            }
        };
        document.addEventListener('DOMContentLoaded', () => {
            requestIdle(function initLiteAdsConfig() {
                const adsSlots = [].slice.call(document.querySelectorAll('div[id^="gpt_"]'));
                window.existAds = adsSlots.length > 0
                const {
                    section,
                    subsection,
                } = window;
                window.adsCollection = []
                if (window.adsColl.length > 0) {
                    window.adsCollection = window.adsColl.filter(
                        function(input) {
                            if (input.dispositivo) {
                                if (input.dispositivo.indexOf(window.mobile) !== -1) { 
                                    if (window.isMobiles) {
                                        input.dimensions = input.dimensions_mobile;
                                    }
                                    input.targeting = getTarget();
                                    return input; 
                                }
                            }
                        }
                    );
                }
            })
        })
 */

  const typeContent = contentCode === '' ? 'standar' : contentCode
  const targetingTags = tags.map(({ slug = '' }) => slug.split('-').join(''))
  const adsMag1 = `"use strict";window.lazier=function(e,o,t){void 0===t&&(t="0px 0px 200px 0px");var i=function(e,t){e.forEach(function(e){var i=e.isIntersecting,n=e.target;i&&(o(n),t.unobserve(n))})};if("IntersectionObserver"in window){var n={rootMargin:t};e.forEach(function(e){new IntersectionObserver(i,n).observe(e)})}},window.isMobiles=/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent),window.mobile=window.isMobiles?"mobile":"desktop";var userPaywall=function(){var e="no";if(window.localStorage&&window.localStorage.hasOwnProperty("ArcId.USER_INFO")&&"{}"!==window.localStorage.getItem("ArcId.USER_INFO")){var o=JSON.parse(window.localStorage.getItem("ArcId.USER_INFO")).uuid,t=JSON.parse(window.localStorage.getItem("ArcP")||"{}")[o];t&&t.sub.p.length&&(e="si")}else e="no";return e},userPaywallStat=userPaywall(),getTmpAd=function(){return(window.location.search.match(/tmp_ad=([^&]*)/)||[])[1]||""},getTarget=function(){return{contenido:"st_value3",publisher:"${arcSite}",seccion:section,categoria:subsection,fuente:"WEB",tipoplantilla:"post",phatname:"st_value6",tags:"st_value9",ab_test:"",paywall:userPaywallStat,tmp_ad:getTmpAd()}};document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=[].slice.call(document.querySelectorAll('div[id^="gpt_"]'));window.existAds=e.length>0;var o=window;o.section,o.subsection;window.adsCollection=[],window.adsColl.length>0&&(window.adsCollection=window.adsColl.filter(function(e){if(e.dispositivo&&-1!==e.dispositivo.indexOf(window.mobile))return window.isMobiles&&(e.dimensions=e.dimensions_mobile),e.targeting=getTarget(),e}))})});`
    .replace(/st_value3/g, typeContent)
    .replace(/st_value6/g, `${siteProperties.siteUrl}${requestUri}`)
    .replace(/st_value9/g, targetingTags)

  /* 
  window.addEventListener("load", function() {
    requestIdle(function() {
        const {
          existAds,
          adsCollection
        } = window
        if (existAds) {
          window.googletag = window.googletag || {
          cmd: []
        }
        googletag.cmd.push(function() {
          googletag.pubads().collapseEmptyDivs();
          googletag.pubads().enableSingleRequest();
          googletag.enableServices();
        });
        var firstRequest = function() {
        var arcAds = new ArcAds({
          dfp: {
            id: "28253241"
          }
        });
        var adsBloque1 = window.adsCollection.filter(function(input) {
          if ("1" == input.bloque) return input
            return false;
          });
          window.adsBloque1 = adsBloque1,
          arcAds.registerAdCollection(adsBloque1)
        }
        if (window.adsCollection.length > 0) {
          firstRequest()
        }
      }
    })
  });
 */

  const adsMag2 = `"use strict";window.addEventListener("load",function(){requestIdle(function(){var e,o,n=window,t=n.existAds;n.adsCollection;if(t){window.googletag=window.googletag||{cmd:[]},googletag.cmd.push(function(){googletag.pubads().collapseEmptyDivs(),googletag.pubads().enableSingleRequest(),googletag.enableServices()});window.adsCollection.length>0&&(e=new ArcAds({dfp:{id:"28253241"}}),o=window.adsCollection.filter(function(e){return"1"==e.bloque&&e}),window.adsBloque1=o,e.registerAdCollection(o))}})});`

  /* publicidad para lite (menos mag) */
  /* 
    document.addEventListener('DOMContentLoaded', () => {
      requestIdle(function initLiteAdsConfig() {
          window.isMobiles = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent)

          // filtra ads en el DOM segun dispositivob
          const adsSlots = [].slice.call(document.querySelectorAll(isMobiles ? 'div[data-ads-name][data-ads-dimensions-m]' : 'div[data-ads-name][data-ads-dimensions]'))

          window.existAds = adsSlots.length > 0
          window.lazier = function lazier(elementToObserve, intersectionCb, rootMargin = '0px 0px 200px 0px') {
              const adsObserver = (entries, observer) => {
                  entries.forEach(entry => {
                      const {
                          isIntersecting,
                          target
                      } = entry
                      if (isIntersecting) {
                          intersectionCb(target)
                          observer.unobserve(target)
                      }
                  })
              }

              if ('IntersectionObserver' in window) {
                  const options = {
                      rootMargin,
                  }
                  elementToObserve.forEach(el => {
                      const observer = new IntersectionObserver(adsObserver, options)
                      observer.observe(el)
                  })
              }
          }

          const {
              section,
              subsection,
          } = window;

          const userPaywall = () => {
              let userType = 'no'
              if (window.localStorage && window.localStorage.hasOwnProperty('ArcId.USER_INFO') && window.localStorage.getItem('ArcId.USER_INFO') !== '{}') {
                  const UUID_USER = JSON.parse(window.localStorage.getItem('ArcId.USER_INFO')).uuid;
                  const COUNT_USER = JSON.parse(window.localStorage.getItem('ArcP') || '{}')[UUID_USER]
                  if (COUNT_USER && COUNT_USER.sub.p.length) {
                      userType = 'si'
                  }
              } else {
                  userType = 'no'
              }
              return userType;
          }

          const userPaywallStat = userPaywall()

          const getTmpAd = () => {
              let tmpAdTargeting = window.location.search.match(/tmp_ad=([^&]*)/) || [];
              return tmpAdTargeting[1] || ''
          };

          const getTarget = () => {
              return {
                  "contenido": "st_value3",
                  "publisher": "${arcSite}",
                  "seccion": section,
                  "categoria": subsection,
                  "fuente": "WEB",
                  "tipoplantilla": "post",
                  "phatname": "st_value6",
                  "tags": 'st_value9',
                  "ab_test": "",
                  "paywall": userPaywallStat,
                  "tmp_ad": getTmpAd()
              }
          };

          const getSlotData = (slot) => {
              const ad = slot || {}
              const adName = ad.getAttribute('data-ads-name').replace('snota', section).slice(10)
              const adDimensions = isMobiles ? ad.getAttribute('data-ads-dimensions-m') : ad.getAttribute('data-ads-dimensions')
              const adParsedDimensions = JSON.parse(adDimensions || "[]")
              const adBloque = (ad.getAttribute('data-bloque')) ? ad.getAttribute('data-bloque') : 1
              const adId = ad.id
              return {
                  id: adId,
                  slotName: adName,
                  dimensions: adParsedDimensions,
                  targeting: getTarget(),
                  bloque: adBloque
              }
          }

          window.adsCollection = []
          adsSlots.forEach(function(slot) {
              let valor = isMobiles ? slot.getAttribute('data-ads-dimensions-m') : slot.getAttribute('data-ads-dimensions');
              if(valor !== ""){
                  window.adsCollection.push(getSlotData(slot));
              }
          });
      })
    })
  */

  const adsLite1 = `"use strict";window.lazier=function(e,t){var o,n=arguments.length<=2||void 0===arguments[2]?"0px 0px 200px 0px":arguments[2],a=function(e,o){e.forEach(function(e){var n=e.isIntersecting,a=e.target;n&&(t(a),o.unobserve(a))})};"IntersectionObserver"in window&&(o={rootMargin:n},e.forEach(function(e){new IntersectionObserver(a,o).observe(e)}))},window.isMobiles=/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent),window.mobile=window.isMobiles?"mobile":"desktop";var userPaywall=function(){var e="no";if(window.localStorage&&window.localStorage.hasOwnProperty("ArcId.USER_INFO")&&"{}"!==window.localStorage.getItem("ArcId.USER_INFO")){var t=JSON.parse(window.localStorage.getItem("ArcId.USER_INFO")).uuid,o=JSON.parse(window.localStorage.getItem("ArcP")||"{}")[t];o&&o.sub.p.length&&(e="si")}else e="no";return e},userPaywallStat=userPaywall(),getTmpAd=function(){return(window.location.search.match(/tmp_ad=([^&]*)/)||[])[1]||""},getTarget=function(){return{contenido:"st_value3",publisher:"${arcSite}",seccion:section,categoria:subsection,fuente:"WEB",tipoplantilla:"post",phatname:"st_value6",tags:"st_value9",ab_test:"",paywall:userPaywallStat,tmp_ad:getTmpAd()}};window.googletag=window.googletag||{cmd:[]};window.adsCollection=window.adsCollection||[];`
    .replace(/st_value3/g, typeContent)
    .replace(/st_value6/g, `${siteProperties.siteUrl}${requestUri}`)
    .replace(/st_value9/g, targetingTags)

  /*
    window.lazier = function lazier(elementToObserve, intersectionCb, rootMargin = '0px 0px 200px 0px') {
      const adsObserver = (entries, observer) => {
          entries.forEach(entry => {
              const {
                  isIntersecting,
                  target
              } = entry
              if (isIntersecting) {
                  intersectionCb(target)
                  observer.unobserve(target)
              }
          })
      }
      if ('IntersectionObserver' in window) {
          const options = {
              rootMargin,
          }
          elementToObserve.forEach(el => {
              const observer = new IntersectionObserver(adsObserver, options)
              observer.observe(el)
          })
      }
    }
    window.isMobiles = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent);
    window.mobile = (window.isMobiles) ? "mobile" : "desktop";
    const userPaywall = () => {
        let userType = 'no'
        if (window.localStorage && window.localStorage.hasOwnProperty('ArcId.USER_INFO') && window.localStorage.getItem('ArcId.USER_INFO') !== '{}') {
            const UUID_USER = JSON.parse(window.localStorage.getItem('ArcId.USER_INFO')).uuid;
            const COUNT_USER = JSON.parse(window.localStorage.getItem('ArcP') || '{}')[UUID_USER]
            if (COUNT_USER && COUNT_USER.sub.p.length) {
                userType = 'si'
            }
        } else {
            userType = 'no'
        }
        return userType;
    }
    const userPaywallStat = userPaywall()
    const getTmpAd = () => {
        let tmpAdTargeting = window.location.search.match(/tmp_ad=([^&]*)/) || [];
        return tmpAdTargeting[1] || ''
    };
    const getTarget = () => {
        return {
            "contenido": "st_value3",
            "publisher": "${arcSite}",
            "seccion": section,
            "categoria": subsection,
            "fuente": "WEB",
            "tipoplantilla": "post",
            "phatname": "st_value6",
            "tags": 'st_value9',
            "ab_test": "",
            "paywall": userPaywallStat,
            "tmp_ad": getTmpAd()
        }
    };
    window.googletag = window.googletag || { cmd: [] };
    window.adsContinua = window.adsContinua || [];
    window.adsCollection = window.adsCollection || [];
  */

  const adsEconomiaTop = `"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){window.isMobiles=/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent);var t=[].slice.call(document.querySelectorAll(isMobiles?"div[data-ads-name][data-ads-dimensions-m]":"div[data-ads-name][data-ads-dimensions]"));window.existAds=t.length>0,window.lazier=function(t,e,a){void 0===a&&(a="0px 0px 200px 0px");var i=function(t,a){t.forEach(function(t){var i=t.isIntersecting,n=t.target;i&&(e(n),a.unobserve(n))})};if("IntersectionObserver"in window){var n={rootMargin:a};t.forEach(function(t){new IntersectionObserver(i,n).observe(t)})}};var e=window,a=e.section,i=e.subsection,n=function(){var t="no";if(window.localStorage&&window.localStorage.hasOwnProperty("ArcId.USER_INFO")&&"{}"!==window.localStorage.getItem("ArcId.USER_INFO")){var e=JSON.parse(window.localStorage.getItem("ArcId.USER_INFO")).uuid,a=JSON.parse(window.localStorage.getItem("ArcP")||"{}")[e];a&&a.sub.p.length&&(t="si")}else t="no";return t}();window.adsCollection=[],t.forEach(function(t){""!==(isMobiles?t.getAttribute("data-ads-dimensions-m"):t.getAttribute("data-ads-dimensions"))&&window.adsCollection.push(function(t){var e=t||{},o=e.getAttribute("data-ads-name").replace("snota",a).slice(10),s=isMobiles?e.getAttribute("data-ads-dimensions-m"):e.getAttribute("data-ads-dimensions"),d=JSON.parse(s||"[]"),r=e.getAttribute("data-bloque")?e.getAttribute("data-bloque"):1;return{id:e.id,slotName:o,dimensions:d,targeting:{contenido:"st_value3",publisher:"${arcSite}",seccion:a,categoria:i,fuente:"WEB",tipoplantilla:"post",phatname:"st_value6",tags:"st_value9",ab_test:"",paywall:n,tmp_ad:(window.location.search.match(/tmp_ad=([^&]*)/)||[])[1]||""},bloque:r}}(t))})})});`
    .replace(/st_value3/g, typeContent)
    .replace(/st_value6/g, `${siteProperties.siteUrl}${requestUri}`)
    .replace(/st_value9/g, targetingTags)
  /* 
  window.addEventListener('load', function liteAds() {
    requestIdle(function initLiteAds() {
        const {
            isMobiles,
            existAds,
            adsCollection
        } = window

        if (existAds) {
            // Solo ejecuta si existen ads
            window.googletag = window.googletag || {
                cmd: []
            }
            googletag.cmd.push(function() {
                googletag.pubads().collapseEmptyDivs();
                googletag.enableServices();
            });

            if (window.adsCollection.length > 0) requestIdle(function() {
                firstRequest()
            })

            const firstRequest = () => {
                let arcAds = new ArcAds({
                    dfp: {
                        id: "28253241"
                    }
                });
                let adsBloque1 = window.adsCollection.filter(
                    function(input) {
                        if (input.bloque == '1') {
                            return input;
                        };
                    }
                );

                window.adsBloque1 = adsBloque1
                arcAds.registerAdCollection(adsBloque1)
            }
        }
    })
  })
  */

  const adsEconomiaNext = `"use strict";window.addEventListener("load",function(){requestIdle(function(){var o=window,e=(o.isMobiles,o.existAds);o.adsCollection;if(e){window.googletag=window.googletag||{cmd:[]},googletag.cmd.push(function(){googletag.pubads().collapseEmptyDivs(),googletag.enableServices()}),window.adsCollection.length>0&&requestIdle(function(){i()});var i=function(){var o=new ArcAds({dfp:{id:"28253241"}}),e=window.adsCollection.filter(function(o){if("1"==o.bloque)return o});window.adsBloque1=e,o.registerAdCollection(e)}}})});`
  const tiponota = subtype == 'gallery_vertical' ? 'galeria_v' : 'post'
  return (
    <>
      {arcSite === 'elcomerciomag' ||
      arcSite === 'trome' ||
      arcSite === 'elbocon' ||
      arcSite === 'peru21' ||
      arcSite === 'elcomercio' ||
      arcSite === 'gestion' ||
      arcSite === 'depor' ||
      arcSite === 'ojo' ? (
        <>
          {arcSite !== 'elcomerciomag' && arcSite !== 'elbocon' &&
          !(
            arcSite === 'depor' &&
            (section === 'futbol-internacional' || section === 'off-side')
          ) &&
          !(arcSite === 'trome' && section === 'deportes') ? (
            <script
              async
              src={`https://d2dvq461rdwooi.cloudfront.net/output/assets/js/prebid.js?v1${new Date()
                .toISOString()
                .slice(0, 10)}`}></script>
          ) : null}
          <script
            defer
            src={`https://d2dvq461rdwooi.cloudfront.net/${arcSite}/${tiponota}/${section?.replace(
              /-/gm,
              ''
            )}/spaces.js?${new Date().toISOString().slice(0, 10)}`}></script>
          <script
            defer
            src={`https://d1r08wok4169a5.cloudfront.net/ads/${arcSite}/arcads.js?${new Date()
              .toISOString()
              .slice(0, 10)}`}></script>
          {arcSite === 'elcomerciomag' ||
          arcSite === 'peru21' ||
          arcSite === 'trome' ||
          arcSite === 'elbocon' ||
          arcSite === 'depor' ||
          arcSite === 'ojo' ||
          (arcSite === 'elcomercio' && section === 'luces') ? (
            <>
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: adsLite1,
                }}
              />
              <script
                async
                src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
            </>
          ) : (
            <>
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: adsMag1,
                }}
              />
              <script
                type="text/javascript"
                dangerouslySetInnerHTML={{
                  __html: adsMag2,
                }}
              />
            </>
          )}
        </>
      ) : (
        <>
          <script
            async
            src={`https://d2dvq461rdwooi.cloudfront.net/output/assets/js/prebid.js?v1${new Date()
              .toISOString()
              .slice(0, 10)}`}></script>
          <script
            defer
            src={`https://d1r08wok4169a5.cloudfront.net/ads/${arcSite}/arcads.js?${new Date()
              .toISOString()
              .slice(0, 10)}`}></script>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: adsEconomiaTop,
            }}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: adsEconomiaNext,
            }}
          />
        </>
      )}
    </>
  )
}

export default LiteAds
