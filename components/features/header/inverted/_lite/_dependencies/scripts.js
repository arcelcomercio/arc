/* document.addEventListener('DOMContentLoaded', () => {
  window.requestIdle(() => {
    const button = document.getElementById("h-basic_search-btn")
    button.addEventListener("click", () => {
      const input = document.getElementById("h-basic_search-input")
      // const svgPath = document.getElementById("h-basic_search-path")
      if (input.value) {
        const newQuery = encodeURIComponent(input.value).replace(/%20/g, '+')
        window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}`
      }
      else if (input.style.width === "150px")  {
        input.style = ""
        button.style = ""
        // svgPath.style = ""
      } else {
        input.style = "width:150px;padding: 5px 8px;"
        button.style = "background-color: white;border-top-right-radius: 4px;border-bottom-right-radius: 4px;"
        // svgPath.style = "fill: #575757;"
      }
    })
  })
}) */
export const searchScript =
  'document.addEventListener("DOMContentLoaded",function(){window.requestIdle(function(){var e=document.getElementById("h-basic_search-btn");e.addEventListener("click",function(){var t=document.getElementById("h-basic_search-input");if(t.value){var n=encodeURIComponent(t.value).replace(/%20/g,"+");window.location.href="/buscar/"+n+"/todas/descendiente/?query="+n}else"150px"===t.style.width?(t.style="",e.style=""):(t.style="width:150px;padding: 5px 8px;",e.style="background-color: white;border-top-right-radius: 4px;border-bottom-right-radius: 4px;")})})});'

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
/* 

    PARA EL DISENO DEL SPRINT9 SE CONTEMPLA EL HEADER SIN STICKY

export const stickyScript =
  ';document.addEventListener("DOMContentLoaded",function(){if("IntersectionObserver"in window){var e=document.getElementById("h-basic-pointer"),s=document.getElementById("h-basic");new IntersectionObserver(function(o){o.forEach(function(o){o.isIntersecting?(s.classList.remove("scrolled"),e.classList.remove("scrolled")):(s.classList.add("scrolled"),e.classList.add("scrolled"))})}).observe(e)}else{var o=document.getElementById("h-basic");window.addEventListener("scroll",function(){var e=document,s=e.body,t=void 0===s?{}:s,c=e.documentElement,n=void 0===c?{}:c,d=t.scrollTop,l=void 0===d?0:d,i=n.scrollTop,r=l||(void 0===i?0:i);r>10&&!o.classList.contains("scrolled")?o.classList.add("scrolled"):r<=10&&o.classList.contains("scrolled")&&o.classList.remove("scrolled")})}});' */

/* ;window.addEventListener('load', () => {
    window.requestIdle(() => {
      const $button = document.getElementById('h-basic__btn-menu')
      $button.addEventListener('click', () => {
        const $menu = document.getElementById('menu')
        const $mcontent = document.getElementById('m-content')
        const $body = document.body
        if ($menu.className.includes('active')){
          $menu.className = $menu.className.replace('active', '')
          $menu.setAttribute('aria-expanded', false)
          $mcontent.className = $mcontent.className.replace('active', '')
          $body.className = $body.className.replace(' oflow-h', '')
        }
        else {
          $menu.className = $menu.className.concat(' active')
          $menu.setAttribute('aria-expanded', true)
          $mcontent.className = $mcontent.className.concat(' active')
          $body.className = $body.className.concat(' oflow-h')
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
    })
  }) */
export const menuScript =
  'window.addEventListener("load",function(){window.requestIdle(function(){document.getElementById("h-basic__btn-menu").addEventListener("click",function(){var e=document.getElementById("menu"),a=document.getElementById("m-content"),t=document.body;e.className.includes("active")?(e.className=e.className.replace("active",""),e.setAttribute("aria-expanded",!1),a.className=a.className.replace("active",""),t.className=t.className.replace(" oflow-h","")):(e.className=e.className.concat(" active"),e.setAttribute("aria-expanded",!0),a.className=a.className.concat(" active"),t.className=t.className.concat(" oflow-h"))}),document.getElementById("m-search").addEventListener("submit",function(e){e.preventDefault();var a=e.target[0].value;if(a){var t=encodeURIComponent(a).replace(/%20/g,"+");window.location.href="/buscar/"+t+"/todas/descendiente/?query="+t}})})});'

/* document.addEventListener('DOMContentLoaded', function() {
  window.requestIdle(() => {
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
        signwallButton.innerHTML = buttonText.length > 30 ? `${buttonText.slice(0, 30)}...` : buttonText
      }
    }
    document.querySelector('.h-basic__sub').addEventListener("click", () => {
      window.location.href  = '/suscripciones/?ref=btn-suscribete-elcomercio&loc=<<loc>>'
    })
  })
}) */

export const singwallScript =
  'document.addEventListener("DOMContentLoaded",function(){window.requestIdle(function(){var e=JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE")||window.sessionStorage.getItem("ArcId.USER_PROFILE"))||{},i=e.firstName,n=void 0===i?"":i,o=e.lastName,t=void 0===o?"":o,c=e.uuid,r=void 0===c?"":c;if(document.querySelector(".h-basic__btn-user").addEventListener("click",function(){window.location.href=r?"/mi-perfil/?outputType=signwall":"/politica/?reloginEmail=1"}),r){var d=document.querySelector(".h-basic__user-txt");if(n||t){var s="";n&&t?(s=n+" "+t,""+(n[0]||"")+(t[0]||"")):n&&!t?(s=n,""+(n[0]||"")+(n[1]||"")):!n&&t&&(s=t,""+(t[0]||"")+(t[1]||"")),d.innerHTML=s.length>30?s.slice(0,30)+"...":s}else d.innerHTML="Bienvenido Usuario"}document.querySelector(".h-basic__sub").addEventListener("click",function(){window.location.href="/suscripciones/?ref=btn-suscribete-elcomercio&loc=<<loc>>"})})});'
