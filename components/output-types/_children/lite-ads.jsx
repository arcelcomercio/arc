/* eslint-disable */
import React from 'react'

const LiteAds = ({ requestUri, tags, contentCode, siteProperties }) => {
  /* 
  document.addEventListener('DOMContentLoaded', () => {
    requestIdle(function initLiteAdsConfig() {
      window.isMobile = /iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent)
      
      // filtra ads en el DOM segun dispositivo
      const adsSlots = [].slice.call(document.querySelectorAll(isMobile ? 'div[data-ads-name][data-ads-dimensions-m]' : 'div[data-ads-name][data-ads-dimensions]'))
      // filtra ads con carga inmediata
      window.existAds = adsSlots.length > 0
      window.loadFirstAds = adsSlots.filter(slot => slot.getAttribute('data-ads-load-first') === "true") || []
      window.loadLazilyAds = adsSlots.filter(slot => slot.getAttribute('data-ads-load-first') !== "true") || []
      window.lazier = function lazier(elementToObserve, intersectionCb, rootMargin = '0px 0px 200px 0px') {
        const adsObserver = (entries, observer) => {
          entries.forEach(entry => {
            const { isIntersecting, target } = entry
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
    })
  })
 */

  const adsConfig = `"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){window.isMobile=/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent);var e=[].slice.call(document.querySelectorAll(isMobile?"div[data-ads-name][data-ads-dimensions-m]":"div[data-ads-name][data-ads-dimensions]"));window.existAds=e.length>0,window.loadFirstAds=e.filter(function(e){return"true"===e.getAttribute("data-ads-load-first")})||[],window.loadLazilyAds=e.filter(function(e){return"true"!==e.getAttribute("data-ads-load-first")})||[],window.lazier=function(e,t,n){void 0===n&&(n="0px 0px 200px 0px");var i=function(e,n){e.forEach(function(e){var i=e.isIntersecting,d=e.target;i&&(t(d),n.unobserve(d))})};if("IntersectionObserver"in window){var d={rootMargin:n};e.forEach(function(e){new IntersectionObserver(i,d).observe(e)})}}})});`

  /* 
  window.addEventListener('load', function prebidAds() {
    requestIdle(function initPrebidAds() {
      const {
        isMobile,
        section,
        existAds,
        loadFirstAds
      } = window

      window.adUnits = {
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

      if (existAds) {
        
        window.googletag = window.googletag || { cmd: [] }
        window.pbjs = window.pbjs || {};
        window.adUnitsSet = []
        const { 
          adUnits
        } = window;

        function initPrebid() {
          function pushPrebidConfig() {
            pbjs.addAdUnits(adUnitsSet);
            pbjs.setConfig({
              userSync: {
                syncEnabled: true,
                filterSettings:{
                  image:{ bidders:"*",filter:"include" },
                  iframe:{ bidders:"smartadserver",filter:"include" },
                  syncsPerBidder:5,syncDelay:3000,auctionDelay:0
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
            })
          }
          
          pbjs.que.push(pushPrebidConfig)
        }
        
        // filtra ads de carga inmediata con prebid activado 
        const loadFirstPrebid = loadFirstAds.filter(slot => slot.getAttribute('data-prebid-enabled')) || []

        if(loadFirstPrebid && loadFirstPrebid.length > 0) {
          // extrae config de prebid de los ads filtrados previamente
          loadFirstPrebid.forEach(unit => {
            const prebidUnit = adUnits[unit.id]
            if(prebidUnit) adUnitsSet.push(prebidUnit)
          })
  
          if(adUnitsSet.length > 0) {
            initPrebid()
          }
        }

        const { loadLazilyAds } = window
        const lazyPrebidAds = loadLazilyAds.filter(pbad => adUnits[pbad.id]) || []

        if(lazyPrebidAds && lazyPrebidAds.length > 0) {
          window.lazier(lazyPrebidAds, function(target){
            const prebidUnit = adUnits[target.id]
            if(prebidUnit) {
              adUnitsSet = [prebidUnit]
              initPrebid()
            }
          })
        }
      }
    })
  })
 */

  const initPrebid = `"use strict";window.addEventListener("load",function(){requestIdle(function(){var e=window,d=e.isMobile,a=e.section,s=e.existAds,i=e.loadFirstAds;if(window.adUnits={gpt_caja1:{code:"/28253241/elcomercio/web/post/"+a+"/caja1",dispositivo:"desktop",bids:[{bidder:"rubicon",labels:["desktop"],params:{zoneId:"1716978",siteId:"215748",accountId:"19186"}},{bidder:"appnexus",labels:["desktop"],params:{placementId:"19311824"}},{bidder:"criteo",labels:["desktop"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["desktop"],params:{siteId:"316981",pageId:"1239539",formatId:"90175"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036440"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036448"}}],mediaTypes:{banner:{sizes:[[300,250],[300,600],[320,100]]}},sizes:[[300,250],[300,600],[320,100]]},gpt_caja2:{code:"/28253241/elcomercio/web/post/"+a+"/caja2",dispositivo:"desktop",bids:[{bidder:"rubicon",labels:["desktop"],params:{zoneId:"1717492",siteId:"215748",accountId:"19186"}},{bidder:"appnexus",labels:["desktop"],params:{placementId:"19311825"}},{bidder:"criteo",labels:["desktop"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["desktop"],params:{siteId:"316981",pageId:"1239539",formatId:"90176"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036443"}}],mediaTypes:{banner:{sizes:[[300,250],[300,600],[320,100]]}},sizes:[[300,250],[300,600],[320,100]]},gpt_laterall:{code:"/28253241/elcomercio/web/post/"+a+"/laterall",dispositivo:"desktop",bids:[{bidder:"rubicon",labels:["desktop"],params:{zoneId:"1716980",siteId:"215748",accountId:"19186"}},{bidder:"appnexus",labels:["desktop"],params:{placementId:"19311820"}},{bidder:"criteo",labels:["desktop"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["desktop"],params:{siteId:"316981",pageId:"1239539",formatId:"90173"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036437"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036445"}}],mediaTypes:{banner:{sizes:[[120,600],[160,600]]}},sizes:[[120,600],[160,600]]},gpt_lateralr:{code:"/28253241/elcomercio/web/post/"+a+"/lateralr",dispositivo:"desktop",bids:[{bidder:"rubicon",labels:["desktop"],params:{zoneId:"1716982",siteId:"215748",accountId:"19186"}},{bidder:"appnexus",labels:["desktop"],params:{placementId:"19311821"}},{bidder:"criteo",labels:["desktop"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["desktop"],params:{siteId:"316981",pageId:"1239539",formatId:"90174"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036439"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036447"}}],mediaTypes:{banner:{sizes:[[120,600],[160,600]]}},sizes:[[120,600],[160,600]]},gpt_top:{code:"/28253241/elcomercio/web/post/"+a+"/top",dispositivo:"desktop, mobile",bids:[{bidder:"rubicon",labels:["desktop","phone"],params:{accountId:"19186",siteId:d?"215750":"215748",zoneId:d?"1717102":"1716974"}},{bidder:"appnexus",labels:["desktop","phone"],params:{placementId:d?"19311836":"19311817"}},{bidder:"criteo",labels:["desktop","phone"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["desktop","phone"],params:{siteId:"316981",pageId:d?"1239540":"1239539",formatId:"74156"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036436"}},{bidder:"pubmatic",labels:["desktop","phone"],params:{publisherId:"157414",adSlot:d?"3036435":"3036442"}}],mediaTypes:{banner:{sizes:[[320,50],[970,250],[728,90]]}},sizes:[[320,50],[970,250],[728,90]]},gpt_zocalo:{code:"/28253241/elcomercio/web/post/"+a+"/zocalo",dispositivo:"desktop",bids:[{bidder:"rubicon",labels:["desktop","phone"],params:{accountId:"19186",siteId:d?"215750":"215748",zoneId:d?"1717104":"1716976"}},{bidder:"appnexus",labels:["desktop","phone"],params:{placementId:d?"19311837":"19311818"}},{bidder:"criteo",labels:["desktop","phone"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["desktop","phone"],params:{siteId:"316981",pageId:d?"1239540":"1239539",formatId:"74162"}},{bidder:"pubmatic",labels:["desktop","phone"],params:{publisherId:"157414",adSlot:d?"3036434":"3036444"}}],mediaTypes:{banner:{sizes:[[320,50],[728,90]]}},sizes:[[320,50],[728,90]]},gpt_caja3:{code:"/28253241/elcomercio/web/post/"+a+"/caja3",dispositivo:"mobile",bids:[{bidder:"rubicon",labels:["phone"],params:{zoneId:"1717106",siteId:"215750",accountId:"19186"}},{bidder:"appnexus",labels:["phone"],params:{placementId:"19311838"}},{bidder:"criteo",labels:["phone"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["phone"],params:{siteId:"316981",pageId:"1239540",formatId:"90177"}},{bidder:"pubmatic",labels:["phone"],params:{publisherId:"157414",adSlot:"3036438"}}],mediaTypes:{banner:{sizes:[[300,250]]}},sizes:[[300,250]]},gpt_caja4:{code:"/28253241/elcomercio/web/post/"+a+"/caja4",dispositivo:"mobile",bids:[{bidder:"rubicon",labels:["phone"],params:{zoneId:"1717108",siteId:"215750",accountId:"19186"}},{bidder:"appnexus",labels:["phone"],params:{placementId:"19311839"}},{bidder:"criteo",labels:["phone"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["phone"],params:{siteId:"316981",pageId:"1239540",formatId:"90178"}},{bidder:"pubmatic",labels:["phone"],params:{publisherId:"157414",adSlot:"3036446"}}],mediaTypes:{banner:{sizes:[[300,250]]}},sizes:[[300,250]]},gpt_caja5:{code:"/28253241/elcomercio/web/post/"+a+"/caja5",dispositivo:"mobile",bids:[{bidder:"rubicon",labels:["phone"],params:{zoneId:"1717110",siteId:"215750",accountId:"19186"}},{bidder:"appnexus",labels:["phone"],params:{placementId:"19311840"}},{bidder:"criteo",labels:["phone"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["phone"],params:{siteId:"316981",pageId:"1239540",formatId:"90179"}},{bidder:"pubmatic",labels:["phone"],params:{publisherId:"157414",adSlot:"3036441"}}],mediaTypes:{banner:{sizes:[[300,250]]}},sizes:[[300,250]]}},s){var r=function(){pbjs.que.push(function(){pbjs.addAdUnits(adUnitsSet),pbjs.setConfig({userSync:{syncEnabled:!0,filterSettings:{image:{bidders:"*",filter:"include"},iframe:{bidders:"smartadserver",filter:"include"},syncsPerBidder:5,syncDelay:3e3,auctionDelay:0}},priceGranularity:"high",sizeConfig:[{mediaQuery:"(min-width: 1024px)",sizesSupported:[[970,250],[970,90],[728,90],[300,250],[300,600],[160,600],[120,600]],labels:["desktop"]},{mediaQuery:"(min-width: 300px) and (max-width: 768px)",sizesSupported:[[320,50],[300,250]],labels:["phone"]}]})})};window.googletag=window.googletag||{cmd:[]},window.pbjs=window.pbjs||{},window.adUnitsSet=[];var o=window.adUnits,p=i.filter(function(e){return e.getAttribute("data-prebid-enabled")})||[];p&&p.length>0&&(p.forEach(function(e){var d=o[e.id];d&&adUnitsSet.push(d)}),adUnitsSet.length>0&&r());var t=window.loadLazilyAds.filter(function(e){return o[e.id]})||[];t&&t.length>0&&window.lazier(t,function(e){var d=o[e.id];d&&(adUnitsSet=[d],r())})}})});`

  /* 
    window.addEventListener('load', function liteAds() {
      requestIdle(function initLiteAds() {
        const {
          isMobile, 
          existAds,
          loadFirstAds
        } = window

        if (existAds) {
          const PREBID_TIMEOUT = 3000
          // Solo ejecuta si existen ads
          window.googletag = window.googletag || { cmd: [] }
          window.pbjs = window.pbjs || {};
          let adSlots = []

          const { 
            section, 
            arcSite, 
            subsection,
          } = window;

          requestIdle(() => {
            googletag.cmd.push(function() {
              googletag.pubads().disableInitialLoad()
              googletag.pubads().enableSingleRequest()
              googletag.pubads().collapseEmptyDivs()
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
          
          const pushAds = (id, name, dimensions) => {
            if (dimensions.length > 0) {
              adSlots.push(
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
                .setTargeting("tmp_ad", "")
              )
            }
          }

          const getSlotData = (slot) => {
            const ad = slot || {}
            const adName = ad.getAttribute('data-ads-name').replace('snota',section)
            const adDimensions = isMobile ? ad.getAttribute('data-ads-dimensions-m') : ad.getAttribute('data-ads-dimensions')
            const adParsedDimensions = JSON.parse(adDimensions || "[]")
            const adId = ad.id
            return {
              id: adId,
              name: adName,
              dimensions: adParsedDimensions
            }
          }

          const pushSlot = (slot) => {
            const { id, name, dimensions } = getSlotData(slot)
            pushAds(id, name, dimensions)
          }
          
          const displaySlot = (slot) => {
            googletag.cmd.push(function() {
              googletag.display(slot.getSlotElementId())
            })
          }

          function prebidLoad(adUnitsCodes, gptSlots) {
            googletag.cmd.push(function() {
              pbjs.que.push(function() {
                pbjs.setTargetingForGPTAsync(adUnitsCodes)
                googletag.pubads().refresh(gptSlots)
              });
            });
          }

          function requestBids(adUnitsCodes, gptSlots) {
            pbjs.que.push(function() {
              pbjs.requestBids({
                timeout: PREBID_TIMEOUT,
                adUnitCodes: adUnitsCodes,
                bidsBackHandler: function(){
                  prebidLoad(adUnitsCodes, gptSlots)
                }
              });
            })
          }

          const firstRequest = () => {
            loadFirstAds.forEach(pushSlot) 
            adSlots.forEach(displaySlot)
            if(adUnitsSet.length > 0) {
              const adUnitsCodes = adUnitsSet.map(adUnit => adUnit.code)
              requestIdle(() => requestBids(adUnitsCodes, adSlots))
            } else {
              requestIdle(() => {
                googletag.cmd.push(function() {
                  googletag.pubads().refresh(adSlots)
                });
              })
            }
          }
          
          if(loadFirstAds.length > 0) requestIdle(function() {firstRequest()})

          const { loadLazilyAds } = window
          if(loadLazilyAds && loadLazilyAds.length > 0) {
            window.lazier(loadLazilyAds, function(target){
              adSlots = []
              pushSlot(target)
              if(adSlots.length > 0) {
                displaySlot(adSlots[0])
                const prebidUnit = adUnits[target.id]
                if(prebidUnit) {
                  const { id, name, dimensions } = getSlotData(target)
                  requestBids([prebidUnit.code], adSlots)
                } else {
                  googletag.cmd.push(function() {
                    googletag.pubads().refresh(adSlots)
                  });
                }
              }
            })
          }
        }
      })
    })
 */

  const typeContent = contentCode === '' ? 'standar' : contentCode
  const targetingTags = tags.map(({ slug = '' }) => slug.split('-').join(''))
  const initDfp = `"use strict";window.addEventListener("load",function(){requestIdle(function(){var e=window,t=e.isMobile,n=e.existAds,a=e.loadFirstAds;if(n){var o=function(e,t){pbjs.que.push(function(){pbjs.requestBids({timeout:i,adUnitCodes:e,bidsBackHandler:function(){!function(e,t){googletag.cmd.push(function(){pbjs.que.push(function(){pbjs.setTargetingForGPTAsync(e),googletag.pubads().refresh(t)})})}(e,t)}})})},i=3e3;window.googletag=window.googletag||{cmd:[]},window.pbjs=window.pbjs||{};var s=[],g=window,d=g.section,r=g.arcSite,l=g.subsection;requestIdle(function(){googletag.cmd.push(function(){googletag.pubads().disableInitialLoad(),googletag.pubads().enableSingleRequest(),googletag.pubads().collapseEmptyDivs(),googletag.enableServices()})});var u=function(){var e="no";if(window.localStorage&&window.localStorage.hasOwnProperty("ArcId.USER_INFO")&&"{}"!==window.localStorage.getItem("ArcId.USER_INFO")){var t=JSON.parse(window.localStorage.getItem("ArcId.USER_INFO")).uuid,n=JSON.parse(window.localStorage.getItem("ArcP")||"{}")[t];n&&n.sub.p.length&&(e="si")}else e="no";return e}(),c=function(e){var n=e||{},a=n.getAttribute("data-ads-name").replace("snota",d),o=t?n.getAttribute("data-ads-dimensions-m"):n.getAttribute("data-ads-dimensions"),i=JSON.parse(o||"[]");return{id:n.id,name:a,dimensions:i}},p=function(e){var t=c(e);!function(e,t,n){n.length>0&&s.push(googletag.defineSlot(t,n,e).addService(googletag.pubads()).setTargeting("ab_test","").setTargeting("categoria",l).setTargeting("contenido","st_value3").setTargeting("fuente","WEB").setTargeting("paywall",u).setTargeting("phatname","st_value6").setTargeting("publisher",r).setTargeting("seccion",d).setTargeting("tags","st_value9").setTargeting("tipoplantilla","post").setTargeting("tmp_ad",""))}(t.id,t.name,t.dimensions)},f=function(e){googletag.cmd.push(function(){googletag.display(e.getSlotElementId())})};a.length>0&&requestIdle(function(){!function(){if(a.forEach(p),s.forEach(f),adUnitsSet.length>0){var e=adUnitsSet.map(function(e){return e.code});requestIdle(function(){return o(e,s)})}else requestIdle(function(){googletag.cmd.push(function(){googletag.pubads().refresh(s)})})}()});var w=window.loadLazilyAds;w&&w.length>0&&window.lazier(w,function(e){if(s=[],p(e),s.length>0){f(s[0]);var t=adUnits[e.id];if(t){var n=c(e);n.id,n.name,n.dimensions;o([t.code],s)}else googletag.cmd.push(function(){googletag.pubads().refresh(s)})}})}})});`
    .replace(/st_value3/g, typeContent)
    .replace(/st_value6/g, `${siteProperties.siteUrl}${requestUri}`)
    .replace(/st_value9/g, targetingTags)

  /* publicidad para seccion mundo */
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
              arcSite,
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
                  "publisher": arcSite,
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

  const adsEconomiaTop = `"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){window.isMobiles=/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent);var t=[].slice.call(document.querySelectorAll(isMobiles?"div[data-ads-name][data-ads-dimensions-m]":"div[data-ads-name][data-ads-dimensions]"));window.existAds=t.length>0,window.lazier=function(t,e,a){void 0===a&&(a="0px 0px 200px 0px");var i=function(t,a){t.forEach(function(t){var i=t.isIntersecting,n=t.target;i&&(e(n),a.unobserve(n))})};if("IntersectionObserver"in window){var n={rootMargin:a};t.forEach(function(t){new IntersectionObserver(i,n).observe(t)})}};var e=window,a=e.section,i=e.arcSite,n=e.subsection,o=function(){var t="no";if(window.localStorage&&window.localStorage.hasOwnProperty("ArcId.USER_INFO")&&"{}"!==window.localStorage.getItem("ArcId.USER_INFO")){var e=JSON.parse(window.localStorage.getItem("ArcId.USER_INFO")).uuid,a=JSON.parse(window.localStorage.getItem("ArcP")||"{}")[e];a&&a.sub.p.length&&(t="si")}else t="no";return t}();window.adsCollection=[],t.forEach(function(t){""!==(isMobiles?t.getAttribute("data-ads-dimensions-m"):t.getAttribute("data-ads-dimensions"))&&window.adsCollection.push(function(t){var e=t||{},s=e.getAttribute("data-ads-name").replace("snota",a).slice(10),d=isMobiles?e.getAttribute("data-ads-dimensions-m"):e.getAttribute("data-ads-dimensions"),r=JSON.parse(d||"[]"),l=e.getAttribute("data-bloque")?e.getAttribute("data-bloque"):1;return{id:e.id,slotName:s,dimensions:r,targeting:{contenido:"st_value3",publisher:i,seccion:a,categoria:n,fuente:"WEB",tipoplantilla:"post",phatname:"st_value6",tags:"st_value9",ab_test:"",paywall:o,tmp_ad:(window.location.search.match(/tmp_ad=([^&]*)/)||[])[1]||""},bloque:l}}(t))})})});`
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

  return (
    <>
      {requestUri.includes('/mundo/') ? (
        <>
          <script
            async
            src={`https://d34fzxxwb5p53o.cloudfront.net/output/assets/js/prebid.js?${new Date()
              .toISOString()
              .slice(0, 10)}`}></script>
          <script
            defer
            src={`https://d1r08wok4169a5.cloudfront.net/ads/elcomercio/arcads.js?${new Date()
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
      ) : (
        <>
          <script
            defer
            src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
          <script
            defer
            src={`https://d34fzxxwb5p53o.cloudfront.net/output/assets/js/prebid.js?${new Date()
              .toISOString()
              .slice(0, 10)}`}></script>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: adsConfig,
            }}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: initPrebid,
            }}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: initDfp,
            }}
          />
        </>
      )}
    </>
  )
}

export default LiteAds
