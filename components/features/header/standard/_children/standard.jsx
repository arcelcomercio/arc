import React from 'react'
import PropTypes from 'prop-types'

import { getResponsiveClasses } from '../../../../utilities/helpers'
import ConfigParams from '../../../../utilities/config-params'

const classes = {
  header: `header bg-primary primary-font w-full font-bold flex items-center justify-center pt-0 pb-0 pl-15 pr-15 text-sm text-gray-300 hidden lg:flex position-relative`,
  logo: 'header__logo',
  logoLeft: 'header__logo-secondary',
  logoImage: 'w-full h-full object-cover',
  featured: 'header__featured flex w-full font-normal overflow-hidden mr-20',
  item: 'header__item flex items-center justify-center h-inherit',
  link: 'header__link uppercase text-sm p-10',
  navWrapper:
    'nav__wrapper hidden md:flex justify-between header__wrapper--dashed',
  tags: 'header__tags justify-center mr-20 hidden md:flex',
  date: 'header__date justify-center uppercase ml-5 hidden lg:flex',
}

const sliderScript =
  '"use strict";setTimeout(function(){var t=document.getElementsByClassName("header__button"),e=document.getElementsByClassName("header__featured")[0],l=function(t,e,l,s,i){var d=0,n=t,o=setInterval(function(){"left"===e?n.scrollLeft-=i:n.scrollLeft+=i,(d+=i)>=s&&window.clearInterval(o)},l)},s=function(t){if(window){var s=void 0===document.body.style["scroll-behavior"];e&&("left"===t?s?l(e,"left",25,100,20):e.scrollLeft-=100:s?l(e,"right",25,100,25):e.scrollLeft+=100)}};window&&e&&t&&e.scrollWidth>e.clientWidth&&t[1].classList.remove("disabled"),t[0].addEventListener("click",function(){s("left")}),t[1].addEventListener("click",function(){s("right")}),e.addEventListener("scroll",function(e){!function(e){window&&(0===e.target.scrollLeft?t[0].classList.add("disabled"):t[0].classList.remove("disabled"),e.target.scrollWidth-e.target.offsetWidth<=e.target.scrollLeft?t[1].classList.add("disabled"):t[1].classList.remove("disabled"))}(e)})},0);'

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

  return (
    <>
      <header
        className={`${classes.header} ${getResponsiveClasses(deviceList)}`}>
        <a href={logo.link}>
          <img src={logo.src} alt={logo.alt} className={classes.logo} />
        </a>
        {arcSite === ConfigParams.SITE_PERU21 && (
          <a
            className={classes.logoLeft}
            href="/el-otorongo?ref=portada_home&amp;ft=btn_menu">
            <img
              src={logoLeft.src}
              alt={logo.alt}
              className={classes.logoImage}
            />
          </a>
        )}
      </header>
      <nav
        className={`${deviceList.showInDesktop &&
          classes.navWrapper} ${getResponsiveClasses(deviceList)}`}>
        {tags !== '' && <div className={classes.tags}>{tags}</div>}
        {isSlider && (
          <button
            type="button"
            className="header__button left disabled position-relative">
            <i className="header__icon-back left icon-back text-white rounded font-bold p-5"></i>
          </button>
        )}
        {sections[0] && (
          <ul className={`${classes.featured}${isSlider ? ' slider' : ''}`}>
            {sections.map(({ url, name, styles = [] }) => (
              <li
                className={`${classes.item}${
                  styles ? ' header__custom-item' : ''
                }`}
                key={url}>
                <a
                  className={classes.link}
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
            type="button"
            className="header__button right disabled position-relative">
            <i className="header__icon-back right icon-back text-white rounded font-bold p-5"></i>
          </button>
        )}
        {date.active && <div className={classes.date}>{date.value}</div>}
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
