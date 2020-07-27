/* eslint-disable */
import React from 'react'

const LiteAds = ({ requestUri, tags, contentCode, siteProperties }) => {
  /* window.addEventListener('load', function liteAds() {
      requestIdle(function initLiteAds() {
        const isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent)
        // filtra ads en el DOM segun dispositivo
        const adsSlots = [].slice.call(document.querySelectorAll(isMobile ? 'div[data-ads-name][data-ads-dimensions-m]' : 'div[data-ads-name][data-ads-dimensions]'))

        if (adsSlots && adsSlots.length > 0) {
          // Solo ejecuta si existen ads
          window.googletag = window.googletag || { cmd: [] }
          window.pbjs = window.pbjs || {};
          window.adUnitsSet = []
          const { section, arcSite, subsection } = window;

          const PREBID_TIMEOUT = 3000
          const FAILSAFE_TIMEOUT = 6000

          const adUnits = {
            'gpt_inline': {
              "code": `/28253241/elcomercio/web/post/${section}/inline`,
              "dispositivo": "desktop, mobile",
              "bids":[
                {
                  "bidder":"appnexus","labels":["desktop", "phone"],
                  "params":{"placementId":"19732211"}
                },
                {
                  "bidder":"criteo","labels":["desktop", "phone"],
                  "params":{"networkId":"7890"}
                },
                {
                  "bidder":"pubmatic","labels":["desktop", "phone"],
                  "params":{"publisherId":"157414","adSlot":"3040991"}
                }
              ],
              "mediaTypes":{
                "banner":{
                  "sizes":[[1,1]]
                },
                "video":{
                  "context": "outstream",
                  "playerSize": [1, 1]
                }
              },
              "sizes":[[1,1]]
            },
            'gpt_caja1': {
              "code": `/28253241/elcomercio/web/post/${section}/caja1`,
              "dispositivo": "desktop",
              "bids":[
                {
                  "bidder":"rubicon","labels":["desktop"],
                  "params":{"zoneId":"1716978","siteId":"215748","accountId":"19186"}
                },
                {
                  "bidder":"appnexus","labels":["desktop"],
                  "params":{"placementId":"19311824"}
                },
                {
                  "bidder":"criteo","labels":["desktop"],
                  "params":{"networkId":"7890"}
                },
                {
                  "bidder":"smartadserver","labels":["desktop"],
                  "params":{"siteId":"316981", "pageId":"1239539", "formatId":"90175"}
                },
                {
                  "bidder":"pubmatic","labels":["desktop"],
                  "params":{"publisherId":"157414","adSlot":"3036440"}
                },
                {
                  "bidder":"pubmatic","labels":["desktop"],
                  "params":{"publisherId":"157414","adSlot":"3036448"}
                }
              ],
              "mediaTypes":{
                "banner":{
                  "sizes":[[300,250],[300,600],[320,100]]
                }
              },
              "sizes":[[300,250],[300,600],[320,100]]
            },
            'gpt_caja2': {
              "code":`/28253241/elcomercio/web/post/${section}/caja2`,
              "dispositivo": "desktop",
              "bids":[
                {
                  "bidder":"rubicon","labels":["desktop"],
                  "params":{"zoneId":"1717492","siteId":"215748","accountId":"19186"}
                },
                {
                  "bidder":"appnexus","labels":["desktop"],
                  "params":{"placementId":"19311825"}
                },
                {
                  "bidder":"criteo","labels":["desktop"],
                  "params":{"networkId":"7890"}
                },
                {
                  "bidder":"smartadserver","labels":["desktop"],
                  "params":{"siteId":"316981", "pageId":"1239539", "formatId":"90176"}
                },
                {
                  "bidder":"pubmatic","labels":["desktop"],
                  "params":{"publisherId":"157414","adSlot":"3036443"}
                }
              ],
              "mediaTypes":{
                "banner":{
                  "sizes":[[300,250],[300,600],[320,100]]
                }
              },
              "sizes":[[300,250],[300,600],[320,100]]
            },
            'gpt_laterall': {
              "code":`/28253241/elcomercio/web/post/${section}/laterall`,
              "dispositivo": "desktop",
              "bids":[
                {
                  "bidder":"rubicon","labels":["desktop"],
                  "params":{"zoneId":"1716980","siteId":"215748","accountId":"19186"}
                },
                {
                  "bidder":"appnexus","labels":["desktop"],
                  "params":{"placementId":"19311820"}
                },
                {
                  "bidder":"criteo","labels":["desktop"],
                  "params":{"networkId":"7890"}
                },
                {
                  "bidder":"smartadserver","labels":["desktop"],
                  "params":{"siteId":"316981", "pageId":"1239539", "formatId":"90173"}
                },
                {
                  "bidder":"pubmatic","labels":["desktop"],
                  "params":{"publisherId":"157414","adSlot":"3036437"}
                },
                {
                  "bidder":"pubmatic","labels":["desktop"],
                  "params":{"publisherId":"157414","adSlot":"3036445"}
                }
              ],
              "mediaTypes":{
                "banner":{
                  "sizes":[[120,600],[160,600]]
                }
              },
              "sizes":[[120,600],[160,600]]
            },
            'gpt_lateralr': {
              "code":`/28253241/elcomercio/web/post/${section}/lateralr`,
              "dispositivo": "desktop",
              "bids":[
                {
                  "bidder":"rubicon","labels":["desktop"],
                  "params":{"zoneId":"1716982","siteId":"215748","accountId":"19186"}
                },
                {
                  "bidder":"appnexus","labels":["desktop"],
                  "params":{"placementId":"19311821"}
                },
                {
                  "bidder":"criteo","labels":["desktop"],
                  "params":{"networkId":"7890"}
                },
                {
                  "bidder":"smartadserver","labels":["desktop"],
                  "params":{"siteId":"316981", "pageId":"1239539", "formatId":"90174"}
                },
                {
                  "bidder":"pubmatic","labels":["desktop"],
                  "params":{"publisherId":"157414","adSlot":"3036439"}
                },
                {
                  "bidder":"pubmatic","labels":["desktop"],
                  "params":{"publisherId":"157414","adSlot":"3036447"}
                }
              ],
              "mediaTypes":{
                "banner":{
                  "sizes":[[120,600],[160,600]]
                }
              },
              "sizes":[[120,600],[160,600]]
            },
            'gpt_top': {
              "code":`/28253241/elcomercio/web/post/${section}/top`,
              "dispositivo": "desktop, mobile",
              "bids":[
                {
                  "bidder":"rubicon","labels":["desktop", "phone"],
                  "params":{"accountId": "19186","siteId": (isMobile) ? "215750" : "215748","zoneId":(isMobile) ? "1717102" : "1716974"}
                },
                {
                  "bidder":"appnexus","labels":["desktop", "phone"],
                  "params":{"placementId":(isMobile) ? "19311836" : "19311817"}
                },
                {
                  "bidder":"criteo","labels":["desktop", "phone"],
                  "params":{"networkId":"7890"}
                },
                {
                  "bidder":"smartadserver","labels":["desktop", "phone"],
                  "params":{"siteId":"316981", "pageId":(isMobile) ? "1239540" : "1239539", "formatId":"74156"} 
                },
                {
                  "bidder":"pubmatic","labels":["desktop"],
                  "params":{"publisherId":"157414","adSlot":"3036436"}
                },
                {
                  "bidder":"pubmatic","labels":["desktop", "phone"],
                  "params":{"publisherId":"157414","adSlot":(isMobile) ? "3036435" : "3036442"}
                }
              ],
              "mediaTypes":{
                "banner":{
                  "sizes":[[320,50],[970,250],[728,90]]
                }
              },
              "sizes":[[320,50],[970,250],[728,90]]
            },
            'gpt_zocalo': {
              "code":`/28253241/elcomercio/web/post/${section}/zocalo`,
              "dispositivo": "desktop",
              "bids":[
                {
                  "bidder":"rubicon","labels":["desktop", "phone"],
                  "params":{"accountId": "19186","siteId": (isMobile) ? "215750" : "215748","zoneId":(isMobile) ? "1717104" : "1716976"}
                },
                {
                  "bidder":"appnexus","labels":["desktop", "phone"],
                  "params":{"placementId":(isMobile) ? "19311837" : "19311818"}
                },
                {
                  "bidder":"criteo","labels":["desktop", "phone"],
                  "params":{"networkId":"7890"}
                },
                {
                  "bidder":"smartadserver","labels":["desktop", "phone"],
                  "params":{"siteId":"316981", "pageId":(isMobile) ? "1239540" : "1239539", "formatId":"74162"} 
                },
                {
                  "bidder":"pubmatic","labels":["desktop", "phone"],
                  "params":{"publisherId":"157414","adSlot":(isMobile) ? "3036434" : "3036444"}
                }
              ],
              "mediaTypes":{
                "banner":{
                  "sizes":[[320,50],[728,90]]
                }
              },
              "sizes":[[320,50],[728,90]]
            },
            'gpt_caja3': {
              "code": `/28253241/elcomercio/web/post/${section}/caja3`,
              "dispositivo": "mobile",
              "bids":[
                {
                  "bidder":"rubicon","labels":["phone"],
                  "params":{"zoneId":"1717106","siteId":"215750","accountId":"19186"}
                },
                {
                  "bidder":"appnexus","labels":["phone"],
                  "params":{"placementId":"19311838"}
                },
                {
                  "bidder":"criteo","labels":["phone"],
                  "params":{"networkId":"7890"}
                },
                {
                  "bidder":"smartadserver","labels":["phone"],
                  "params":{"siteId":"316981", "pageId":"1239540", "formatId":"90177"}
                },
                {
                  "bidder":"pubmatic","labels":["phone"],
                  "params":{"publisherId":"157414","adSlot":"3036438"}
                }
              ],
              "mediaTypes":{
                "banner":{
                  "sizes":[[300,250]]
                }
              },
              "sizes":[[300,250]]
            },
            'gpt_caja4': {
              "code": `/28253241/elcomercio/web/post/${section}/caja4`,
              "dispositivo": "mobile",
              "bids":[
                {
                  "bidder":"rubicon","labels":["phone"],
                  "params":{"zoneId":"1717108","siteId":"215750","accountId":"19186"}
                },
                {
                  "bidder":"appnexus","labels":["phone"],
                  "params":{"placementId":"19311839"}
                },
                {
                  "bidder":"criteo","labels":["phone"],
                  "params":{"networkId":"7890"}
                },
                {
                  "bidder":"smartadserver","labels":["phone"],
                  "params":{"siteId":"316981", "pageId":"1239540", "formatId":"90178"}
                },
                {
                  "bidder":"pubmatic","labels":["phone"],
                  "params":{"publisherId":"157414","adSlot":"3036446"}
                }
              ],
              "mediaTypes":{
                "banner":{
                  "sizes":[[300,250]]
                }
              },
              "sizes":[[300,250]]
            },
            'gpt_caja5': {
              "code": `/28253241/elcomercio/web/post/${section}/caja5`,
              "dispositivo": "mobile",
              "bids":[
                {
                  "bidder":"rubicon","labels":["phone"],
                  "params":{"zoneId":"1717110","siteId":"215750","accountId":"19186"}
                },
                {
                  "bidder":"appnexus","labels":["phone"],
                  "params":{"placementId":"19311840"}
                },
                {
                  "bidder":"criteo","labels":["phone"],
                  "params":{"networkId":"7890"}
                },
                {
                  "bidder":"smartadserver","labels":["phone"],
                  "params":{"siteId":"316981", "pageId":"1239540", "formatId":"90179"}
                },
                {
                  "bidder":"pubmatic","labels":["phone"],
                  "params":{"publisherId":"157414","adSlot":"3036441"}
                }
              ],
              "mediaTypes":{
                "banner":{
                  "sizes":[[300,250]]
                }
              },
              "sizes":[[300,250]]
            },
          }

          // filtra ads con carga inmediata
          const loadFirstAds = adsSlots.filter(slot => slot.getAttribute('data-ads-load-first') === "true") || []
          // filtra ads de carga inmediata con prebid activado 
          const loadFirstPrebid = loadFirstAds.filter(slot => slot.getAttribute('data-prebid-enabled')) || []

          // extrae config de prebid de los ads filtrados previamente
          loadFirstPrebid.forEach(unit => {
            const prebidUnit = adUnits[unit.id]
            if(prebidUnit) adUnitsSet.push(prebidUnit)
          })

          function prebidLoad() {
            var e = setInterval(function() {
                if (googletag.pubadsReady) {
                    if (pbjs.initAdserverSet) return;
                    pbjs.initAdserverSet = true;
                    googletag.cmd.push(function() {
                        pbjs.que.push(function() {
                            pbjs.setTargetingForGPTAsync(), googletag.pubads().refresh(), googletag.cmd.push(function() {
                                const e = googletag.defineSlot.bind(googletag);
                                googletag.defineSlot = function() {
                                    const d = e.apply(void 0, arguments);
                                    return requestIdle(function() {
                                        googletag.pubads().refresh([d])
                                    }, {
                                      timeout: FAILSAFE_TIMEOUT
                                    }), d
                                }
                            })
                        })
                    }), clearInterval(e)
                }
            }, 100)
          }

          function initPrebid() {
            function pushPrebidConfig() {
              pbjs.addAdUnits(adUnitsSet);
              pbjs.setConfig({
                userSync: {
                  filterSettings: {
                    iframe: {
                      bidders: "*",
                      filter: "include"
                    }
                  }
                },
                priceGranularity: "high",
                sizeConfig: [
                  {
                    'mediaQuery': '(min-width: 1024px)',
                    'sizesSupported': [
                      [970, 250],
                      [970, 90],
                      [728, 90],
                      [300, 250],
                      [300, 600],
                      [160, 600],
                      [120, 600]
                    ],
                    'labels': ['desktop']
                  },
                  {
                    'mediaQuery': '(min-width: 300px) and (max-width: 768px)',
                    'sizesSupported': [
                      [320, 50],
                      [300, 250]
                    ],
                    'labels': ['phone']
                  }
                ]
              }),pbjs.requestBids({
                bidsBackHandler: prebidLoad,
                timeout: PREBID_TIMEOUT
              });
            }

            
            pbjs.que.push(pushPrebidConfig)
            requestIdle(function() {prebidLoad()})
          }


          if(adUnitsSet.length > 0) {
            pbjs.que = pbjs.que || [], googletag.cmd.push(function() {
              googletag.pubads().disableInitialLoad()
            }), initPrebid()
          }

          requestIdle(() => {
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
          
          if(loadFirstAds.length > 0) requestIdle(function() {firstRequest()})
          
          requestIdle(function() {
            const loadLazilyAds = adsSlots.filter(slot => slot.getAttribute('data-ads-load-first') !== "true") || []
            const adsObserver = (entries, observer) => {
              entries.forEach(entry => {
                const { isIntersecting, target } = entry
                if (isIntersecting) {
                  const prebidUnit = adUnits[target.id]
                  if(prebidUnit) {
                    adUnitsSet = [prebidUnit]
                    googletag.cmd.push(function() {
                      googletag.pubads().disableInitialLoad()
                    })
                    initPrebid()
                  }
                  requestIdle(function() {
                    pushSlot(target)
                    displaySlot(target)
                  })
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
  const scrp = `"use strict";window.addEventListener("load",function(){requestIdle(function(){var e=/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent),a=[].slice.call(document.querySelectorAll(e?"div[data-ads-name][data-ads-dimensions-m]":"div[data-ads-name][data-ads-dimensions]"));if(a&&a.length>0){var s=function(){var e=setInterval(function(){if(googletag.pubadsReady){if(pbjs.initAdserverSet)return;pbjs.initAdserverSet=!0,googletag.cmd.push(function(){pbjs.que.push(function(){pbjs.setTargetingForGPTAsync(),googletag.pubads().refresh(),googletag.cmd.push(function(){var e=googletag.defineSlot.bind(googletag);googletag.defineSlot=function(){var a=e.apply(void 0,arguments);return requestIdle(function(){googletag.pubads().refresh([a])},{timeout:n}),a}})})}),clearInterval(e)}},100)},d=function(){pbjs.que.push(function(){pbjs.addAdUnits(adUnitsSet),pbjs.setConfig({userSync:{filterSettings:{iframe:{bidders:"*",filter:"include"}}},priceGranularity:"high",sizeConfig:[{mediaQuery:"(min-width: 1024px)",sizesSupported:[[970,250],[970,90],[728,90],[300,250],[300,600],[160,600],[120,600]],labels:["desktop"]},{mediaQuery:"(min-width: 300px) and (max-width: 768px)",sizesSupported:[[320,50],[300,250]],labels:["phone"]}]}),pbjs.requestBids({bidsBackHandler:s,timeout:p})}),requestIdle(function(){s()})};window.googletag=window.googletag||{cmd:[]},window.pbjs=window.pbjs||{},window.adUnitsSet=[];var t=window,i=t.section,o=t.arcSite,r=t.subsection,p=3e3,n=6e3,l={gpt_inline:{code:"/28253241/elcomercio/web/post/"+i+"/inline",dispositivo:"desktop, mobile",bids:[{bidder:"appnexus",labels:["desktop","phone"],params:{placementId:"19732211"}},{bidder:"criteo",labels:["desktop","phone"],params:{networkId:"7890"}},{bidder:"pubmatic",labels:["desktop","phone"],params:{publisherId:"157414",adSlot:"3040991"}}],mediaTypes:{banner:{sizes:[[1,1]]},video:{context:"outstream",playerSize:[1,1]}},sizes:[[1,1]]},gpt_caja1:{code:"/28253241/elcomercio/web/post/"+i+"/caja1",dispositivo:"desktop",bids:[{bidder:"rubicon",labels:["desktop"],params:{zoneId:"1716978",siteId:"215748",accountId:"19186"}},{bidder:"appnexus",labels:["desktop"],params:{placementId:"19311824"}},{bidder:"criteo",labels:["desktop"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["desktop"],params:{siteId:"316981",pageId:"1239539",formatId:"90175"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036440"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036448"}}],mediaTypes:{banner:{sizes:[[300,250],[300,600],[320,100]]}},sizes:[[300,250],[300,600],[320,100]]},gpt_caja2:{code:"/28253241/elcomercio/web/post/"+i+"/caja2",dispositivo:"desktop",bids:[{bidder:"rubicon",labels:["desktop"],params:{zoneId:"1717492",siteId:"215748",accountId:"19186"}},{bidder:"appnexus",labels:["desktop"],params:{placementId:"19311825"}},{bidder:"criteo",labels:["desktop"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["desktop"],params:{siteId:"316981",pageId:"1239539",formatId:"90176"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036443"}}],mediaTypes:{banner:{sizes:[[300,250],[300,600],[320,100]]}},sizes:[[300,250],[300,600],[320,100]]},gpt_laterall:{code:"/28253241/elcomercio/web/post/"+i+"/laterall",dispositivo:"desktop",bids:[{bidder:"rubicon",labels:["desktop"],params:{zoneId:"1716980",siteId:"215748",accountId:"19186"}},{bidder:"appnexus",labels:["desktop"],params:{placementId:"19311820"}},{bidder:"criteo",labels:["desktop"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["desktop"],params:{siteId:"316981",pageId:"1239539",formatId:"90173"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036437"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036445"}}],mediaTypes:{banner:{sizes:[[120,600],[160,600]]}},sizes:[[120,600],[160,600]]},gpt_lateralr:{code:"/28253241/elcomercio/web/post/"+i+"/lateralr",dispositivo:"desktop",bids:[{bidder:"rubicon",labels:["desktop"],params:{zoneId:"1716982",siteId:"215748",accountId:"19186"}},{bidder:"appnexus",labels:["desktop"],params:{placementId:"19311821"}},{bidder:"criteo",labels:["desktop"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["desktop"],params:{siteId:"316981",pageId:"1239539",formatId:"90174"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036439"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036447"}}],mediaTypes:{banner:{sizes:[[120,600],[160,600]]}},sizes:[[120,600],[160,600]]},gpt_top:{code:"/28253241/elcomercio/web/post/"+i+"/top",dispositivo:"desktop, mobile",bids:[{bidder:"rubicon",labels:["desktop","phone"],params:{accountId:"19186",siteId:e?"215750":"215748",zoneId:e?"1717102":"1716974"}},{bidder:"appnexus",labels:["desktop","phone"],params:{placementId:e?"19311836":"19311817"}},{bidder:"criteo",labels:["desktop","phone"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["desktop","phone"],params:{siteId:"316981",pageId:e?"1239540":"1239539",formatId:"74156"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036436"}},{bidder:"pubmatic",labels:["desktop","phone"],params:{publisherId:"157414",adSlot:e?"3036435":"3036442"}}],mediaTypes:{banner:{sizes:[[320,50],[970,250],[728,90]]}},sizes:[[320,50],[970,250],[728,90]]},gpt_zocalo:{code:"/28253241/elcomercio/web/post/"+i+"/zocalo",dispositivo:"desktop",bids:[{bidder:"rubicon",labels:["desktop","phone"],params:{accountId:"19186",siteId:e?"215750":"215748",zoneId:e?"1717104":"1716976"}},{bidder:"appnexus",labels:["desktop","phone"],params:{placementId:e?"19311837":"19311818"}},{bidder:"criteo",labels:["desktop","phone"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["desktop","phone"],params:{siteId:"316981",pageId:e?"1239540":"1239539",formatId:"74162"}},{bidder:"pubmatic",labels:["desktop","phone"],params:{publisherId:"157414",adSlot:e?"3036434":"3036444"}}],mediaTypes:{banner:{sizes:[[320,50],[728,90]]}},sizes:[[320,50],[728,90]]},gpt_caja3:{code:"/28253241/elcomercio/web/post/"+i+"/caja3",dispositivo:"mobile",bids:[{bidder:"rubicon",labels:["phone"],params:{zoneId:"1717106",siteId:"215750",accountId:"19186"}},{bidder:"appnexus",labels:["phone"],params:{placementId:"19311838"}},{bidder:"criteo",labels:["phone"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["phone"],params:{siteId:"316981",pageId:"1239540",formatId:"90177"}},{bidder:"pubmatic",labels:["phone"],params:{publisherId:"157414",adSlot:"3036438"}}],mediaTypes:{banner:{sizes:[[300,250]]}},sizes:[[300,250]]},gpt_caja4:{code:"/28253241/elcomercio/web/post/"+i+"/caja4",dispositivo:"mobile",bids:[{bidder:"rubicon",labels:["phone"],params:{zoneId:"1717108",siteId:"215750",accountId:"19186"}},{bidder:"appnexus",labels:["phone"],params:{placementId:"19311839"}},{bidder:"criteo",labels:["phone"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["phone"],params:{siteId:"316981",pageId:"1239540",formatId:"90178"}},{bidder:"pubmatic",labels:["phone"],params:{publisherId:"157414",adSlot:"3036446"}}],mediaTypes:{banner:{sizes:[[300,250]]}},sizes:[[300,250]]},gpt_caja5:{code:"/28253241/elcomercio/web/post/"+i+"/caja5",dispositivo:"mobile",bids:[{bidder:"rubicon",labels:["phone"],params:{zoneId:"1717110",siteId:"215750",accountId:"19186"}},{bidder:"appnexus",labels:["phone"],params:{placementId:"19311840"}},{bidder:"criteo",labels:["phone"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["phone"],params:{siteId:"316981",pageId:"1239540",formatId:"90179"}},{bidder:"pubmatic",labels:["phone"],params:{publisherId:"157414",adSlot:"3036441"}}],mediaTypes:{banner:{sizes:[[300,250]]}},sizes:[[300,250]]}},b=a.filter(function(e){return"true"===e.getAttribute("data-ads-load-first")})||[];(b.filter(function(e){return e.getAttribute("data-prebid-enabled")})||[]).forEach(function(e){var a=l[e.id];a&&adUnitsSet.push(a)}),adUnitsSet.length>0&&(pbjs.que=pbjs.que||[],googletag.cmd.push(function(){googletag.pubads().disableInitialLoad()}),d()),requestIdle(function(){googletag.cmd.push(function(){googletag.pubads().enableSingleRequest(),googletag.enableServices()})});var c=function(){var e="no";if(window.localStorage&&window.localStorage.hasOwnProperty("ArcId.USER_INFO")&&"{}"!==window.localStorage.getItem("ArcId.USER_INFO")){var a=JSON.parse(window.localStorage.getItem("ArcId.USER_INFO")).uuid,s=JSON.parse(window.localStorage.getItem("ArcP")||"{}")[a];s&&s.sub.p.length&&(e="si")}else e="no";return e}(),u=function(a){var s,d,t,p=a||{},n=p.getAttribute("data-ads-name").replace("snota",i),l=e?p.getAttribute("data-ads-dimensions-m"):p.getAttribute("data-ads-dimensions"),b=JSON.parse(l||"[]"),u=p.id;d=n,t=u,(s=b).length>0&&googletag.cmd.push(function(){googletag.defineSlot(d,s,t).addService(googletag.pubads()).setTargeting("ab_test","").setTargeting("categoria",r).setTargeting("contenido","st_value3").setTargeting("fuente","WEB").setTargeting("paywall",c).setTargeting("phatname","st_value6").setTargeting("publisher",o).setTargeting("seccion",i).setTargeting("tags","st_value9").setTargeting("tipoplantilla","post").setTargeting("tmp_ad","")})},m=function(e){var a=(e||{}).id;googletag.cmd.push(function(){googletag.display(a)})};b.length>0&&requestIdle(function(){b.forEach(u),b.forEach(m)}),requestIdle(function(){var e=a.filter(function(e){return"true"!==e.getAttribute("data-ads-load-first")})||[],s=function(e,a){e.forEach(function(e){var s=e.isIntersecting,t=e.target;if(s){var i=l[t.id];i&&(adUnitsSet=[i],googletag.cmd.push(function(){googletag.pubads().disableInitialLoad()}),d()),requestIdle(function(){u(t),m(t)}),a.unobserve(t)}})};if("IntersectionObserver"in window){var t={rootMargin:"0px 0px 200px 0px"};e.forEach(function(e){new IntersectionObserver(s,t).observe(e)})}})}})});`
    .replace(/st_value3/g, typeContent)
    .replace(/st_value6/g, `${siteProperties.siteUrl}${requestUri}`)
    .replace(/st_value9/g, targetingTags)
  return (
    <>
      <script
        async
        src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
      <script
        async
        src="https://d34fzxxwb5p53o.cloudfront.net/output/assets/js/prebid.js?v=2020-07-13"></script>
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
