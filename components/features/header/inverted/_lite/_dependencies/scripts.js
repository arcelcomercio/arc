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
      const signwallButton = document.querySelector('.h-basic__user-txt')
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
    document.querySelector('.h-basic__sub').addEventListener('click', () => {
      window.location.href = `/suscripciones/?ref=btn-suscribete-elcomercio&loc=${locUrl}`
    })
  })
}) */

export const singwallScript = ({ arcSite, arcEnv, locUrl }) =>
  `"use strict";var arcSite="${arcSite}",arcEnv="${arcEnv}",locUrl="${locUrl}";document.addEventListener("DOMContentLoaded",function(){var e=function(e){window.dataLayer=window.dataLayer||[];var n={event:"tag_signwall",eventCategory:"Web_Sign_Wall_General",eventAction:e};window.dataLayer.push(n),"sandbox"===arcEnv&&window.console.log(n)};window.requestIdle(function(){var n=JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE"))||{},i=n.firstName,t=void 0===i?"":i,a=n.lastName,c=void 0===a?"":a,o=n.uuid,r=void 0===o?"":o;if(document.querySelector(".h-basic__btn-user").addEventListener("click",function(){r?(e("web_swg_link_ingresaperfil"),window.location.href="prod"===arcEnv?"/mi-perfil/?outputType=signwall":"/mi-perfil/?_website=".concat(arcSite,"&outputType=signwall")):(e("web_swg_link_ingresacuenta"),window.location.href="prod"===arcEnv?"/signwall/?outputType=signwall&signwallOrganic=1":"/signwall/?_website=".concat(arcSite,"&outputType=signwall&signwallOrganic=1"))}),r){var l=document.querySelector(".h-basic__user-txt");if(!t&&!c||"undefined"===t&&"undefined"===c)l.innerHTML="Bienvenido Usuario";else{var d="";t&&c?d="".concat("undefined"!==t?t:""," ").concat("undefined"!==c?c:""):t&&!c?d=t:!t&&c&&(d=c),l.innerHTML=d.length>30?"".concat(d.slice(0,30),"..."):d}}document.querySelector(".h-basic__sub").addEventListener("click",function(){window.location.href="/suscripciones/?ref=btn-suscribete-elcomercio&loc=".concat(locUrl)})})});`
