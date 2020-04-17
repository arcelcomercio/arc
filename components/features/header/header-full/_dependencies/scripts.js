/* window.addEventListener('load', () => {setTimeout(() => {
  if(!window.shareButtons){
    const windowW = 600
    const windowH = 400
    const $shareButtons = document.querySelectorAll('a[data-share]')
    if ($shareButtons && $shareButtons.length > 0) {
      const wLeft = window.screen.width / 2 - windowW / 2
      const wTop = window.screen.height / 2 - windowH / 2
      $shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault()
          window.open(
            button.getAttribute('href'),
            '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${windowW}, height=${windowH}, top=${wTop}, left=${wLeft}`
          )
        })
      })
    }
  }
}, 0)}) */
export const popup =
  '"use strict";window.addEventListener("load",function(){setTimeout(function(){var t=document.querySelectorAll("a[data-share]");if(t&&t.length>0){var n=window.screen.width/2-300,o=window.screen.height/2-200;t.forEach(function(t){t.addEventListener("click",function(e){e.preventDefault(),window.open(t.getAttribute("href"),"","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=".concat(600,", height=").concat(400,", top=").concat(o,", left=").concat(n))})})}},0)});'

/*   document.addEventListener('DOMContentLoaded', () => {setTimeout(() => {
    document.getElementById('header-show-more').addEventListener('click', (e) => {
      e.preventDefault()
      const el = document.querySelector('.story-header__list')
      if (el.className.indexOf('flex') > 0) {
        el.className = el.className.replace('flex', 'hidden')
      } else {
        el.className = el.className.replace('hidden', 'flex')
      }
    })
  }, 0)}) */

export const showMore =
  'document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){document.getElementById("header-show-more").addEventListener("click",function(e){e.preventDefault();var t=document.querySelector(".story-header__list");t.className=t.className.indexOf("flex")>0?t.className.replace("flex","hidden"):t.className.replace("hidden","flex")})},0)});'

/* window.addEventListener('load', () => {setTimeout(() => {
  const $searchForm = document.getElementById('header-search-form')
  $searchForm.addEventListener('submit', e => {
    e.preventDefault()
    const value = e.target[0].value
    if(value){
      const newQuery = encodeURIComponent(value).replace(/%20/g, '+')
      window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}`
    }
  })
}, 0)}) */

export const searchScript =
  'window.addEventListener("load",function(){document.getElementById("header-search-form").addEventListener("submit",function(e){e.preventDefault();var t=e.target[0].value;if(t){var n=encodeURIComponent(t).replace(/%20/g,"+");window.location.href="/buscar/".concat(n,"/todas/descendiente/?query=").concat(n);}})});'

/* window.addEventListener('scroll', function() {
  const { body = {}, documentElement = {} } = document;
  const { scrollTop: scrollBody = 0 } = body;
  const { scrollTop: scrollElement = 0 } = documentElement;
  const scroll = scrollBody || scrollElement;

  const headerTop = 10;
  const $el = document.querySelector('.nav__story-social-network');
  const $header = document.querySelector('div[data-story-header="true"]');
  const $resultadosBtn = document.querySelector('.header-full__btn-container');
  const $llamadaBtn = document.querySelector('.header-full__call-img');
  
  const scrolled = $header.className.indexOf('active')
  if (scrolled < 0 && scroll > headerTop) {
    $header.className = $header.className.concat(' active');
    $el.className = $el.className.replace('hidden', '');
    if($resultadosBtn) 
      $resultadosBtn.className = $resultadosBtn.className.concat(' hidden');
    else 
      $llamadaBtn.className = $resultadosBtn.className.concat(' hidden');
  } else if (scrolled > 0 && scroll <= headerTop) {
    $header.className = $header.className.replace(' active', '');
    $el.className = $el.className.concat('hidden');
    if($resultadosBtn) 
      $resultadosBtn.className = $resultadosBtn.className.replace(' hidden', '');
    else
      $llamadaBtn.className = $resultadosBtn.className.replace(' hidden', '');
  }
})
 */

export const scrolled = `window.addEventListener("scroll",function(){var e=document,a=e.body,c=void 0===a?{}:a,s=e.documentElement,l=void 0===s?{}:s,d=c.scrollTop,o=void 0===d?0:d,t=l.scrollTop,n=o||(void 0===t?0:t),r=document.querySelector(".nav__story-social-network"),m=document.querySelector('div[data-story-header="true"]'),i=document.querySelector(".header-full__btn-container"),N=document.querySelector(".header-full__call-img"),u=m.className.indexOf("active");u<0&&n>10?(m.className=m.className.concat(" active"),r.className=r.className.replace("hidden",""),i?i.className=i.className.concat(" hidden"):N.className=i.className.concat(" hidden")):u>0&&n<=10&&(m.className=m.className.replace(" active",""),r.className=r.className.concat("hidden"),i?i.className=i.className.replace(" hidden",""):N.className=i.className.replace(" hidden",""))});`

/*
window.addEventListener('load', () => {setTimeout(() => {
  const $showSubmenu = document.querySelectorAll('.header-full__angle')
  $showSubmenu.forEach(button => {
    button.addEventListener('click', (e) => {
      const item = e.target.parentElement
      const list = item.querySelector('.header-full__submenu-list')
      if(list.className.indexOf('active') > 0)
        list.className = list.className.replace('active', '')
      else 
        list.className = list.className.concat(' active')
    })
  })
}, 0)})
 */

export const showSubmenu =
  'window.addEventListener("load",function(){setTimeout(function(){document.querySelectorAll(".header-full__angle").forEach(function(e){e.addEventListener("click",function(e){var t=e.target.parentElement.querySelector(".header-full__submenu-list");t.className=t.className.indexOf("active")>0?t.className.replace("active",""):t.className.concat(" active")})})},0)});'

/*
window.addEventListener('load', () => {setTimeout(() => {
  const $btnMenu = document.getElementById('btn-menu')
  const $btnCloseMenu = document.getElementById('btn-close-menu')

  const $menuBtnBox = document.querySelector('.header-full__box-btnmenu')
  const $menuIcon = document.querySelector('.header-full__icon-menu')
  const $menuWrapper = document.querySelector('.header-full__wrapper-menu')
  const $megaMenu = document.querySelector('.header-full__megamenu')
  const $sidebarWrapper = document.querySelector('.nav-sidebar__wrapper')
  
  ;[$btnMenu,$btnCloseMenu].forEach( menuButton => {
    menuButton.addEventListener('click', () => {
      if($menuIcon.className.indexOf('icon-hamburguer') > 0) {
        $menuBtnBox.className = $menuBtnBox.className.concat(' bg-white')
        $menuIcon.className = $menuIcon.className.replace('icon-hamburguer', 'icon-close active')
        $menuWrapper.className = $menuWrapper.className.concat(' active')
        $megaMenu.className = $megaMenu.className.concat(' active')
        $sidebarWrapper.className = $sidebarWrapper.className.concat(' active')
      } else {
        $menuBtnBox.className = $menuBtnBox.className.replace(' bg-white', '')
        $menuIcon.className = $menuIcon.className.replace('icon-close active', 'icon-hamburguer')
        $menuWrapper.className = $menuWrapper.className.replace(' active', '')
        $megaMenu.className = $megaMenu.className.replace(' active', '')
        $sidebarWrapper.className = $sidebarWrapper.className.replace(' active', '')
      }
    })
  })
}, 0)})
*/

export const toggleMenu = `"use strict";window.addEventListener("load",function(){setTimeout(function(){var e=document.getElementById("btn-menu"),a=document.getElementById("btn-close-menu"),c=document.querySelector(".header-full__box-btnmenu"),s=document.querySelector(".header-full__icon-menu"),l=document.querySelector(".header-full__wrapper-menu"),t=document.querySelector(".header-full__megamenu"),n=document.querySelector(".nav-sidebar__wrapper");[e,a].forEach(function(e){e.addEventListener("click",function(){s.className.indexOf("icon-hamburguer")>0?(c.className=c.className.concat(" bg-white"),s.className=s.className.replace("icon-hamburguer","icon-close active"),l.className=l.className.concat(" active"),t.className=t.className.concat(" active"),n.className=n.className.concat(" active")):(c.className=c.className.replace(" bg-white",""),s.className=s.className.replace("icon-close active","icon-hamburguer"),l.className=l.className.replace(" active",""),t.className=t.className.replace(" active",""),n.className=n.className.replace(" active",""))})})},0)});`
