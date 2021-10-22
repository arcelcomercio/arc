/* import {
  SITE_ELCOMERCIO,
  SITE_GESTION,
} from '../../../../utilities/constants/sitenames'
*/

/* window.addEventListener('load', () => {requestIdle(() => {
  if(!window.shareButtons){
    const windowW = 600
    const windowH = 400
    const $shareButtons = document.body.querySelectorAll('a[data-share]')
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
})}) */
export const popup =
  '"use strict";window.addEventListener("load",function(){requestIdle(function(){var t=document.body.querySelectorAll("a[data-share]");if(t&&t.length>0){var n=window.screen.width/2-300,o=window.screen.height/2-200;t.forEach(function(t){t.addEventListener("click",function(e){e.preventDefault(),window.open(t.getAttribute("href"),"","toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=".concat(600,", height=").concat(400,", top=").concat(o,", left=").concat(n))})})}})});'

/*   document.addEventListener('DOMContentLoaded', () => {requestIdle(() => {
    document.getElementById('header-show-more').addEventListener('click', (e) => {
      e.preventDefault()
      const el = document.body.querySelector('.story-header__list')
      if (el.className.indexOf('flex') > 0) {
        el.className = el.className.replace('flex', 'hidden')
      } else {
        el.className = el.className.replace('hidden', 'flex')
      }
    })
  })}) */

export const showMore =
  'document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){document.getElementById("header-show-more").addEventListener("click",function(e){e.preventDefault();var t=document.body.querySelector(".story-header__list");t.className=t.className.indexOf("flex")>0?t.className.replace("flex","hidden"):t.className.replace("hidden","flex")})})});'

/* window.addEventListener('load', () => {requestIdle(() => {
  const $searchForm = document.getElementById('header-search-form')
  $searchForm.addEventListener('submit', e => {
    e.preventDefault()
    const value = e.target[0].value
    if(value){
      const newQuery = encodeURIComponent(value).replace(/%20/g, '+')
      window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}`
    }
  })
})}) */

export const searchScript =
  'window.addEventListener("load",function(){document.getElementById("header-search-form").addEventListener("submit",function(e){e.preventDefault();var t=e.target[0].value;if(t){var n=encodeURIComponent(t).replace(/%20/g,"+");window.location.href="/buscar/".concat(n,"/todas/descendiente/?query=").concat(n);}})});'

/* 
window.addEventListener('scroll', function() {
  const { body = {}, documentElement = {} } = document;
  const { scrollTop: scrollBody = 0 } = body;
  const { scrollTop: scrollElement = 0 } = documentElement;
  const scroll = scrollBody || scrollElement;
  
  const headerTop = 10;
  const $header = document.body.querySelector('div[data-story-header="true"]');
  const $el = $header.querySelector('.nav__story-social-network');
  const $resultadosBtn = $header.querySelector('.header-full__btn-container');
  const $llamadaBtn = $header.querySelector('.header-full__call-img');
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

export const scrolled = `window.addEventListener("scroll",function(){var e=document,a=e.body,c=void 0===a?{}:a,s=e.documentElement,l=void 0===s?{}:s,d=c.scrollTop,o=void 0===d?0:d,t=l.scrollTop,r=o||(void 0===t?0:t),n=document.body.querySelector('div[data-story-header="true"]'),i=n.querySelector(".nav__story-social-network"),m=n.querySelector(".header-full__btn-container"),N=n.querySelector(".header-full__call-img"),u=n.className.indexOf("active");u<0&&r>10?(n.className=n.className.concat(" active"),i.className=i.className.replace("hidden",""),m?m.className=m.className.concat(" hidden"):N.className=m.className.concat(" hidden")):u>0&&r<=10&&(n.className=n.className.replace(" active",""),i.className=i.className.concat("hidden"),m?m.className=m.className.replace(" hidden",""):N.className=m.className.replace(" hidden",""))});`

/*
window.addEventListener('load', () => {requestIdle(() => {
  const $showSubmenu = document.body.querySelectorAll('.header-full__angle')
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
})})
 */

export const showSubmenu =
  'window.addEventListener("load",function(){requestIdle(function(){document.body.querySelectorAll(".header-full__angle").forEach(function(e){e.addEventListener("click",function(e){var t=e.target.parentElement.querySelector(".header-full__submenu-list");t.className=t.className.indexOf("active")>0?t.className.replace("active",""):t.className.concat(" active")})})})});'

/*
window.addEventListener('load', () => {requestIdle(() => {
  const $btnMenu = document.getElementById('btn-menu')
  const $btnCloseMenu = document.getElementById('btn-close-menu')

  const $header = document.body.querySelector('.header-full')
  const $menuBtnBox = $header.querySelector('.header-full__box-btnmenu')
  const $menuIcon = $header.querySelector('.header-full__icon-menu')
  const $menuWrapper = $header.querySelector('.header-full__wrapper-menu')
  const $megaMenu = $header.querySelector('.header-full__megamenu')
  const $sidebarWrapper = $header.querySelector('.nav-sidebar__wrapper')
  
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
})})
*/

export const toggleMenu = `window.addEventListener("load",function(){requestIdle(function(){var e=document.getElementById("btn-menu"),a=document.getElementById("btn-close-menu"),c=document.body.querySelector(".header-full"),l=c.querySelector(".header-full__box-btnmenu"),s=c.querySelector(".header-full__icon-menu"),t=c.querySelector(".header-full__wrapper-menu"),r=c.querySelector(".header-full__megamenu"),n=c.querySelector(".nav-sidebar__wrapper");[e,a].forEach(function(e){e.addEventListener("click",function(){s.className.indexOf("icon-hamburguer")>0?(l.className=l.className.concat(" bg-white"),s.className=s.className.replace("icon-hamburguer","icon-close active"),t.className=t.className.concat(" active"),r.className=r.className.concat(" active"),n.className=n.className.concat(" active")):(l.className=l.className.replace(" bg-white",""),s.className=s.className.replace("icon-close active","icon-hamburguer"),t.className=t.className.replace(" active",""),r.className=r.className.replace(" active",""),n.className=n.className.replace(" active",""))})})})});`
/*
window.addEventListener('load', () => {requestIdle(() => {
  var more = target.querySelectorAll('div[id=edicionId]')
  more.forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault()
      var shareList = button.querySelector('.header-full__e-content')

      if (shareList.classList.contains('block')) {
        shareList.classList.remove('block')
        shareList.classList.add('hidden')
      } else {
        shareList.classList.remove('hidden')
        shareList.classList.add('block')
      }
    })
  })

})})
*/
export const edicionMenu = `
window.addEventListener("load",()=>{requestIdle(()=>{document.getElementById("edicionId").addEventListener("click",function(e){e.preventDefault();var d=document.querySelector(".header-full__e-content");d.classList.contains("block")?(d.classList.remove("block"),d.classList.add("hidden")):(d.classList.remove("hidden"),d.classList.add("block"))})})});
`
// TODO: Agregar la lógica sin minificar de este script, no son iguales
/* document.addEventListener('DOMContentLoaded', () => {
  requestIdle((SITE = '<<arcSite>>') => {
    const localProfile = JSON.parse(
      window.localStorage.getItem('ArcId.USER_PROFILE')
    )
    const { firstName = '', lastName = '', uuid = '' } = localProfile || {}
    const btnSignwall = document.getElementById('signwall-nav-btn')

    
    if (btnSignwall) {
      btnSignwall.addEventListener('click', () => {
        if (uuid) {
          window.location.href = '/mi-perfil/?outputType=subscriptions'
        } else {
          window.location.href = '/signwall/?outputType=subscriptions'
        }
      })
    }
    if (uuid) {
      const signwallButton = document.getElementById('signwall-nav-user')
      const signwallIcon = document.getElementById('signwall-nav-icon')

      if (!firstName && !lastName) {
        signwallButton.innerHTML =
          SITE === 'elcomercio' || SITE === 'gestion'
            ? 'Bienvenido Usuario'
            : 'Mi Perfil'
      } else {
          buttonText = lastName
          iconText = `${lastName[0] || ''}${lastName[1] || ''}`
        }
        signwallButton.innerHTML =
          buttonText.length >= 15 ? `${buttonText.slice(0, 15)}...` : buttonText
        signwallIcon.innerHTML = iconText
        signwallIcon.className = 'uppercase'
      }
})
*/

/* export const getBtnSignScript =
  '"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE"))||{},n=e.firstName,t=void 0===n?"":n,i=e.lastName,o=void 0===i?"":i,s=e.uuid,a=void 0===s?"":s,n=document.getElementById("signwall-nav-btn");n&&n.addEventListener("click",function(){window.location.href=a?"/mi-perfil/?outputType=subscriptions":"/signwall/?outputType=subscriptions"}),a&&(i=document.getElementById("signwall-nav-user"),e=document.getElementById("signwall-nav-icon"),t||o?(n=s="",t&&o?(s=t+" "+o,n=""+(t[0]||"")+(o[0]||"")):t&&!o?n=""+((s=t)[0]||"")+(t[1]||""):!t&&o&&(n=""+((s=o)[0]||"")+(o[1]||"")),i.innerHTML=15<=s.length?s.slice(0,15)+"...":s,e.innerHTML=n,e.className="uppercase"):i.innerHTML="Bienvenido")})});'
*/

export const getBtnSignScript = (arcSite) =>
  '"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"<<arcSite>>",e=JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE"))||{},t=e.firstName,c=void 0===t?"":t,i=e.lastName,o=void 0===i?"":i,a=e.uuid,s=void 0===a?"":a,t=document.getElementById("signwall-nav-btn");t&&t.addEventListener("click",function(){window.location.href=s?"/mi-perfil/?outputType=subscriptions":"/signwall/?outputType=subscriptions"}),s&&(i=document.getElementById("signwall-nav-user"),e=document.getElementById("signwall-nav-icon"),c||o?(t=a="",c&&o?(a="".concat(c," ").concat(o),t="".concat(c[0]||"").concat(o[0]||"")):c&&!o?t="".concat((a=c)[0]||"").concat(c[1]||""):!c&&o&&(t="".concat((a=o)[0]||"").concat(o[1]||"")),i.innerHTML=15<=a.length?"".concat(a.slice(0,15),"..."):a,e.innerHTML=t,e.className="uppercase"):i.innerHTML="elcomercio"===n||"gestion"===n?"Bienvenido Usuario":"Mi Perfil")})});'.replace(
    '<<arcSite>>',
    arcSite
  )

/*
window.addEventListener('load', () => {requestIdle(() => {
  const searchDeporPlay = document.body.querySelector('.header-full__dpform')
  const inputDeporPlay = document.body.querySelector('.header-full__dpforminput')
  if (searchDeporPlay && inputDeporPlay) {
    searchDeporPlay.addEventListener("submit", (e) => {
      e.preventDefault();
      if (inputDeporPlay.value) {
        const newQuery = encodeURIComponent(inputDeporPlay.value).replace(
          /%20/g,
          "+"
        );
        window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}`;
      }
    });
  }
})})
*/
export const searchDPMenu = `"use strict";window.addEventListener("load",function(){requestIdle(function(){var e=document.body.querySelector(".header-full__dpform"),n=document.body.querySelector(".header-full__dpforminput");e&&n&&e.addEventListener("submit",function(e){if(e.preventDefault(),n.value){var t=encodeURIComponent(n.value).replace(/%20/g,"+");window.location.href="/buscar/"+t+"/todas/descendiente/?query="+t}})})});`
