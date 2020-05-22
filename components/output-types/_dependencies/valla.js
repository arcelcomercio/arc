/*
// TODO: Agregar la lógica sin minificar de este script, no son iguales

const fetchLive = () => {
  const arcEnv = '${arcEnv}'
  const arcSite = '${arcSite}'

  const checkSession = () => {
    if (typeof window !== 'undefined') {
      const profileStorage =
        window.localStorage.getItem('ArcId.USER_PROFILE') ||
        window.sessionStorage.getItem('ArcId.USER_PROFILE')
      const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
      if (profileStorage) {
        return !(profileStorage === 'null' || sesionStorage === '{}') || false
      }
    }
    return false
  }

  const getUrlSignwall = (typeDialog = 'signwallHard', hash = '1') => {
    return arcEnv === 'elcomercio'
      ? `/signwall/?outputType=signwall&${typeDialog}=${hash}`
      : `/signwall/?_website=${arcSite}&outputType=signwall&${typeDialog}=${hash}`
  }

  const getUrlPaywall = () => {
    return arcEnv === 'elcomercio'
      ? `/suscripcionesdigitales/fia/planes/?ref=auth-fia`
      : `/pf/suscripcionesdigitales/fia/planes/?_website=${arcSite}&outputType=paywall`
  }

  const getBoottonclick = () => {
    const btn = document.getElementById('close')
    const btnplanes = document.getElementById('planes')
    btn.onclick = () => {
      window.location.href = `/?signwallPaywall=1&ref=${window.location.pathname}`
    }
    btnplanes.onclick = () => {
      window.location.href = getUrlPaywall()
    }
  }

  const dataContentPremium = window.content_paywall
  if (dataContentPremium !== 2 && dataContentPremium !== true) {
    const dataContTyp = document.querySelector('meta[name="content-type"]')
    const dataContSec = document.querySelector('meta[name="section-id"]')
    const userInfo =
      window.JSON.parse(window.localStorage.getItem('ArcId.USER_INFO')) || {}
    window.ArcPOptions = {
      paywallFunction: function(campaign) {
        if (campaign.match(/signwallHard/) && !checkSession()) {
          window.location.href = getUrlSignwall()
          console.log('sdsdsd', campaign)
          // window.location.href = campaign + '&ref=' + w.location.pathname
        } else if (campaign.match(/signwallPaywall/) && checkSession()) {
          const signwall = document.querySelector('#signwall-app')
          signwall.className = 'active'
          const elementosObtenidos = document.getElementsByTagName('body')
          elementosObtenidos[0].style.overflow = 'hidden'
          getBoottonclick()
        }
      },
      contentType: dataContTyp ? dataContTyp.getAttribute('content') : 'none',
      section: dataContSec ? dataContSec.getAttribute('content') : 'none',
      userName: userInfo.uuid || null,
      jwt: userInfo.accessToken || null,
      apiOrigin: "api${arcEnv === 'sandbox' ? '-sandbox' : ''}.${arcSite}.pe",
    }
    const script = document.createElement('script')
    script.src = `https://elcomercio-${arcSite}-${arcEnv}.cdn.arcpublishing.com/arc/subs/p.js?v=${getdata}` // al pasar por babel debe quedar asi https://elcomercio-${arcSite}-${arcEnv}.cdn.arcpublishing.com/arc/subs/p.js?v=${getdata}
    script.async = 'true'
    document.head.appendChild(script)
  }
}
*/

// eslint-disable-next-line import/prefer-default-export
const vallaSignwall = ({ arcEnv, arcSite, getdata }) =>
  `"use strict";var arcEnv="${arcEnv}",arcSite="${arcSite}",checkSession=function(){if("undefined"!=typeof window){var e=window.localStorage.getItem("ArcId.USER_PROFILE")||window.sessionStorage.getItem("ArcId.USER_PROFILE"),t=window.localStorage.getItem("ArcId.USER_INFO");if(e)return!("null"===e||"{}"===t)||!1}return!1},getUrlSignwall=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"signwallHard",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"1";return"elcomercio"===arcEnv?"/signwall/?outputType=signwall&".concat(e,"=").concat(t):"/signwall/?_website=".concat(arcSite,"&outputType=signwall&").concat(e,"=").concat(t)},getUrlPaywall=function(){return"elcomercio"===arcEnv?"/suscripcionesdigitales/fia/planes/?ref=auth-fia":"/pf/suscripcionesdigitales/fia/planes/?_website=".concat(arcSite,"&outputType=paywall")},getBoottonclick=function(){var e=document.getElementById("close"),t=document.getElementById("planes");e.onclick=function(){window.location.href="/?signwallPaywall=1&ref=".concat(window.location.pathname)},t.onclick=function(){window.location.href=getUrlPaywall()}},dataContentPremium=window.content_paywall;if(2!==dataContentPremium&&!0!==dataContentPremium){var dataContTyp=document.querySelector('meta[name="content-type"]'),dataContSec=document.querySelector('meta[name="section-id"]'),userInfo=window.JSON.parse(window.localStorage.getItem("ArcId.USER_INFO"))||{};window.ArcPOptions={paywallFunction:function(e){if(e.match(/signwallHard/)&&!checkSession())window.location.href=getUrlSignwall(),console.log("sdsdsd",e);else if(e.match(/signwallPaywall/)&&checkSession()){document.querySelector("#signwall-app").className="active",document.getElementsByTagName("body")[0].style.overflow="hidden",getBoottonclick()}},contentType:dataContTyp?dataContTyp.getAttribute("content"):"none",section:dataContSec?dataContSec.getAttribute("content"):"none",userName:userInfo.uuid||null,jwt:userInfo.accessToken||null,apiOrigin:"api${
    arcEnv === 'sandbox' ? '-sandbox' : ''
  }.${arcSite}.pe"};var script=document.createElement("script");script.src="https://elcomercio-${arcSite}-${arcEnv}.cdn.arcpublishing.com/arc/subs/p.js?v=${getdata}",script.async="true",document.head.appendChild(script)}
  `

export default vallaSignwall
