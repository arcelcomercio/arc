// TODO: Agregar la lógica sin minificar de este script, no son iguales

/*
const arcEnv = '${arcEnv}'
const arcSite = '${arcSite}'
const getdata = '${getdata}'

document.addEventListener('DOMContentLoaded', function() {
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
    return arcEnv === 'prod'
      ? `/signwall/?outputType=signwall&${typeDialog}=${hash}`
      : `/signwall/?_website=${arcSite}&outputType=signwall&${typeDialog}=${hash}`
  }

  const getUrlPaywall = () => {
    return arcEnv === 'prod'
      ? `/suscripcionesdigitales/`
      : `/pf/suscripcionesdigitales/?_website=${arcSite}&outputType=paywall`
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
        } else if (campaign.match(/signwallPaywall/) && checkSession()) {
          const signwall = document.querySelector('#signwall-app')
          signwall.className = 'active'
          const elementosObtenidos = document.getElementsByTagName('body')
          elementosObtenidos[0].style.overflow = 'hidden'
          Taggeo('web_paywall_open')
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
}) */

// eslint-disable-next-line import/prefer-default-export
// const vallaSignwall = ({ arcEnv, arcSite, getdata }) =>
//   `"use strict";var arcEnv="${arcEnv}",arcSite="${arcSite}",checkSession=function(){if("undefined"!=typeof window){var t=window.localStorage.getItem("ArcId.USER_PROFILE")||window.sessionStorage.getItem("ArcId.USER_PROFILE"),e=window.localStorage.getItem("ArcId.USER_INFO");if(t)return!("null"===t||"{}"===e)||!1}return!1},getUrlSignwall=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"signwallHard",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"1";return"elcomercio"===arcEnv?"/signwall/?outputType=signwall&".concat(t,"=").concat(e):"/signwall/?_website=".concat(arcSite,"&outputType=signwall&").concat(t,"=").concat(e)},getUrlPaywall=function(){return"elcomercio"===arcEnv?"/suscripcionesdigitales/":"/pf/suscripcionesdigitales/?_website=".concat(arcSite,"&outputType=paywall#step1")},getBoottonclick=function(){var t=document.getElementById("btn-close-paywall"),e=document.getElementById("btn-ver-planes");t.onclick=function(){window.location.href="/?signwallPaywall=1&ref=".concat(window.location.pathname)},e.onclick=function(){window.location.href=getUrlPaywall(),window.sessionStorage.setItem("paywall_type_modal","paywall"),window.sessionStorage.setItem("paywall_last_url",window.location.pathname)}},dataContentPremium=window.content_paywall;if(2!==dataContentPremium&&!0!==dataContentPremium){var dataContTyp=document.querySelector('meta[name="content-type"]'),dataContSec=document.querySelector('meta[name="section-id"]'),userInfo=window.JSON.parse(window.localStorage.getItem("ArcId.USER_INFO"))||{};window.ArcPOptions={paywallFunction:function(t){if(t.match(/signwallHard/)&&!checkSession())window.location.href=getUrlSignwall();else if(t.match(/signwallPaywall/)&&checkSession()){document.querySelector("#signwall-app").className="active",document.getElementsByTagName("body")[0].style.overflow="hidden",getBoottonclick()}},contentType:dataContTyp?dataContTyp.getAttribute("content"):"none",section:dataContSec?dataContSec.getAttribute("content"):"none",userName:userInfo.uuid||null,jwt:userInfo.accessToken||null,apiOrigin:"api${
//     arcEnv === 'sandbox' ? '-sandbox' : ''
//   }.${arcSite}.pe"};var script=document.createElement("script");script.src="https://elcomercio-${arcSite}-${arcEnv}.cdn.arcpublishing.com/arc/subs/p.js?v=${getdata}",script.async="true",document.head.appendChild(script)}
//   `

const vallaSignwall = ({ arcEnv, arcSite, getdata }) =>
  `"use strict";var arcEnv="${arcEnv}",arcSite="${arcSite}",getdata="${getdata}";document.addEventListener("DOMContentLoaded",function(){var e=function(e){if("undefined"!=typeof window){window.dataLayer=window.dataLayer||[];var n={event:"tag_signwall",eventCategory:"Web_Paywall_Hard",eventAction:e};window.dataLayer.push(n),"sandbox"===arcEnv&&window.console.log(n)}},n=function(){if("undefined"!=typeof window){var e=window.localStorage.getItem("ArcId.USER_PROFILE")||window.sessionStorage.getItem("ArcId.USER_PROFILE"),n=window.localStorage.getItem("ArcId.USER_INFO");if(e)return!("null"===e||"{}"===n)||!1}return!1},t=function(){var n=document.getElementById("btn-close-paywall"),t=document.getElementById("btn-ver-planes");n.onclick=function(){e("web_paywall_cerrar"),window.location.href="/?signwallPaywall=1&ref=".concat(window.location.pathname)},t.onclick=function(){e("web_paywall_boton_ver_planes"),window.sessionStorage.setItem("paywall_type_modal","paywall"),window.sessionStorage.setItem("paywall_last_url",window.location.pathname),window.location.href="prod"===arcEnv?"/suscripcionesdigitales/":"/pf/suscripcionesdigitales/?_website=".concat(arcSite,"&outputType=paywall")}},a=window.content_paywall;if(2!==a&&!0!==a){var o=document.querySelector('meta[name="content-type"]'),c=document.querySelector('meta[name="section-id"]'),i=window.JSON.parse(window.localStorage.getItem("ArcId.USER_INFO"))||{};window.ArcPOptions={paywallFunction:function(a){if(a.match(/signwallHard/)&&!n())window.location.href=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"signwallHard",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"1";return"prod"===arcEnv?"/signwall/?outputType=signwall&".concat(e,"=").concat(n):"/signwall/?_website=".concat(arcSite,"&outputType=signwall&").concat(e,"=").concat(n)}();else if(a.match(/signwallPaywall/)&&n()){document.querySelector("#signwall-app").className="active",document.getElementsByTagName("body")[0].style.overflow="hidden",e("web_paywall_open"),t()}},contentType:o?o.getAttribute("content"):"none",section:c?c.getAttribute("content"):"none",userName:i.uuid||null,jwt:i.accessToken||null,apiOrigin:"api${
    arcEnv === 'sandbox' ? '-sandbox' : ''
  }.${arcSite}.pe"};var l=document.createElement("script");l.src="https://elcomercio-".concat(arcSite,"-").concat(arcEnv,".cdn.arcpublishing.com/arc/subs/p.js?v=").concat(getdata),l.async="true",document.head.appendChild(l)}});`

export default vallaSignwall
