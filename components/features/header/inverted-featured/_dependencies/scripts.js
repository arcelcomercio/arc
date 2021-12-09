/*
window.addEventListener('load', () => {requestIdle(() => {
  const $btnMenu = document.getElementById('btn-menu')
  const $btnCloseMenu = document.getElementById('btn-close-menu')
  const $header = document.body.querySelector('.header-inverted-featured')
  const $buttonMenu = $header.querySelector('.header-inverted-featured__btn-menu')
  const $iconMenu = $header.querySelector('.header-inverted-featured__icon-menu')
  const $svgInline = $header.querySelector(".svg-inline-close")
  const $navSidebar=document.body.querySelector(".nav-sidebar")
  
  const $headerButtonSearch = document.body.querySelector('.header-inverted-featured__btn-search')
  const $buscadorContainer=document.body.querySelector('.header-inverted-featured__buscador-container'),
  const $form=c.querySelector('.header-inverted-featured__form'),
  const $band=document.body.querySelector('.header-inverted-featured__band')
  const $searchButton=document.body.querySelector('.search-button-close')
  ;[$btnMenu,$btnCloseMenu].forEach( menuButton => {
    menuButton.addEventListener('click', () => {
      (headerButtonSearch.className.baseVal.indexOf("active")>0) && 
        (form.className=form.className.replace(" header-inverted-featured__btn-search-close", ""),
        headerButtonSearch.className.baseVal=headerButtonSearch.className.baseVal.replace(" active", ""),
        buscadorContainer.className=buscadorContainer.className.replace(" flex", " hidden"),
        band.className=band.className.replace(" mt-70", ""),
        searchButton.className.baseVal=searchButton.className.baseVal.concat(" hidden")
        );

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
const $iconMenu = document.body.querySelector(".header-inverted-featured__icon-menu"),
const $navSidebar=document.body.querySelector(".nav-sidebar")
const $svgInline = $header.querySelector(".svg-inline-close")
const $buttonMenu = $header.querySelector('.header-inverted-featured__btn-menu')
;searchButton.addEventListener('click', () => {
(iconMenu.className.baseVal.indexOf("icon-hamburguer")<=0) && (
  navSidebar.className=navSidebar.className.concat(" hidden"),
  iconMenu.className.baseVal=iconMenu.className.baseVal.replace("icon-close hidden","icon-hamburguer"),
  svgInline.className.baseVal=svgInline.className.baseVal.concat(" hidden"),
  buttonMenu.className=buttonMenu.className.replace(" header-inverted-featured__btn-menu-close", "") 
);
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
d=document.getElementById("header-search-input"),
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
  i.className=i.className.replace(" mt-70", " mt-0")
)
:(f.className=f.className.concat(" header-inverted-featured__btn-search-close"),
  b.className.baseVal=b.className.baseVal.concat(" active"),
  c.className.baseVal=c.className.baseVal.replace(" hidden", ""),
  s.className=s.className.replace(" hidden", " flex"),
  d.focus(),
  i.className=i.className.replace(" mt-0", " mt-70")
)
})
})})`

/* */
export const initSearch = `window.addEventListener("DOMContentLoaded",function(){requestIdle(function(){ 
var s=document.body.querySelector('.header-inverted-featured__buscador-container'),
f=document.getElementById("header-search-form"),
b=document.body.querySelector('.header-inverted-featured__btn-search'),
c=document.body.querySelector('.search-button-close'),
i=document.body.querySelector('.header-inverted-featured__band');
if (location.pathname.split('/').filter(l => l !== '')[0] === 'buscar') {
  f.className=f.className.concat(" header-inverted-featured__btn-search-close");
  b.className.baseVal=b.className.baseVal.concat(" active");
  c.className.baseVal=c.className.baseVal.replace(" hidden", "");
  s.className=s.className.replace(" hidden", " flex");
  i.className=i.className.replace(" mt-0", " mt-70")
}
})})`

/** */
export const sections = `window.addEventListener("load",function(){requestIdle(function(){ 
var f=document.body.querySelectorAll('.header-inverted-featured__features-link__inverted');
f.forEach((e) => {
  let h=e.getAttribute("href");
  if (e.getAttribute("href").split('/').pop() !== '') {h=h+'/';}
  if (location.pathname === h) {
    e.className=e.className.concat(" active");
  }
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
var t=a.value;
if(t){
  var n=encodeURIComponent(t).replace(/%20/g,"+");
  window.location.href="/buscar/".concat(n,"/todas/descendiente/?query=").concat(n);
}})
;a.addEventListener("keydown", function(e){
if( e.keyCode === 13 ) {
  var t=a.value;
  var n=encodeURIComponent(t).replace(/%20/g,"+");
  window.location.href="/buscar/".concat(n,"/todas/descendiente/?query=").concat(n);
}
})
})})`

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

// FALTA
/* 
window.addEventListener('load', () => {requestIdle(() => {
const $header = document.querySelector(".header-inverted-featured")
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
export const sticky = `
var a = document.querySelector(".header-inverted-featured")
var o = new IntersectionObserver(
([e]) => e.target.classList.toggle("header-inverted-featured__header-sticky", e.intersectionRatio < 1),
{ threshold: [1] }
);
o.observe(a);`
export const stickyLoaded = `window.addEventListener("DOMContentLoaded",function(){requestIdle(function(){ 
var a = document.querySelector(".header-inverted-featured")
var o = new IntersectionObserver(
([e]) => e.target.classList.toggle("header-inverted-featured__header-sticky", e.intersectionRatio < 1),
{ threshold: [1] }
);
o.observe(a);
})});`

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

/* TODO: Agregar la lógica sin minificar de este script, no son iguales */
/* 
document.addEventListener('DOMContentLoaded', function() {
  requestIdle(() => {
    const localProfile = JSON.parse(
      window.localStorage.getItem('ArcId.USER_PROFILE') 
    )
    const { firstName = '', lastName = '', uuid = '' } = localProfile || {}
    const signwallButton = document.getElementById('signwall-nav-btn')

    signwallButton.addEventListener("click", () => {
      if (uuid) {
        window.location.href  = '/mi-perfil/?outputType=subscriptions'
      } else {
        window.location.href  = '/signwall/?outputType=subscriptions&signwallOrganic=1'
      }
    })

    if (uuid) {
      if(firstName || lastName) {
        const username = `${firstName} ${lastName}`
          .replace(/null|undefined/gi, '')
          .trim()
        signwallButton.innerHTML = username.length >= 13 ? `${username.slice(0, 13)}...` : username || 'Mi Perfil'
      } else {
        signwallButton.innerHTML = 'Mi Perfil'
      }
    }
  })
}) */

export const singwallScript =
  '"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE"))||{},n=e.firstName,t=void 0===n?"":n,i=e.lastName,o=void 0===i?"":i,c=e.uuid,a=void 0===c?"":c,l=document.getElementById("signwall-nav-btn");if(l.addEventListener("click",function(){window.location.href=a?"/mi-perfil/?outputType=subscriptions":"/signwall/?outputType=subscriptions&signwallOrganic=1"}),a)if(t||o){var r="".concat(t," ").concat(o).replace(/null|undefined/gi,"").trim();l.innerHTML=r.length>=13?"".concat(r.slice(0,13),"..."):r||"Mi Perfil"}else l.innerHTML="Mi Perfil"})});'

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
