/* eslint-disable no-template-curly-in-string */

import { ArcSite } from 'types/fusion'

/* requestIdle(() => {
		const btn = document.querySelector(".nav-d__menu-b")
		const menu = document.querySelector(".nav-d__menu")
		
		btn.addEventListener("click", () => {
				menu.classList.toggle("active")
				document.body.classList.toggle("oflow-h")
		})
	}) */
export const menuScript =
  '"use strict";requestIdle(()=>{const e=document.querySelector(".nav-d__menu-b"),t=document.querySelector(".nav-d__menu");e.addEventListener("click",()=>{t.classList.toggle("active"),document.body.classList.toggle("oflow-h")})});'

/* requestIdle(() => {
	const formNode = document.getElementById("nav-d__form-search")
	const inputNode = document.querySelector(".nav-d__search-i")

	formNode.addEventListener("submit", (event) => {
		if(inputNode.classList.contains("active") && inputNode.value) {
      const newQuery = encodeURIComponent(inputNode.value).replace(/%20/g, '+')
      window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}`
		}
		inputNode.classList.toggle("active")

		event.preventDefault()
	});
}) */
export const searchScript =
  '"use strict";requestIdle(()=>{const e=document.getElementById("nav-d__form-search"),t=document.querySelector(".nav-d__search-i");e.addEventListener("submit",e=>{if(t.classList.contains("active")&&t.value){const e=encodeURIComponent(t.value).replace(/%20/g,"+");window.location.href=`/buscar/${e}/todas/descendiente/?query=${e}`}t.classList.toggle("active"),e.preventDefault()})});'

/* requestIdle(() => {
	const formNode = document.querySelector(".nav-d__menu-f")
	const inputNode = document.querySelector(".nav-d__menu-i")

	formNode.addEventListener("submit", (event) => {
		const newQuery = encodeURIComponent(inputNode.value).replace(/%20/g, '+')
    window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}`
		event.preventDefault()
	});
}) */
export const menuSearchScript =
  '"use strict";requestIdle(()=>{const e=document.querySelector(".nav-d__menu-f"),n=document.querySelector(".nav-d__menu-i");e.addEventListener("submit",e=>{const t=encodeURIComponent(n.value).replace(/%20/g,"+");window.location.href=`/buscar/${t}/todas/descendiente/?query=${t}`,e.preventDefault()})});'

// Script para el boton de sigwall, extraido del feature header/inverted
/*
const arcSite = '<<arcSite>>'
const arcEnv = '<<arcEnv>>'

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
      .querySelector('.nav-d__sign')
      .addEventListener('click', () => {
        if (uuid) {
          Taggeo('web_swg_link_ingresaperfil')
          window.location.href =
            arcEnv === 'prod'
              ? '/mi-perfil/?outputType=subscriptions'
              : `/mi-perfil/?_website=${arcSite}&outputType=subscriptions`
        } else {
          Taggeo('web_swg_link_ingresacuenta')
          window.location.href =
            arcEnv === 'prod'
              ? '/signwall/?outputType=subscriptions&signwallOrganic=1'
              : `/signwall/?_website=${arcSite}&outputType=subscriptions&signwallOrganic=1`
        }
      })
    if (uuid) {
			document.querySelector('.nav-d__sign').classList.add('signed')
			document.querySelector('.nav-d__sign-t').innerText = 'Mi perfil'
    }
  })
}) */
export const signwallScript = (arcSite: ArcSite, arcEnv: string) =>
  '"use strict";const arcSite="<<arcSite>>",arcEnv="<<arcEnv>>";document.addEventListener("DOMContentLoaded",function(){const e=e=>{window.dataLayer=window.dataLayer||[];const n={event:"tag_signwall",eventCategory:"Web_Sign_Wall_General",eventAction:e};window.dataLayer.push(n)};window.requestIdle(()=>{const n=JSON.parse(window.localStorage.getItem("ArcId.USER_PROFILE")),{firstName:t="",lastName:i="",uuid:a=""}=n||{};document.querySelector(".nav-d__sign").addEventListener("click",()=>{a?(e("web_swg_link_ingresaperfil"),window.location.href=`/mi-perfil/?_website=${arcSite}&outputType=subscriptions`):(e("web_swg_link_ingresacuenta"),window.location.href=`/signwall/?_website=${arcSite}&outputType=subscriptions&signwallOrganic=1`)}),a&&(document.querySelector(".nav-d__sign").classList.add("signed"),document.querySelector(".nav-d__sign-t").innerText="Mi perfil")})});'
    .replace(/<<arcSite>>/g, arcSite)
    .replace(/<<arcEnv>>/g, arcEnv)
