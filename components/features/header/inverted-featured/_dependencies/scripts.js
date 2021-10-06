/*
window.addEventListener('load', () => {requestIdle(() => {
  const $btnMenu = document.getElementById('btn-menu')
  const $btnCloseMenu = document.getElementById('btn-close-menu')
  const $header = document.body.querySelector('.header-inverted-featured')
  const $buttonMenu = $header.querySelector('.header-inverted-featured__btn-menu')
  const $iconMenu = $header.querySelector('.header-inverted-featured__icon-menu')
  const $svgInline = $header.querySelector(".svg-inline-close")
  const $navSidebar=document.body.querySelector(".nav-sidebar")
  ;[$btnMenu,$btnCloseMenu].forEach( menuButton => {
    menuButton.addEventListener('click', () => {
      if(iconMenu.className.indexOf('icon-hamburguer') > 0) {
        navSidebar.className=navSidebar.className.replace(" hidden", ""),
        iconMenu.className=iconMenu.className.replace("icon-hamburguer","icon-close hidden"),
        svgInline.className=svgInline.className.replace(" hidden",""),
        buttonMenu.className=buttonMenu.className.concat(" header-inverted-featured__btn-menu-close")
      }else{
        navSidebar.className=navSidebar.className.concat(" hidden"),
        iconMenu.className=iconMenu.className.replace("icon-close hidden","icon-hamburguer"),
        svgInline.className=svgInline.className.concat(" hidden"),
        buttonMenu.className=buttonMenu.className.replace(" header-inverted-featured__btn-menu-close", "")
      }
    })
  })
})})
*/

export const toggleMenu = `window.addEventListener("load",function(){requestIdle(function(){
  var e=document.getElementById("btn-menu"),
  a=document.getElementById("btn-close-menu"),
  c=document.body.querySelector(".header-inverted-featured"),
  b=c.querySelector(".header-inverted-featured__btn-menu"),
  s=c.querySelector(".header-inverted-featured__icon-menu"),
  i=c.querySelector(".svg-inline-close")
  n=document.body.querySelector(".nav-sidebar")
    ;[e,a].forEach(function(e){e.addEventListener("click",function(){
      s.className.baseVal.indexOf("icon-hamburguer")>0
      ?(n.className=n.className.replace(" hidden", ""),
      s.className.baseVal=s.className.baseVal.replace("icon-hamburguer","icon-close hidden"),
      i.className.baseVal=i.className.baseVal.replace(" hidden",""),
      b.className=b.className.concat(" header-inverted-featured__btn-menu-close")
      )
      :(n.className=n.className.concat(" hidden"),
      s.className.baseVal=s.className.baseVal.replace("icon-close hidden","icon-hamburguer"),
      i.className.baseVal=i.className.baseVal.concat(" hidden"),
      b.className=b.className.replace(" header-inverted-featured__btn-menu-close", "")
      )
    })})
  })});`

/* 
  window.addEventListener('load', () => {requestIdle(() => {
  const $searchForm = document.getElementById('header-search-form')
  $searchForm.addEventListener('submit', e => {
    e.preventDefault()
    const value = e.target[0].value
    if(value){
      const newQuery = encodeURIComponent(value).replace(/%20/g, '+')
      window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}`
    }
  })
})})
  */

export const searchScript = `window.addEventListener("load",function(){
    document.getElementById("header-search-form").addEventListener("submit",function(e){
      e.preventDefault();
      var t=e.target[0].value;
      if(t){
        var n=encodeURIComponent(t).replace(/%20/g,"+");
        window.location.href="/buscar/".concat(n,"/todas/descendiente/?query=").concat(n);
      }
    })
  });
  `
/*

*/

export const btnSearch = `window.addEventListener("load",function(){requestIdle(function(){
  var e=document.getElementById("header-search-button"),
  a=document.getElementById("header-search-input"),
  b=document.body.querySelector(".header-inverted-featured__btn-search"),
  s=document.body.querySelector(".header-inverted-featured__search")
    ;e.addEventListener("click",function(){
      if(b.className.baseVal.indexOf("active")>0){
        var t=a.value;
        var n=encodeURIComponent(t).replace(/%20/g,"+");
        (t.length > 0)
        ?(
          window.location.href="/buscar/".concat(n,"/todas/descendiente/?query=").concat(n)
        )
        :(b.className.baseVal=b.className.baseVal.replace(" active", ""),
          s.className=s.className.replace(" active", "")
        )
      } else {
        b.className.baseVal=b.className.baseVal.concat(" active");
        s.className=s.className.concat(" active")
      }
    })
  })
})`

export const searchScriptMobile = `window.addEventListener("load",function(){
  document.getElementById("header-search-form-mobile").addEventListener("submit",function(e){
    e.preventDefault();
    var t=e.target[0].value;
    if(t){
      var n=encodeURIComponent(t).replace(/%20/g,"+");
      window.location.href="/buscar/".concat(n,"/todas/descendiente/?query=").concat(n);
    }
  })
});
`

export const btnSearchMobile = `window.addEventListener("load",function(){requestIdle(function(){
  var e=document.getElementById("header-search-icon-mobile"),
  a=document.getElementById("header-search-input-mobile")
    ;e.addEventListener("click",function(){
      var t=a.value;
      if(t){
        var n=encodeURIComponent(t).replace(/%20/g,"+");
        window.location.href="/buscar/".concat(n,"/todas/descendiente/?query=").concat(n);
      }
    })
  })
})`

/* TODO: Agregar la lógica sin minificar de este script, no son iguales
document.addEventListener('DOMContentLoaded', function() {
  requestIdle(() => {
    const localProfile = JSON.parse(
      window.localStorage.getItem('ArcId.USER_PROFILE') 
    )
    const { firstName = '', lastName = '', uuid = '' } = localProfile || {}
    document.getElementById("signwall-nav-btn").addEventListener("click", () => {
      if (uuid) {
        window.location.href  = '/mi-perfil/?outputType=signwall'
      } else {
        // window.location.href  = '/signwall/?outputType=signwall'
        window.location.href  = '/politica/?reloginEmail=1'
      }
    })
    if (uuid) {
      const signwallButton = document.getElementById('signwall-nav-user')
      const signwallIcon = document.getElementById('signwall-nav-icon')
      if (!firstName && !lastName) {
        signwallButton.innerHTML = 'Bienvenido Usuario'
      } else {
        let buttonText = ''
        let iconText = ''
        if (firstName && lastName) {
          buttonText = `${firstName} ${lastName}`
          iconText = `${firstName[0] || ''}${lastName[0] || ''}`
        } else if (firstName && !lastName) {
          buttonText = firstName
          iconText = `${firstName[0] || ''}${firstName[1] || ''}`
        } else if (!firstName && lastName) {
          buttonText = lastName
          iconText = `${lastName[0] || ''}${lastName[1] || ''}`
        }
        signwallButton.innerHTML = buttonText.length >= 15 ? `${buttonText.slice(0, 15)}...` : buttonText
        signwallIcon.innerHTML = iconText
        signwallIcon.className = 'uppercase'
      }
    }
  })
})
*/

export const singwallScript =
  '"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var n=JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE"))||{},e=n.firstName,t=void 0===e?"":e,c=n.lastName,a=void 0===c?"":c,i=n.uuid,o=void 0===i?"":i;if(document.getElementById("signwall-nav-btn").addEventListener("click",function(){window.location.href=o?"/mi-perfil/?outputType=signwall":"/politica/?reloginEmail=1"}),o){var l=document.getElementById("signwall-nav-user"),d=document.getElementById("signwall-nav-icon");if(t||a){var r="",s="";t&&a?(r="".concat(t," ").concat(a),s="".concat(t[0]||"").concat(a[0]||"")):t&&!a?(r=t,s="".concat(t[0]||"").concat(t[1]||"")):!t&&a&&(r=a,s="".concat(a[0]||"").concat(a[1]||"")),l.innerHTML=r.length>=15?"".concat(r.slice(0,15),"..."):r,d.innerHTML=s,d.className="uppercase"}else l.innerHTML="Bienvenido Usuario"}})});'
export const getQueryReloginEmailScript = (_env, arcSite) => `"use strict";
document.addEventListener('DOMContentLoaded', function () {
  requestIdle(function () {
    if (window.location.href.match(/reloginEmail=/)) { window.location.href = '${
      _env === 'prod'
        ? `/signwall/?outputType=signwall&reloginEmail=1`
        : `/signwall/?_website=${arcSite}&outputType=signwall&reloginEmail=1`
    }';}
  });
})`
