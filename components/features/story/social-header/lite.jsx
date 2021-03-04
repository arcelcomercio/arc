import * as React from 'react'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import { getAssetsPath } from '../../../utilities/assets'

import DynamicShareButtons from '../../../global-components/lite/dynamic-share'
import NextStoryButton from '../next-story-button/lite'

// import { SITE_ELCOMERCIOMAG } from '../../../utilities/constants/sitenames'

const classes = {
  wrapper: 'wrap-sh',
  container: 'sh',
  shareContainer: 'sh__wrap-share',
  buttonClass: 'sh__next-story-button',
  logoClass: 'sh__logo',
  logoUrl: 'header__logo',
  arrowClass: 'sh__next-story-button__arrow',
  logo: 'header__logo',
}

const StorySocialHeader = () => {
  const { arcSite, contextPath } = useAppContext()

  const {
    assets: { header },
  } = getProperties(arcSite)

  const logoUrl = `${getAssetsPath(
    arcSite,
    contextPath
  )}/resources/dist/${arcSite}/images/${header.inverted}?d=1`

  /*
document.addEventListener('DOMContentLoaded', () => {
  if ('IntersectionObserver' in window) {
    const navPointer = document.getElementById('nav-pointer')
    const nav = document.querySelector('.wrap-sh')
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
    const nav = document.querySelector('.wrap-sh')
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
})  
  */

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.shareContainer}>
            <DynamicShareButtons />
          </div>
          <a itemProp="url" href="/" title="" className={classes.logoClass}>
            <img src={logoUrl} alt="" className={classes.logoUrl} />
          </a>
          <NextStoryButton
            buttonClass={classes.buttonClass}
            arrowClass={classes.arrowClass}
            source="header"
          />
        </div>
      </div>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html:
            '"use strict";document.addEventListener("DOMContentLoaded",function(){if("IntersectionObserver"in window){var e=document.getElementById("nav-pointer"),t=document.querySelector(".wrap-sh");new IntersectionObserver(function(s){s.forEach(function(s){s.isIntersecting?(t.classList.remove("active"),e.classList.remove("scrolled")):(t.classList.add("active"),e.classList.add("scrolled"))})}).observe(e)}else{var s=document.querySelector(".wrap-sh");window.addEventListener("scroll",function(){var e=document,t=e.body,c=void 0===t?{}:t,n=e.documentElement,o=void 0===n?{}:n,i=c.scrollTop,r=void 0===i?0:i,a=o.scrollTop,d=r||(void 0===a?0:a);d>10&&!s.classList.contains("active")?s.classList.add("active"):d<=10&&s.classList.contains("active")&&s.classList.remove("active")})}});',
        }}
      />
    </>
  )
}

StorySocialHeader.label = 'Header - redes sociales'
StorySocialHeader.static = true

export default StorySocialHeader
