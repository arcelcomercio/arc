/* document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById("h-basic_search-btn")
  button.addEventListener("click", () => {
    const input = document.getElementById("h-basic_search-input")
    const svgPath = document.getElementById("h-basic_search-path")
    if (input.value) {
      const newQuery = encodeURIComponent(input.value).replace(/%20/g, '+')
      window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}`
    }
    else if (input.style.width === "150px")  {
      input.style = ""
      button.style = ""
      svgPath.style = ""
    } else {
      input.style = "width:150px;padding: 5px 8px;"
      button.style = "background-color: white;border-top-right-radius: 4px;border-bottom-right-radius: 4px;"
      svgPath.style = "fill: #575757;"
    }
  })
}) */
export const searchScript =
  'document.addEventListener("DOMContentLoaded",function(){var e=document.getElementById("h-basic_search-btn");e.addEventListener("click",function(){var t=document.getElementById("h-basic_search-input"),n=document.getElementById("h-basic_search-path");if(t.value){var d=encodeURIComponent(t.value).replace(/%20/g,"+");window.location.href="/buscar/".concat(d,"/todas/descendiente/?query=").concat(d)}else"150px"===t.style.width?(t.style="",e.style="",n.style=""):(t.style="width:150px;padding: 5px 8px;",e.style="background-color: white;border-top-right-radius: 4px;border-bottom-right-radius: 4px;",n.style="fill: #575757;")})});'

/* document.addEventListener('DOMContentLoaded', () => {
  if ('IntersectionObserver' in window) {
    const headerPointer = document.getElementById('h-basic-pointer')
    const header = document.getElementById('h-basic')
    const sectionOneObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          header.classList.add('scrolled')
          headerPointer.classList.add('scrolled')
        } else {
          header.classList.remove('scrolled')
          headerPointer.classList.remove('scrolled')
        }
      })
    })
    sectionOneObserver.observe(headerPointer)
  } else {
    const header = document.getElementById('h-basic')
    window.addEventListener('scroll', () => {
      const { body = {}, documentElement = {} } = document
      const { scrollTop: scrollBody = 0 } = body
      const { scrollTop: scrollElement = 0 } = documentElement
      const scroll = scrollBody || scrollElement
  
      const headerTop = 10
      if (scroll > headerTop && !header.classList.contains('scrolled')) {
        header.classList.add('scrolled')
      } else if (scroll <= headerTop && header.classList.contains('scrolled')) {
        header.classList.remove('scrolled')
      }
    })
  }
})   */
export const stickyScript =
  ';document.addEventListener("DOMContentLoaded",function(){if("IntersectionObserver"in window){var e=document.getElementById("h-basic-pointer"),s=document.getElementById("h-basic");new IntersectionObserver(function(o){o.forEach(function(o){o.isIntersecting?(s.classList.remove("scrolled"),e.classList.remove("scrolled")):(s.classList.add("scrolled"),e.classList.add("scrolled"))})}).observe(e)}else{var o=document.getElementById("h-basic");window.addEventListener("scroll",function(){var e=document,s=e.body,t=void 0===s?{}:s,c=e.documentElement,n=void 0===c?{}:c,d=t.scrollTop,l=void 0===d?0:d,i=n.scrollTop,r=l||(void 0===i?0:i);r>10&&!o.classList.contains("scrolled")?o.classList.add("scrolled"):r<=10&&o.classList.contains("scrolled")&&o.classList.remove("scrolled")})}});'

/* ;window.addEventListener('load', () => {
    setTimeout(() => {
      const $button = document.getElementById('h-basic__btn-menu')
      $button.addEventListener('click', () => {
        const $menu = document.getElementById('menu')
        const $mcontent = document.getElementById('m-content')
        if ($menu.className.includes('active')){
          $menu.className = $menu.className.replace('active', '')
          $menu.setAttribute('aria-expanded', false)
          $mcontent.className = $mcontent.className.replace('active', '')
        }
        else {
          $menu.className = $menu.className.concat(' active')
          $menu.setAttribute('aria-expanded', true)
          $mcontent.className = $mcontent.className.concat(' active')
        }
      })
      const $form = document.getElementById("m-search")
      $form.addEventListener('submit', e => {
        e.preventDefault()
        const value = e.target[0].value
        if(value){
        const newQuery = encodeURIComponent(value).replace(/%20/g, '+')
        window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}`}
      });
    }, 0)
  }) */
export const menuScript =
  '"use strict";window.addEventListener("load",function(){setTimeout(function(){document.getElementById("h-basic__btn-menu").addEventListener("click",function(){var e=document.getElementById("menu"),t=document.getElementById("m-content");e.className.includes("active")?(e.className=e.className.replace("active",""),e.setAttribute("aria-expanded",!1),t.className=t.className.replace("active","")):(e.className=e.className.concat(" active"),e.setAttribute("aria-expanded",!0),t.className=t.className.concat(" active"))}),document.getElementById("m-search").addEventListener("submit",function(e){e.preventDefault();var t=e.target[0].value;if(t){var a=encodeURIComponent(t).replace(/%20/g,"+");window.location.href="/buscar/".concat(a,"/todas/descendiente/?query=").concat(a)}})},0)});'

/* document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    const localProfile = JSON.parse(
      window.localStorage.getItem('ArcId.USER_PROFILE') ||
        window.sessionStorage.getItem('ArcId.USER_PROFILE')
    )
    const { firstName = '', lastName = '', uuid = '' } = localProfile || {}
    document.querySelector('.h-basic__btn-user').addEventListener("click", () => {
      if (uuid) {
        window.location.href  = '/mi-perfil/?outputType=signwall'
      } else {
        // window.location.href  = '/signwall/?outputType=signwall'
        window.location.href  = '/politica/?reloginEmail=1'
      }
    })
    if (uuid) {
      const signwallButton = document.querySelector('.h-basic__user-txt')
      // const signwallIcon = document.getElementById('signwall-nav-icon')
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
        signwallButton.innerHTML = buttonText.length >= 10 ? `${buttonText.slice(0, 10)}...` : buttonText
      }
    }
    document.querySelector('.h-basic__sub').addEventListener("click", () => {
      window.location.href  = '/suscripciones/?ref=btn-suscribete-elcomercio&loc=<<loc>>'
    })
  }, 0)
}) */

export const singwallScript =
  '"use strict";document.addEventListener("DOMContentLoaded",function(){setTimeout(function(){var e=JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE")||window.sessionStorage.getItem("ArcId.USER_PROFILE"))||{},c=e.firstName,t=void 0===c?"":c,n=e.lastName,o=void 0===n?"":n,i=e.uuid,a=void 0===i?"":i;if(document.querySelector(".h-basic__btn-user").addEventListener("click",function(){window.location.href=a?"/mi-perfil/?outputType=signwall":"/politica/?reloginEmail=1"}),a){var r=document.querySelector(".h-basic__user-txt");if(t||o){var s="";t&&o?(s="".concat(t," ").concat(o),"".concat(t[0]||"").concat(o[0]||"")):t&&!o?(s=t,"".concat(t[0]||"").concat(t[1]||"")):!t&&o&&(s=o,"".concat(o[0]||"").concat(o[1]||"")),r.innerHTML=s.length>=10?"".concat(s.slice(0,10),"..."):s}else r.innerHTML="Bienvenido Usuario"}document.querySelector(".h-basic__sub").addEventListener("click",function(){window.location.href="/suscripciones/?ref=btn-suscribete-elcomercio&loc=<<loc>>"})},0)});'
