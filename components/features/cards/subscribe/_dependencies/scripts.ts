// Script sin transpilación con babel ni minificar
// "Hola, soy un script sin transpilación con babel ni minificar"

// Script transpilado usando babel y minificado

/*
document.addEventListener('DOMContentLoaded', () => {
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
        signwallButton.innerHTML =
          buttonText.length >= 15 ? `${buttonText.slice(0, 15)}...` : buttonText
        signwallIcon.innerHTML = iconText
        signwallIcon.className = 'uppercase'
      }
    }
  })
})
*/
/* export const singwallScript =
  '"use strict";document.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE"))||{},n=e.firstName,t=void 0===n?"":n,i=e.lastName,o=void 0===i?"":i,s=e.uuid,a=void 0===s?"":s,n=document.getElementById("signwall-nav-btn");n&&n.addEventListener("click",function(){window.location.href=a?"/mi-perfil/?outputType=subscriptions":"/signwall/?outputType=subscriptions"}),a&&(i=document.getElementById("signwall-nav-user"),e=document.getElementById("signwall-nav-icon"),t||o?(n=s="",t&&o?(s=t+" "+o,n=""+(t[0]||"")+(o[0]||"")):t&&!o?n=""+((s=t)[0]||"")+(t[1]||""):!t&&o&&(n=""+((s=o)[0]||"")+(o[1]||"")),i.innerHTML=15<=s.length?s.slice(0,15)+"...":s,e.innerHTML=n,e.className="uppercase"):i.innerHTML="Bienvenido Usuario")})});'
*/

export const handleUserStatus = (): string => ``
