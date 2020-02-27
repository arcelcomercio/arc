import './scss/main.scss'
import './images/favicon.png'
import './images/apple-touch-icon.png'
import './images/apple-touch-icon-76x76.png'
import './images/apple-touch-icon-120x120.png'
import './images/apple-touch-icon-144x144.png'
import './images/apple-touch-icon-152x152.png'
import './images/apple-touch-icon-180x180.png'
import './images/logo.png'
import './images/logo_twitter.jpg'
import './images/logo-story-default.jpg'
import './images/aniversario.svg'
import './images/white-logo.png'
import './images/white-logo.svg'
import './images/default-blog.jpg'
import './images/default-sm.png'
import './images/default-md.png'
import './images/default-lg.png'
import './images/premium-logo.png'
import './images/author.png'
import './images/authorOpinion.png'
import './images/logo-amp.png'
import './images/logo-elcomercio-388x60.png'
import './images/arrow-right-2.png'
import './images/logo_fb.jpg'

import './images/bbc_head_fg.jpg'
import './images/bbc_head.png'
import './images/logo-elcomercio.jpg'
import './images/signwall/paywall_bg.png'
import './images/signwall/paywall_bg.webp'
import './images/signwall/logo_elcomercio.png'
import './images/signwall/bg_login.png'
import './images/signwall/bg_login.webp'

/** Fonts & icons */
import './icons/fonts/default.woff'
import './icons/fonts/comercio.woff'
import './icons/fonts/default.svg'
import './icons/fonts/comercio.svg'

import './fonts/LibreFranklin/libre-franklin-v4-latin-500.woff'
import './fonts/LibreFranklin/libre-franklin-v4-latin-700.woff'
import './fonts/NotoSerifSC/noto-serif-sc-v6-latin-500.woff'
import './fonts/NotoSerifSC/noto-serif-sc-v6-latin-700.woff'

// Imagenes paywall
require.context('./images/paywall', true, /\.(png|webp|jpg|jpeg|gif|svg)$/)

// story/social - actions
const $shareButtons = document.querySelectorAll('a[data-share]')
if ($shareButtons && $shareButtons.length > 0) {
  const w = 600
  const h = 400
  const windowLeft = window.screen.width / 2 - w / 2
  const windowTop = window.screen.height / 2 - h / 2
  $shareButtons.forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault()
      window.open(
        button.getAttribute('href'),
        '',
        `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${windowTop}, left=${windowLeft}`
      )
    })
  })
}
