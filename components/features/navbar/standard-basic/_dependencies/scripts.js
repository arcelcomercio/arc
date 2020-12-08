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

/* document.addEventListener('DOMContentLoaded', () => {
  if ('IntersectionObserver' in window) {
    const navPointer = document.getElementById('nav-pointer')
    const nav = document.querySelector('nav')
    const sectionOneObserver = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          nav.classList.add('active')
          navPointer.classList.add('scrolled')
        } else {
          nav.classList.remove('active')
          navPointer.classList.remove('scrolled')
        }
      })
    })
    sectionOneObserver.observe(navPointer)
  } else {
    const nav = document.querySelector('nav')
    window.addEventListener('scroll', () => {
      const { body = {}, documentElement = {} } = document
      const { scrollTop: scrollBody = 0 } = body
      const { scrollTop: scrollElement = 0 } = documentElement
      const scroll = scrollBody || scrollElement

      const headerTop = 10
      if (scroll > headerTop && !nav.classList.contains('active')) {
        nav.classList.add('active')
      } else if (scroll <= headerTop && nav.classList.contains('active')) {
        nav.classList.remove('active')
      }
    })
  }
}) */

export const stickyScript =
  '"use strict";document.addEventListener("DOMContentLoaded",function(){if("IntersectionObserver"in window){var e=document.getElementById("nav-pointer"),t=document.querySelector("nav");new IntersectionObserver(function(s){s.forEach(function(s){s.isIntersecting?(t.classList.remove("active"),e.classList.remove("scrolled")):(t.classList.add("active"),e.classList.add("scrolled"))})}).observe(e)}else{var s=document.querySelector("nav");window.addEventListener("scroll",function(){var e=document,t=e.body,n=void 0===t?{}:t,c=e.documentElement,o=void 0===c?{}:c,i=n.scrollTop,a=void 0===i?0:i,d=o.scrollTop,r=a||(void 0===d?0:d);r>10&&!s.classList.contains("active")?s.classList.add("active"):r<=10&&s.classList.contains("active")&&s.classList.remove("active")})}});'

/* document.addEventListener('DOMContentLoaded', () => {
  requestIdle(() => {
    const searchForm = document.getElementById('header-search-form')
    const sidebarForm = document.body.querySelector('.nav-sidebar__box-search')

    const callback = (e) => {
      e.preventDefault()

      let elementInput = e.target.getElementsByTagName("input")
      elementInput = elementInput ? elementInput[0] : null

      let elementButton = e.target.getElementsByTagName("button")
      elementButton = elementButton ? elementButton[0] : null
      
      if(elementInput) {
        if (elementInput.value) {
          const newQuery = encodeURIComponent(elementInput.value).replace(
            /%20/g,
            '+'
          )
          window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}` 
        } else if(elementButton) {
          if (elementInput.classList.contains('active')) {
            elementInput.classList.remove('active')
            elementButton.classList.remove('active')
          } else {
            elementInput.classList.add('active')
            elementButton.classList.add('active')
          }
        }
      }
      
    }

    const addSubmitEvent = (element) => {
      if(element) {
        if (element.addEventListener) {
          element.addEventListener('submit', callback, false) // Modern browsers
        } else if (element.attachEvent) {
          element.attachEvent('onsubmit', callback) // Old IE
        }
      }
    }

    if(searchForm) addSubmitEvent(searchForm)
    if(sidebarForm) addSubmitEvent(sidebarForm)
    
  })
}) */

export const searchScript = `"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=document.getElementById("header-search-form"),t=document.body.querySelector(".nav-sidebar__box-search"),a=function(e){e.preventDefault();var t=e.target.getElementsByTagName("input");t=t?t[0]:null;var a=e.target.getElementsByTagName("button");if(a=a?a[0]:null,t)if(t.value){var n=encodeURIComponent(t.value).replace(/%20/g,"+");window.location.href="/buscar/"+n+"/todas/descendiente/?query="+n}else a&&(t.classList.contains("active")?(t.classList.remove("active"),a.classList.remove("active")):(t.classList.add("active"),a.classList.add("active")))},n=function(e){e&&(e.addEventListener?e.addEventListener("submit",a,!1):e.attachEvent&&e.attachEvent("onsubmit",a))};e&&n(e),t&&n(t)})});`

/* document.addEventListener('DOMContentLoaded', () => {
  requestIdle(() => {
    const subsBtn = document.body.querySelector('.nav__btn-subs')
    if (subsBtn) {
      subsBtn.addEventListener('click', () => {
        const { origin } = window.location
        const outputType = '<<_env>>' === 'prod' ? '' : 'outputType=subscriptions&'
        const pf = '<<_env>>' === 'prod' ? '' : '/pf'
        const connector = '<<_env>>' !== 'prod' ? `?_website=<<arcSite>>&` : `?`
        const link = `${origin + pf}<<urlSubsOnline>>${connector}${outputType}`
        const ref = `ref=btn-suscribete-<<arcSite>>&loc=${(typeof window !==
          'undefined' &&
          window.section) ||
          ''}`
        window.location.href = link + ref
      })
    }
  })
}) */

export const getBtnSubsScript = (
  _env,
  arcSite,
  urlSubsOnline
) => `document.addEventListener('DOMContentLoaded', function () {
  requestIdle(function(){
    var subsBtn = document.body.querySelector('.nav__btn-subs');
    if (subsBtn) {
      subsBtn.addEventListener('click', function () {
        var origin = window.location.origin;
        var outputType = '${_env}' === 'prod' ? '' : 'outputType=subscriptions&';
        var pf = '${_env}' === 'prod' ? '' : '/pf';
        var connector = '${_env}' !== 'prod' ? "?_website=${arcSite}&" : "?";
        var link = "".concat(origin + pf, "${urlSubsOnline}").concat(connector).concat(outputType);
        var ref = "ref=btn-suscribete-${arcSite}&loc=".concat(typeof window !== 'undefined' && window.section || '');
        window.location.href = link + ref;
      });
    }
  })
});`

/* document.addEventListener('DOMContentLoaded', () => {
  requestIdle(() => {
    const checkSession = () => {
      if (typeof window !== 'undefined') {
        const profileStorage =
          window.localStorage.getItem('ArcId.USER_PROFILE')
        const sesionStorage = window.localStorage.getItem('ArcId.USER_INFO')
        if (profileStorage) {
          return !(profileStorage === 'null' || sesionStorage === '{}') || false
        }
      }
      return false
    }
    const signBtn = document..body.querySelector('.nav__btn-sign')
    if (signBtn) {
      signBtn.addEventListener('click', () => {
        if (checkSession()) {
          window.location.href =
            '<<_env>>' === 'prod'
              ? '/mi-perfil/?outputType=signwall'
              : `/mi-perfil/?_website=<<arcSite>>&outputType=signwall`
        } else {
          window.location.href =
            '<<_env>>' === 'prod'
              ? '/signwall/?outputType=signwall&signwallOrganic=1'
              : `/signwall/?_website=<<arcSite>>&outputType=signwall&signwallOrganic=1`
        }
      })
    }
  })
}) */

export const getBtnSignScript = (
  _env,
  arcSite
) => `document.addEventListener('DOMContentLoaded', function () {
  requestIdle(function(){
    var checkSession = function checkSession() {
      if (typeof window !== 'undefined') {
        var profileStorage = window.localStorage.getItem('ArcId.USER_PROFILE');
        var sesionStorage = window.localStorage.getItem('ArcId.USER_INFO');
        if (profileStorage) {
          return !(profileStorage === 'null' || sesionStorage === '{}') || false;
        }
      }
      return false;
    };
    var signBtn = document.body.querySelector('.nav__btn-sign');
    if (signBtn) {
      signBtn.addEventListener('click', function () {
        if (checkSession()) {
          window.location.href = '${_env}' === 'prod' ? '/mi-perfil/?outputType=signwall' : "/mi-perfil/?_website=${arcSite}&outputType=signwall";
        } else {
          window.location.href = '${_env}' === 'prod' ? '/signwall/?outputType=signwall&signwallOrganic=1' : "/signwall/?_website=${arcSite}&outputType=signwall&signwallOrganic=1";
        }
      });
    }
  })
});`

/* document.addEventListener('DOMContentLoaded', () => {
  requestIdle(() => {
    const navWrapper = document.body.querySelector('.nav__wrapper ')
    if (window.document.body.querySelector('meta[name="section-id"]')) {
      const navLoaderWrapper = document.createElement('div')
      navLoaderWrapper.className = "nav__loader position-absolute w-full"
      const navLoader = document.createElement('div')
      navLoader.className = "nav__loader-bar  w-full h-full"
      navLoaderWrapper.append(navLoader)
      navWrapper.append(navLoaderWrapper)
    }
  })
}); */

export const navBarLoaderScript = `"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=document.body.querySelector(".nav__wrapper ");if(window.document.body.querySelector('meta[name="section-id"]')){var n=document.createElement("div");n.className="nav__loader position-absolute w-full";var t=document.createElement("div");t.className="nav__loader-bar  w-full h-full",n.append(t),e.append(n)}})});`
