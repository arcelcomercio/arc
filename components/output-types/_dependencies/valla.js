// TODO: Agregar la lógica sin minificar de este script, no son iguales
/*
const arcEnv = '${arcEnv}'
const arcSite = '${arcSite}'
const getdata = '${getdata}'

document.addEventListener('DOMContentLoaded', () => {
  window.requestIdle(() => {
    const Taggeo = acc => {
      if (typeof window !== 'undefined') {
        window.dataLayer = window.dataLayer || []
        const dataPush = {
          event: 'tag_signwall',
          eventCategory: 'Web_Paywall_Hard',
          eventAction: acc,
        }
        window.dataLayer.push(dataPush)
        if (arcEnv === 'sandbox') {
          window.console.log(dataPush)
        }
      }
    }

    const postExtendSession = oldToken => {
      const response = new Promise(resolve => {
        fetch(
          "https://api${arcEnv === 'sandbox' ? '-sandbox' : ''}.${arcSite}.pe/identity/public/v1/auth/token",
          {
            method: 'POST',
            body: JSON.stringify({
              grantType: 'refresh-token',
              token: oldToken,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          }
        ).then(res => resolve(res.json()))
      })
      return response
    }

    const getEntitlement = newToken => {
      const response = new Promise(resolve => {
        fetch(
          "https://api${arcEnv === 'sandbox' ? '-sandbox' : ''}.${arcSite}.pe/sales/public/v1/entitlements",
          {
            method: 'GET',
            headers: {
              Authorization: newToken,
            },
          }
        ).then(res => resolve(res.json()))
      })
      return response
    }

    const getListSubs = oldRefreshToken => {
      return postExtendSession(oldRefreshToken).then(resExt => {
        const checkEntitlement = getEntitlement(resExt.accessToken)
          .then(res => {
            if (res.skus) {
              const result = Object.keys(res.skus).map(key => {
                return res.skus[key].sku
              })
              return result
            }
            return []
          })
          .catch(err => window.console.error(err))

        return checkEntitlement
      })
    }

    const checkSession = () => {
      if (typeof window !== 'undefined') {
        const profileStorage = window.localStorage.getItem('ArcId.USER_PROFILE')
        const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
        if (profileStorage) {
          return !(profileStorage === 'null' || sesionStorage === '{}') || false
        }
      }
      return false
    }

    const getUrlSignwall = (typeDialog = 'signwallHard', hash = '1') => {
      return arcEnv === 'prod'
        ? `/signwall/?outputType=signwall&${typeDialog}=${hash}`
        : `/signwall/?_website=${arcSite}&outputType=signwall&${typeDialog}=${hash}`
    }

    const getUrlPaywall = () => {
      return arcEnv === 'prod'
        ? `/suscripcionesdigitales/`
        : `/pf/suscripcionesdigitales/?_website=${arcSite}&outputType=subscriptions`
    }

    const getUrlLandingAuth = () => {
      return arcEnv === 'prod'
        ? '/auth-fia/?outputType=signwall'
        : `/pf/auth-fia/?_website=${arcSite}&outputType=signwall`
    }

    const getUrlSignwallHash = () => {
      return arcEnv === 'prod'
        ? `/signwall/?outputType=signwall&reloginHash=1`
        : `/signwall/?_website=${arcSite}&outputType=signwall&reloginHash=1`
    }

    const getBoottonclick = () => {
      const btnClosePaywall = document.getElementById('btn-close-paywall')
      const btnPlanesPaywall = document.getElementById('btn-ver-planes')
      btnClosePaywall.onclick = () => {
        Taggeo('web_paywall_cerrar')
        window.location.href = `/?signwallPaywall=1&ref=${window.location.pathname}`
      }
      btnPlanesPaywall.onclick = () => {
        Taggeo('web_paywall_boton_ver_planes')
        window.sessionStorage.setItem('paywall_type_modal', 'paywall')
        window.sessionStorage.setItem(
          'paywall_last_url',
          window.location.pathname
        )
        window.location.href = getUrlPaywall()
      }
    }

    const getCookie = name => {
      const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`)
      return v ? v[2] : null
    }

    const getQuery = name => {
      const vars = {}
      if (typeof window !== 'undefined') {
        window.location.href.replace(
          /[?&]+([^=&]+)=([^&]*)/gi,
          (m, key, value) => {
            vars[key] = value
          }
        )
      }
      return vars[name]
    }

    const checkCookieHash = () => {
      if (typeof window !== 'undefined') {
        window.document.cookie = `ArcId.USER_INFO=;path=/;domain=.${arcSite}.pe; expires=Thu, 01 Jan 1970 00:00:01 GMT`
        const dataContType = window.document.querySelector(
          'meta[name="content-type"]'
        )
        if (getCookie('arc_e_id') && dataContType) {
          top.postMessage({id: "iframe_relogin", redirectUrl: getUrlSignwallHash()}, location.origin);
          window.location.href = getUrlSignwallHash()
        }
      }
      return null
    }

    const iOS =
      /iPad|iPhone|iPod/.test(window.navigator.userAgent) && !window.MSStream
    if (iOS && getQuery('surface') === 'meter_limit_reached') {
      const artURL = decodeURIComponent(getQuery('article_url') || '')
      window.sessionStorage.setItem('paywall_last_url', artURL)
      window.location.href = getUrlLandingAuth()
    } else {
      const dataContentPremium = window.content_paywall
      if (dataContentPremium !== 2 && dataContentPremium !== true) {
        const dataContTyp = document.querySelector('meta[name="content-type"]')
        const dataContSec = document.querySelector('meta[name="section-id"]')
        const userInfo =
          window.JSON.parse(window.localStorage.getItem('ArcId.USER_INFO')) ||
          {}
        window.ArcPOptions = {
          paywallFunction: function(campaign) {
            if (campaign.match(/signwallHard/) && !checkSession()) {
              // Mensaje para padre en notas continuas
              top.postMessage({id: "iframe_signwall", redirectUrl: getUrlSignwall()}, location.origin);
              window.location.href = getUrlSignwall()
            } else if (campaign.match(/signwallPaywall/) && checkSession()) {
              const signwall = document.querySelector('#signwall-app')
              signwall.className = 'active-signwall'
              const elementosObtenidos = document.getElementsByTagName('body')
              elementosObtenidos[0].style.overflow = 'hidden'
              Taggeo('web_paywall_open')
              getBoottonclick()
              // Mensaje para padre en notas continuas
              top.postMessage({id: "iframe_paywall"}, location.origin);
            }
          },
          contentType: dataContTyp
            ? dataContTyp.getAttribute('content')
            : 'none',
          section: dataContSec ? dataContSec.getAttribute('content') : 'none',
          userName: userInfo.uuid || null,
          jwt: userInfo.accessToken || null,
          apiOrigin:
            "https://api${arcEnv === 'sandbox' ? '-sandbox' : ''}.${arcSite}.pe",
          customSubCheck: () => {
            if (userInfo.accessToken) {
              return getListSubs(userInfo.refreshToken).then(p => {
                const isLoggedInSubs = checkSession()
                return {
                  s: isLoggedInSubs,
                  p: p || null,
                  timeTaken: 100,
                  updated: Date.now(),
                }
              })
            }
            return {
              s: false,
              p: null,
              timeTaken: 100,
              updated: Date.now(),
            }
          },
          customRegCheck: () => {
            const start = Date.now()
            const isLoggedIn = checkSession()
            return Promise.resolve({
              l: isLoggedIn,
              timeTaken: Date.now() - start,
              updated: Date.now(),
            })
          },
        }

        const script = document.createElement('script')
        script.src = `https://elcomercio-${arcSite}-${arcEnv}.cdn.arcpublishing.com/arc/subs/p.js?v=${getdata}` // al pasar por babel debe quedar asi https://elcomercio-${arcSite}-${arcEnv}.cdn.arcpublishing.com/arc/subs/p.js?v=${getdata}
        script.async = 'true'
        document.head.appendChild(script)
      }
      if (!checkSession()) {
        checkCookieHash()
      }
    }
  })
})
*/

const vallaSignwall = ({ arcEnv, arcSite, getdata }) =>
  `"use strict";var arcEnv="${arcEnv}",arcSite="${arcSite}",getdata="${getdata}";document.addEventListener("DOMContentLoaded",function(){window.requestIdle(function(){function t(e){var n;"undefined"!=typeof window&&(window.dataLayer=window.dataLayer||[],n={event:"tag_signwall",eventCategory:"Web_Paywall_Hard",eventAction:e},window.dataLayer.push(n),"sandbox"===arcEnv&&window.console.log(n))}function e(e){return t=e,new Promise(function(n){fetch("https://api${
    arcEnv === 'sandbox' ? '-sandbox' : ''
  }.${arcSite}.pe/identity/public/v1/auth/token",{method:"POST",body:JSON.stringify({grantType:"refresh-token",token:t}),headers:{"Content-Type":"application/json"}}).then(function(e){return n(e.json())})}).then(function(e){var t;return t=e.accessToken,new Promise(function(n){fetch("https://api${
    arcEnv === 'sandbox' ? '-sandbox' : ''
  }.${arcSite}.pe/sales/public/v1/entitlements",{method:"GET",headers:{Authorization:t}}).then(function(e){return n(e.json())})}).then(function(n){return n.skus?Object.keys(n.skus).map(function(e){return n.skus[e].sku}):[]}).catch(function(e){return window.console.error(e)})});var t}function o(){if("undefined"!=typeof window){var e=window.localStorage.getItem("ArcId.USER_PROFILE"),n=window.localStorage.getItem("ArcId.USER_INFO");if(e)return!("null"===e||"{}"===n)||!1}return!1}function n(e,n){return void 0===e&&(e="signwallHard"),void 0===n&&(n="1"),"prod"===arcEnv?"/signwall/?outputType=signwall&"+e+"="+n:"/signwall/?_website="+arcSite+"&outputType=signwall&"+e+"="+n}function a(){return"prod"===arcEnv?"/signwall/?outputType=signwall&reloginHash=1":"/signwall/?_website="+arcSite+"&outputType=signwall&reloginHash=1"}function i(){var e=document.getElementById("btn-close-paywall"),n=document.getElementById("btn-ver-planes");e.onclick=function(){t("web_paywall_cerrar"),window.location.href="/?signwallPaywall=1&ref="+window.location.pathname},n.onclick=function(){t("web_paywall_boton_ver_planes"),window.sessionStorage.setItem("paywall_type_modal","paywall"),window.sessionStorage.setItem("paywall_last_url",window.location.pathname),window.location.href="prod"===arcEnv?"/suscripcionesdigitales/":"/pf/suscripcionesdigitales/?_website="+arcSite+"&outputType=subscriptions"}}function r(e){var o={};return"undefined"!=typeof window&&window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(e,n,t){o[n]=t}),o[e]}var c,l,s,d,u,w,p,m,g;/iPad|iPhone|iPod/.test(window.navigator.userAgent)&&!window.MSStream&&"meter_limit_reached"===r("surface")?(c=decodeURIComponent(r("article_url")||""),window.sessionStorage.setItem("paywall_last_url",c),window.location.href="prod"===arcEnv?"/auth-fia/?outputType=signwall":"/pf/auth-fia/?_website="+arcSite+"&outputType=signwall"):(2!==(l=window.content_paywall)&&!0!==l&&(s=document.querySelector('meta[name="content-type"]'),d=document.querySelector('meta[name="section-id"]'),u=window.JSON.parse(window.localStorage.getItem("ArcId.USER_INFO"))||{},window.ArcPOptions={paywallFunction:function(e){e.match(/signwallHard/)&&!o()?(top.postMessage({id:"iframe_signwall",redirectUrl:n()},location.origin),window.location.href=n()):e.match(/signwallPaywall/)&&o()&&(document.querySelector("#signwall-app").className="active-signwall",document.getElementsByTagName("body")[0].style.overflow="hidden",t("web_paywall_open"),i(),top.postMessage({id:"iframe_paywall"},location.origin))},contentType:s?s.getAttribute("content"):"none",section:d?d.getAttribute("content"):"none",userName:u.uuid||null,jwt:u.accessToken||null,apiOrigin:"https://api${
    arcEnv === 'sandbox' ? '-sandbox' : ''
  }.${arcSite}.pe",customSubCheck:function(){return u.accessToken?e(u.refreshToken).then(function(e){return{s:o(),p:e||null,timeTaken:100,updated:Date.now()}}):{s:!1,p:null,timeTaken:100,updated:Date.now()}},customRegCheck:function(){var e=Date.now(),n=o();return Promise.resolve({l:n,timeTaken:Date.now()-e,updated:Date.now()})}},(w=document.createElement("script")).src="https://elcomercio-"+arcSite+"-"+arcEnv+".cdn.arcpublishing.com/arc/subs/p.js?v="+getdata,w.async="true",document.head.appendChild(w)),o()||"undefined"!=typeof window&&(window.document.cookie="ArcId.USER_INFO=;path=/;domain=."+arcSite+".pe; expires=Thu, 01 Jan 1970 00:00:01 GMT",p=window.document.querySelector('meta[name="content-type"]'),m="arc_e_id",(g=document.cookie.match("(^|;) ?"+m+"=([^;]*)(;|$)"))&&g[2]&&p&&(top.postMessage({id:"iframe_relogin",redirectUrl:a()},location.origin),window.location.href=a())))})});`

export default vallaSignwall
