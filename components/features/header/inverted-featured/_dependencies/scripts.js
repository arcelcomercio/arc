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
      s=document.body.querySelector(".header-inverted-featured__icon-menu"),
      i=c.querySelector(".svg-inline-close"),
      n=document.body.querySelector(".nav-sidebar"),
      h=document.body.querySelector('.header-inverted-featured__btn-search'),
      u=document.body.querySelector('.header-inverted-featured__buscador-container'),
      f=c.querySelector('.header-inverted-featured__form'),
      v=document.body.querySelector('.header-inverted-featured__band')
      t=document.body.querySelector('.search-button-close')
      ;[e,a].forEach(function(e){e.addEventListener("click",function(){
        (h.className.baseVal.indexOf("active")>0) && 
        (f.className=f.className.replace(" header-inverted-featured__btn-search-close", ""),
        h.className.baseVal=h.className.baseVal.replace(" active", ""),
        u.className=u.className.replace(" flex", " hidden"),
        v.className=v.className.replace(" mt-70", ""),
        t.className.baseVal=t.className.baseVal.concat(" hidden")
        );
        s.className.baseVal.indexOf("icon-hamburguer")>0
        ?(n.className=n.className.replace(" hidden", ""),
        s.className.baseVal=s.className.baseVal.replace("icon-hamburguer","icon-close hidden"),
        i.className.baseVal=i.className.baseVal.replace(" hidden",""),
        b.className=b.className.concat(" header-inverted-featured__btn-menu-close"))
        :(n.className=n.className.concat(" hidden"),
          s.className.baseVal=s.className.baseVal.replace("icon-close hidden","icon-hamburguer"),
          i.className.baseVal=i.className.baseVal.concat(" hidden"),
          b.className=b.className.replace(" header-inverted-featured__btn-menu-close", "")          
        )})})})});`

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
export const searchScript = `window.addEventListener("load",function(){document.getElementById("header-search-form").addEventListener("submit",function(e){e.preventDefault();var t=e.target[0].value;if(t){var n=encodeURIComponent(t).replace(/%20/g,"+");window.location.href="/buscar/".concat(n,"/todas/descendiente/?query=").concat(n);}})})`

/*
window.addEventListener('load', () => {requestIdle(() => {
  const $searchButton = document.getElementById('header-search-button')
  const $searchInput = document.getElementById('header-search-input')
  const $headerButtonSearch = document.body.querySelector('.header-inverted-featured__btn-search')
  const $headerSearch = $header.querySelector('.header-inverted-featured__search')
  ;searchButton.addEventListener('click', () => {
      
    if(headerButtonSearch.className.indexOf('active') > 0) {
        const $value = searchInput.value
        const $encode = encodeURIComponent(t).replace(/%20/g,"+");
        value.length>0
        ?(window.location.href="/buscar/".concat(encode,"/todas/descendiente/?query=").concat(encode))
        :(headerButtonSearch.className=headerButtonSearch.className.replace(" active", ""),
          headerSearch.className=headerSearch.className.replace(" active", "")
          )
      }else{
        headerButtonSearch.className=headerButtonSearch.className.baseVal.concat(" active");
        headerSearch.className=headerSearch.className.concat(" active")
      }
    })
})})
*/

export const toggleSearch = `window.addEventListener("load",function(){requestIdle(function(){
  var f=document.getElementById("header-search-form"),
  e=document.getElementById("header-search-button"),
  s=document.body.querySelector('.header-inverted-featured__buscador-container'),
  b=document.body.querySelector('.header-inverted-featured__btn-search'),
  f=document.body.querySelector('.header-inverted-featured__form'),
  c=document.body.querySelector('.search-button-close'),
  i=document.body.querySelector('.header-inverted-featured__band'),
  o=document.body.querySelector(".header-inverted-featured__icon-menu"),
  n=document.body.querySelector(".nav-sidebar"),
  v=document.body.querySelector(".svg-inline-close"),
  m=document.body.querySelector('.header-inverted-featured__btn-menu')
  ;f.addEventListener("click",function(){
    (o.className.baseVal.indexOf("icon-hamburguer")<=0) && (
      n.className=n.className.concat(" hidden"),
      o.className.baseVal=o.className.baseVal.replace("icon-close hidden","icon-hamburguer"),
      v.className.baseVal=v.className.baseVal.concat(" hidden"),
      m.className=m.className.replace(" header-inverted-featured__btn-menu-close", "") 
    );
    (b.className.baseVal.indexOf("active")>0)
    ?(f.className=f.className.replace(" header-inverted-featured__btn-search-close", ""),
      b.className.baseVal=b.className.baseVal.replace(" active", ""),
      c.className.baseVal=c.className.baseVal.concat(" hidden"),
      s.className=s.className.replace(" flex", " hidden"),
      i.className=i.className.replace(" mt-70", "")
    )
    :(f.className=f.className.concat(" header-inverted-featured__btn-search-close"),
      b.className.baseVal=b.className.baseVal.concat(" active"),
      c.className.baseVal=c.className.baseVal.replace(" hidden", ""),
      s.className=s.className.replace(" hidden", " flex"),
      i.className=i.className.concat(" mt-70")
    )
    })
  })})`

/*
window.addEventListener('load', () => {requestIdle(() => {
  const $iconMobile = document.getElementById('header-search-icon-mobile')
  const $inputMobile = document.getElementById('header-search-input-mobile')
  $iconMobile.addEventListener('submit', e => {
    e.preventDefault()
    const value = inputMobile.value
    if(value){
      const newQuery = encodeURIComponent(value).replace(/%20/g, '+')
      window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}`
    }
  })
})})
*/
export const btnSearch = `window.addEventListener("load",function(){requestIdle(function(){
  var e=document.getElementById("btn-search"),
  a=document.getElementById("header-search-input")
  ;e.addEventListener("click",function(){
    console.log(a);
    var t=a.value;
    if(t){
      var n=encodeURIComponent(t).replace(/%20/g,"+");
      window.location.href="/buscar/".concat(n,"/todas/descendiente/?query=").concat(n);}})})})`

/*
window.addEventListener('load', () => {requestIdle(() => {
  document.getElementById('header-search-form-mobile').addEventListener('submit', e => {
    e.preventDefault()
    const value = e.target[0].value
    if(value){
      const newQuery = encodeURIComponent(value).replace(/%20/g, '+')
      window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}`
    }
  })
})})
*/
export const searchScriptMobile = `window.addEventListener("load",function(){document.getElementById("header-search-form-mobile").addEventListener("submit",function(e){e.preventDefault();var t=e.target[0].value;if(t){var n=encodeURIComponent(t).replace(/%20/g,"+");window.location.href="/buscar/".concat(n,"/todas/descendiente/?query=").concat(n);}})})`

/*
window.addEventListener('load', () => {requestIdle(() => {
  const $iconMobile = document.getElementById('header-search-icon-mobile')
  const $inputMobile = document.getElementById('header-search-input-mobile')
  $iconMobile.addEventListener('submit', e => {
    e.preventDefault()
    const value = inputMobile.value
    if(value){
      const newQuery = encodeURIComponent(value).replace(/%20/g, '+')
      window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}`
    }
  })
})})
*/
export const btnSearchMobile = `window.addEventListener("load",function(){requestIdle(function(){var e=document.getElementById("header-search-icon-mobile"),a=document.getElementById("header-search-input-mobile");e.addEventListener("click",function(){var t=a.value;if(t){var n=encodeURIComponent(t).replace(/%20/g,"+");window.location.href="/buscar/".concat(n,"/todas/descendiente/?query=").concat(n);}})})})`

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

/* */
export const sticky = `window.addEventListener("load",function(){requestIdle(function(){ 
  var a = document.querySelector(".header-inverted-featured")
  var o = new IntersectionObserver(
    ([e]) => e.target.classList.toggle("header-inverted-featured__header-sticky", e.intersectionRatio < 1),
    { threshold: [1] }
  );
  o.observe(a);
})})`

/* */
export const hoverSearch = `window.addEventListener("load",function(){requestIdle(function(){ 
  var a=document.querySelector(".header-inverted-featured__btn-buscar"),
  b=document.querySelector(".header-inverted-featured__icon-search-buscador");
  a.addEventListener("mouseover", () => {
    b.style.color = '#000';
  }, false)
  a.addEventListener("mouseout", () => {
    b.style.color = "#888888";
  }, false)

})})`
