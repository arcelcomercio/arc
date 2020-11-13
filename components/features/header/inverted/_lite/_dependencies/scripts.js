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
  requestIdle(() => {
    const laterales = [].slice.call(document.getElementsByClassName('ad-lateral'))
    const headerPointer = document.getElementById('h-basic-pointer')
  
    function addScrolled() {
      headerPointer.className = headerPointer.className.concat(' scrolled')
      laterales.forEach(lateral => {
        lateral.className = lateral.className.concat(' scrolled')
      })
    }
    function removeScrolled() {
      headerPointer.className = headerPointer.className.replace('scrolled', '')
      laterales.forEach(lateral => {
        lateral.className = lateral.className.replace('scrolled', '')
      })
    }
    if ('IntersectionObserver' in window) {
      const sectionOneObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            removeScrolled()
          } else {
            addScrolled()
          }
        })
      })
      sectionOneObserver.observe(headerPointer)
    } else {
      window.addEventListener('scroll', () => {
        const { body = {}, documentElement = {} } = document
        const { scrollTop: scrollBody = 0 } = body
        const { scrollTop: scrollElement = 0 } = documentElement
        const scroll = scrollBody || scrollElement
    
        const headerTop = 60
        if (scroll > headerTop && !headerPointer.className.includes('scrolled')) {
          addScrolled()
        } else if (scroll <= headerTop && headerPointer.className.includes('scrolled')) {
          removeScrolled()
        }
      })
    }
  })
})   */

export const stickyScript =
  '"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=[].slice.call(document.getElementsByClassName("ad-lateral")),c=document.getElementById("h-basic-pointer");function s(){c.className=c.className.concat(" scrolled"),e.forEach(function(e){e.className=e.className.concat(" scrolled")})}function n(){c.className=c.className.replace("scrolled",""),e.forEach(function(e){e.className=e.className.replace("scrolled","")})}"IntersectionObserver"in window?new IntersectionObserver(function(e){e.forEach(function(e){e.isIntersecting?n():s()})}).observe(c):window.addEventListener("scroll",function(){var e=document,o=e.body,l=void 0===o?{}:o,a=e.documentElement,t=void 0===a?{}:a,r=l.scrollTop,d=void 0===r?0:r,i=t.scrollTop,m=d||(void 0===i?0:i);m>60&&!c.className.includes("scrolled")?s():m<=60&&c.className.includes("scrolled")&&n()})})});'

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

/*
const arcSite = '${arcSite}'
const arcEnv = '${arcEnv}'
const locUrl = '${locUrl}'

document.addEventListener('DOMContentLoaded', function() {
  const Taggeo = acc => {
    window.dataLayer = window.dataLayer || []
    const dataPush = {
      event: 'tag_signwall',
      eventCategory: 'Web_Sign_Wall_General',
      eventAction: acc,
    }
    window.dataLayer.push(dataPush)
    if (arcEnv === 'sandbox') {
      window.console.log(dataPush)
    }
  }

  window.requestIdle(() => {
    const localProfile = JSON.parse(
      window.localStorage.getItem('ArcId.USER_PROFILE')
    )
    const { firstName = '', lastName = '', uuid = '' } = localProfile || {}
    document
      .querySelector('.h-basic__btn-user')
      .addEventListener('click', () => {
        if (uuid) {
          Taggeo('web_swg_link_ingresaperfil')
          window.location.href =
            arcEnv === 'prod'
              ? '/mi-perfil/?outputType=signwall'
              : `/mi-perfil/?_website=${arcSite}&outputType=signwall`
        } else {
          Taggeo('web_swg_link_ingresacuenta')
          window.location.href =
            arcEnv === 'prod'
              ? '/signwall/?outputType=signwall&signwallOrganic=1'
              : `/signwall/?_website=${arcSite}&outputType=signwall&signwallOrganic=1`
        }
      })
    if (uuid) {
      const signwallButton = document.body.querySelector('.h-basic__user-txt')
      // const signwallIcon = document.getElementById('signwall-nav-icon')
      if (
        (!firstName && !lastName) ||
        (firstName === 'undefined' && lastName === 'undefined')
      ) {
        signwallButton.innerHTML = 'Bienvenido Usuario'
      } else {
        let buttonText = ''
        // let iconText = ''
        if (firstName && lastName) {
          buttonText = `${firstName !== 'undefined' ? firstName : ''} ${
            lastName !== 'undefined' ? lastName : ''
          }`
          // iconText = `${firstName[0] || ''}${lastName[0] || ''}`
        } else if (firstName && !lastName) {
          buttonText = firstName
          // iconText = `${firstName[0] || ''}${firstName[1] || ''}`
        } else if (!firstName && lastName) {
          buttonText = lastName
          // iconText = `${lastName[0] || ''}${lastName[1] || ''}`
        }
        signwallButton.innerHTML =
          buttonText.length > 30 ? `${buttonText.slice(0, 30)}...` : buttonText
      }
    }
    document.body.querySelector('.h-basic__sub').addEventListener('click', () => {
      window.location.href = `/suscripciones/?ref=btn-suscribete-elcomercio&loc=${locUrl}`
    })
  })
}) */

export const singwallScript = ({ arcSite, arcEnv, locUrl }) =>
  `var arcSite="${arcSite}",arcEnv="${arcEnv}",locUrl="${locUrl}";document.addEventListener("DOMContentLoaded",function(){var e=function(e){window.dataLayer=window.dataLayer||[];var n={event:"tag_signwall",eventCategory:"Web_Sign_Wall_General",eventAction:e};window.dataLayer.push(n),"sandbox"===arcEnv&&window.console.log(n)};window.requestIdle(function(){var n=JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE"))||{},i=n.firstName,t=void 0===i?"":i,a=n.lastName,r=void 0===a?"":a,o=n.uuid,l=void 0===o?"":o;if(document.querySelector(".h-basic__btn-user").addEventListener("click",function(){l?(e("web_swg_link_ingresaperfil"),window.location.href="prod"===arcEnv?"/mi-perfil/?outputType=signwall":"/mi-perfil/?_website="+arcSite+"&outputType=signwall"):(e("web_swg_link_ingresacuenta"),window.location.href="prod"===arcEnv?"/signwall/?outputType=signwall&signwallOrganic=1":"/signwall/?_website="+arcSite+"&outputType=signwall&signwallOrganic=1")}),l){var c=document.body.querySelector(".h-basic__user-txt");if(!t&&!r||"undefined"===t&&"undefined"===r)c.innerHTML="Bienvenido Usuario";else{var d="";t&&r?d=("undefined"!==t?t:"")+" "+("undefined"!==r?r:""):t&&!r?d=t:!t&&r&&(d=r),c.innerHTML=d.length>30?d.slice(0,30)+"...":d}}document.body.querySelector(".h-basic__sub").addEventListener("click",function(){window.location.href="/suscripciones/?ref=btn-suscribete-elcomercio&loc="+locUrl})})});`
