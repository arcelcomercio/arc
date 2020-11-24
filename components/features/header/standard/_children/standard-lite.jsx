import React from 'react'
import PropTypes from 'prop-types'

import getResponsiveClasses from '../../../../utilities/responsive-classes'
import { SITE_PERU21 } from '../../../../utilities/constants/sitenames'

const HeaderChildStandard = props => {
  const {
    logo,
    logoLeft,
    sections,
    deviceList,
    tags,
    date,
    arcSite,
    isSlider,
  } = props

  const { showInMobile = true } = deviceList || {}

  const sliderScript = `"use strict";requestIdle(function(){if(${!showInMobile}){if(/iPad|iPhone|iPod|android|webOS|Windows Phone/i.test(navigator.userAgent))return!1};var e=document.getElementsByClassName("header__button"),t=document.getElementsByClassName("header__featured")[0],s=function(e,t,s,i,l){var n=0,d=e,o=setInterval(function(){"left"===t?d.scrollLeft-=l:d.scrollLeft+=l,(n+=l)>=i&&window.clearInterval(o)},s)},i=function(e){if(window){var i=void 0===document.body.style["scroll-behavior"];t&&("left"===e?i?s(t,"left",25,100,20):t.scrollLeft-=100:i?s(t,"right",25,100,25):t.scrollLeft+=100)}};window&&t&&e&&t.scrollWidth>t.clientWidth&&e[1].classList.remove("disabled"),e[0].addEventListener("click",function(){i("left")}),e[1].addEventListener("click",function(){i("right")}),t.addEventListener("scroll",function(t){!function(t){window&&(0===t.target.scrollLeft?e[0].classList.add("disabled"):e[0].classList.remove("disabled"),t.target.scrollWidth-t.target.offsetWidth<=t.target.scrollLeft?e[1].classList.add("disabled"):e[1].classList.remove("disabled"))}(t)})});`

  return (
    <>
      <header className="header bg-primary w-full f f-center pos-rel">
        <a itemProp="url" href={logo.link} title={logo.alt}>
          <img
            src={logo.src}
            alt={logo.alt}
            title={logo.alt}
            className="header__logo"
          />
        </a>
        {arcSite === SITE_PERU21 && (
          <a
            itemProp="url"
            className="header__logo-secondary"
            href="/el-otorongo?ref=portada_home&amp;ft=btn_menu"
            title={logo.alt}>
            <img src={logoLeft.src} alt={logo.alt} className="w-full h-full" />
          </a>
        )}
      </header>
      <nav
        className={`${deviceList.showInDesktop &&
          'header__nav f just-between'} ${getResponsiveClasses(deviceList)}`}>
        {tags !== '' && <div className="header__tags">{tags}</div>}
        {isSlider && (
          <button
            aria-label="Deslizar temas del día a la izquierda"
            type="button"
            className="header__button left pos-rel">
            <i className="header__icon-back left" aria-hidden="true"></i>
          </button>
        )}
        {sections[0] && (
          <ul
            className={`header__featured f w-full oflow-h ${
              isSlider ? ' slider' : ''
            }`}>
            {sections.map(({ url, name, styles = [] }) => (
              <li
                className={`header__item f f-center ${
                  styles ? ' header__custom-item' : ''
                }`}
                key={url}>
                <a
                  itemProp="url"
                  className="header__link"
                  href={url}
                  {...(styles && {
                    style: {
                      backgroundColor: styles[0],
                      color: styles[1] || '#ffffff',
                    },
                  })}>
                  {name}
                </a>
              </li>
            ))}
          </ul>
        )}
        {isSlider && (
          <button
            aria-label="Deslizar temas del día a la derecha"
            type="button"
            className="header__button right pos-rel">
            <i className="header__icon-back right" aria-hidden="true"></i>
          </button>
        )}
        {date.active && (
          <div className="header__date just-center">{date.value}</div>
        )}
      </nav>
      {isSlider && (
        <script dangerouslySetInnerHTML={{ __html: sliderScript }}></script>
      )}
    </>
  )
}

HeaderChildStandard.propTypes = {
  logo: PropTypes.shape({
    src: PropTypes.string,
    link: PropTypes.string,
    alt: PropTypes.string,
  }),
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
    })
  ),
}

export default HeaderChildStandard
