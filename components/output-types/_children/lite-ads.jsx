/* eslint-disable */
import React from 'react'

const LiteAds = ({ requestUri, tags, contentCode, siteProperties }) => {
  /* 
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
 */

  const adsConfig = `"use strict";requestIdle(function(){window.isMobile=/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent);var e=[].slice.call(document.querySelectorAll(isMobile?"div[data-ads-name][data-ads-dimensions-m]":"div[data-ads-name][data-ads-dimensions]"));window.existAds=e.length>0,window.loadFirstAds=e.filter(function(e){return"true"===e.getAttribute("data-ads-load-first")})||[],window.loadLazilyAds=e.filter(function(e){return"true"!==e.getAttribute("data-ads-load-first")})||[],window.lazier=function(e,i,t){void 0===t&&(t="0px 0px 200px 0px");var n=function(e,t){e.forEach(function(e){var n=e.isIntersecting,a=e.target;n&&(i(a),t.unobserve(a))})};if("IntersectionObserver"in window){var a={rootMargin:t};e.forEach(function(e){new IntersectionObserver(n,a).observe(e)})}}});`

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

  const initPrebid = `"use strict";window.addEventListener("load",function(){requestIdle(function(){var e=window,d=e.isMobile,s=e.section,a=e.existAds,i=e.loadFirstAds;if(window.adUnits={gpt_inline:{code:"/28253241/elcomercio/web/post/"+s+"/inline",dispositivo:"desktop, mobile",bids:[{bidder:"appnexus",labels:["desktop","phone"],params:{placementId:"19732211"}},{bidder:"criteo",labels:["desktop","phone"],params:{networkId:"7890"}},{bidder:"pubmatic",labels:["desktop","phone"],params:{publisherId:"157414",adSlot:"3040991"}}],mediaTypes:{banner:{sizes:[[1,1]]},video:{context:"outstream",playerSize:[1,1]}},sizes:[[1,1]]},gpt_caja1:{code:"/28253241/elcomercio/web/post/"+s+"/caja1",dispositivo:"desktop",bids:[{bidder:"rubicon",labels:["desktop"],params:{zoneId:"1716978",siteId:"215748",accountId:"19186"}},{bidder:"appnexus",labels:["desktop"],params:{placementId:"19311824"}},{bidder:"criteo",labels:["desktop"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["desktop"],params:{siteId:"316981",pageId:"1239539",formatId:"90175"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036440"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036448"}}],mediaTypes:{banner:{sizes:[[300,250],[300,600],[320,100]]}},sizes:[[300,250],[300,600],[320,100]]},gpt_caja2:{code:"/28253241/elcomercio/web/post/"+s+"/caja2",dispositivo:"desktop",bids:[{bidder:"rubicon",labels:["desktop"],params:{zoneId:"1717492",siteId:"215748",accountId:"19186"}},{bidder:"appnexus",labels:["desktop"],params:{placementId:"19311825"}},{bidder:"criteo",labels:["desktop"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["desktop"],params:{siteId:"316981",pageId:"1239539",formatId:"90176"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036443"}}],mediaTypes:{banner:{sizes:[[300,250],[300,600],[320,100]]}},sizes:[[300,250],[300,600],[320,100]]},gpt_laterall:{code:"/28253241/elcomercio/web/post/"+s+"/laterall",dispositivo:"desktop",bids:[{bidder:"rubicon",labels:["desktop"],params:{zoneId:"1716980",siteId:"215748",accountId:"19186"}},{bidder:"appnexus",labels:["desktop"],params:{placementId:"19311820"}},{bidder:"criteo",labels:["desktop"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["desktop"],params:{siteId:"316981",pageId:"1239539",formatId:"90173"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036437"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036445"}}],mediaTypes:{banner:{sizes:[[120,600],[160,600]]}},sizes:[[120,600],[160,600]]},gpt_lateralr:{code:"/28253241/elcomercio/web/post/"+s+"/lateralr",dispositivo:"desktop",bids:[{bidder:"rubicon",labels:["desktop"],params:{zoneId:"1716982",siteId:"215748",accountId:"19186"}},{bidder:"appnexus",labels:["desktop"],params:{placementId:"19311821"}},{bidder:"criteo",labels:["desktop"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["desktop"],params:{siteId:"316981",pageId:"1239539",formatId:"90174"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036439"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036447"}}],mediaTypes:{banner:{sizes:[[120,600],[160,600]]}},sizes:[[120,600],[160,600]]},gpt_top:{code:"/28253241/elcomercio/web/post/"+s+"/top",dispositivo:"desktop, mobile",bids:[{bidder:"rubicon",labels:["desktop","phone"],params:{accountId:"19186",siteId:d?"215750":"215748",zoneId:d?"1717102":"1716974"}},{bidder:"appnexus",labels:["desktop","phone"],params:{placementId:d?"19311836":"19311817"}},{bidder:"criteo",labels:["desktop","phone"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["desktop","phone"],params:{siteId:"316981",pageId:d?"1239540":"1239539",formatId:"74156"}},{bidder:"pubmatic",labels:["desktop"],params:{publisherId:"157414",adSlot:"3036436"}},{bidder:"pubmatic",labels:["desktop","phone"],params:{publisherId:"157414",adSlot:d?"3036435":"3036442"}}],mediaTypes:{banner:{sizes:[[320,50],[970,250],[728,90]]}},sizes:[[320,50],[970,250],[728,90]]},gpt_zocalo:{code:"/28253241/elcomercio/web/post/"+s+"/zocalo",dispositivo:"desktop",bids:[{bidder:"rubicon",labels:["desktop","phone"],params:{accountId:"19186",siteId:d?"215750":"215748",zoneId:d?"1717104":"1716976"}},{bidder:"appnexus",labels:["desktop","phone"],params:{placementId:d?"19311837":"19311818"}},{bidder:"criteo",labels:["desktop","phone"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["desktop","phone"],params:{siteId:"316981",pageId:d?"1239540":"1239539",formatId:"74162"}},{bidder:"pubmatic",labels:["desktop","phone"],params:{publisherId:"157414",adSlot:d?"3036434":"3036444"}}],mediaTypes:{banner:{sizes:[[320,50],[728,90]]}},sizes:[[320,50],[728,90]]},gpt_caja3:{code:"/28253241/elcomercio/web/post/"+s+"/caja3",dispositivo:"mobile",bids:[{bidder:"rubicon",labels:["phone"],params:{zoneId:"1717106",siteId:"215750",accountId:"19186"}},{bidder:"appnexus",labels:["phone"],params:{placementId:"19311838"}},{bidder:"criteo",labels:["phone"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["phone"],params:{siteId:"316981",pageId:"1239540",formatId:"90177"}},{bidder:"pubmatic",labels:["phone"],params:{publisherId:"157414",adSlot:"3036438"}}],mediaTypes:{banner:{sizes:[[300,250]]}},sizes:[[300,250]]},gpt_caja4:{code:"/28253241/elcomercio/web/post/"+s+"/caja4",dispositivo:"mobile",bids:[{bidder:"rubicon",labels:["phone"],params:{zoneId:"1717108",siteId:"215750",accountId:"19186"}},{bidder:"appnexus",labels:["phone"],params:{placementId:"19311839"}},{bidder:"criteo",labels:["phone"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["phone"],params:{siteId:"316981",pageId:"1239540",formatId:"90178"}},{bidder:"pubmatic",labels:["phone"],params:{publisherId:"157414",adSlot:"3036446"}}],mediaTypes:{banner:{sizes:[[300,250]]}},sizes:[[300,250]]},gpt_caja5:{code:"/28253241/elcomercio/web/post/"+s+"/caja5",dispositivo:"mobile",bids:[{bidder:"rubicon",labels:["phone"],params:{zoneId:"1717110",siteId:"215750",accountId:"19186"}},{bidder:"appnexus",labels:["phone"],params:{placementId:"19311840"}},{bidder:"criteo",labels:["phone"],params:{networkId:"7890"}},{bidder:"smartadserver",labels:["phone"],params:{siteId:"316981",pageId:"1239540",formatId:"90179"}},{bidder:"pubmatic",labels:["phone"],params:{publisherId:"157414",adSlot:"3036441"}}],mediaTypes:{banner:{sizes:[[300,250]]}},sizes:[[300,250]]}},a){var p=function(){pbjs.que.push(function(){pbjs.addAdUnits(adUnitsSet),pbjs.setConfig({userSync:{filterSettings:{iframe:{bidders:"*",filter:"include"}}},priceGranularity:"high",sizeConfig:[{mediaQuery:"(min-width: 1024px)",sizesSupported:[[970,250],[970,90],[728,90],[300,250],[300,600],[160,600],[120,600]],labels:["desktop"]},{mediaQuery:"(min-width: 300px) and (max-width: 768px)",sizesSupported:[[320,50],[300,250]],labels:["phone"]}]})})};window.googletag=window.googletag||{cmd:[]},window.pbjs=window.pbjs||{},window.adUnitsSet=[];var o=window.adUnits,r=i.filter(function(e){return e.getAttribute("data-prebid-enabled")})||[];r&&r.length>0&&(r.forEach(function(e){var d=o[e.id];d&&adUnitsSet.push(d)}),adUnitsSet.length>0&&p());var t=window.loadLazilyAds.filter(function(e){return o[e.id]})||[];t&&t.length>0&&window.lazier(t,function(e){var d=o[e.id];d&&(adUnitsSet=[d],p())})}})});`

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
              const gptSlots = adSlots.filter(ad => typeof adUnits[ad.getSlotElementId()] !== undefined)
              requestIdle(() => requestBids(adUnitsCodes, gptSlots))
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
  const initDfp = `"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}window.addEventListener("load",function(){requestIdle(function(){var t=window,e=t.isMobile,n=t.existAds,o=t.loadFirstAds;if(n){var i=function(t,e){pbjs.que.push(function(){pbjs.requestBids({timeout:a,adUnitCodes:t,bidsBackHandler:function(){!function(t,e){googletag.cmd.push(function(){pbjs.que.push(function(){pbjs.setTargetingForGPTAsync(t),googletag.pubads().refresh(e)})})}(t,e)}})})},a=3e3;window.googletag=window.googletag||{cmd:[]},window.pbjs=window.pbjs||{};var s=[],r=window,g=r.section,d=r.arcSite,l=r.subsection;requestIdle(function(){googletag.cmd.push(function(){googletag.pubads().disableInitialLoad(),googletag.pubads().enableSingleRequest(),googletag.enableServices()})});var u=function(){var t="no";if(window.localStorage&&window.localStorage.hasOwnProperty("ArcId.USER_INFO")&&"{}"!==window.localStorage.getItem("ArcId.USER_INFO")){var e=JSON.parse(window.localStorage.getItem("ArcId.USER_INFO")).uuid,n=JSON.parse(window.localStorage.getItem("ArcP")||"{}")[e];n&&n.sub.p.length&&(t="si")}else t="no";return t}(),c=function(t){var n=t||{},o=n.getAttribute("data-ads-name").replace("snota",g),i=e?n.getAttribute("data-ads-dimensions-m"):n.getAttribute("data-ads-dimensions"),a=JSON.parse(i||"[]");return{id:n.id,name:o,dimensions:a}},f=function(t){var e=c(t);!function(t,e,n){n.length>0&&s.push(googletag.defineSlot(e,n,t).addService(googletag.pubads()).setTargeting("ab_test","").setTargeting("categoria",l).setTargeting("contenido","st_value3").setTargeting("fuente","WEB").setTargeting("paywall",u).setTargeting("phatname","st_value6").setTargeting("publisher",d).setTargeting("seccion",g).setTargeting("tags","st_value9").setTargeting("tipoplantilla","post").setTargeting("tmp_ad",""))}(e.id,e.name,e.dimensions)},p=function(t){googletag.cmd.push(function(){googletag.display(t.getSlotElementId())})};o.length>0&&requestIdle(function(){!function(){if(o.forEach(f),s.forEach(p),adUnitsSet.length>0){var t=adUnitsSet.map(function(t){return t.code}),e=s.filter(function(t){return void 0!==_typeof(adUnits[t.getSlotElementId()])});requestIdle(function(){return i(t,e)})}}()});var m=window.loadLazilyAds;m&&m.length>0&&window.lazier(m,function(t){if(s=[],f(t),s.length>0){p(s[0]);var e=adUnits[t.id];if(e){var n=c(t);n.id,n.name,n.dimensions;i([e.code],s)}}})}})});`
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
  )
}

export default LiteAds
