import React from 'react'
import { useEditableContent } from 'fusion:content'
import CardMostReadItem from './item'
import { getAssetsPath } from '../../../../../utilities/assets'
import {
  SITE_ELCOMERCIO,
  SITE_TROME,
} from '../../../../../utilities/constants/sitenames'

const classes = {
  mostRead: 'most-read f f-col ',
  title: `most-read__title f`,
  link: 'most-read__link',
  logo: 'most-read__logo',
  icon: 'most-read__icon ',
}

const CardMostReadChildList = (props) => {
  const {
    viewImage,
    stories,
    customTitle,
    customLink,
    contextPath,
    arcSite,
    metaValue,
  } = props
  const { editableField } = useEditableContent()

  let logoSidebar = ''
  if (arcSite === SITE_ELCOMERCIO) {
    logoSidebar = `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/elcomercio/images/logo-sidebar.png?d=1`
  } else if (arcSite === SITE_TROME) {
    logoSidebar = `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/trome/images/logo_twitter.jpg`
  }

  return (
    <div role="list" className={classes.mostRead}>
      <h4 itemProp="name" className={classes.title}>
        {logoSidebar && metaValue('section_style') !== 'story-v2-standard' && (
          <img className={classes.logo} alt="logo" src={logoSidebar}></img>
        )}
        {metaValue('section_style') === 'story-v2-standard' && (
          <svg className={classes.logo} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0V0ZM8 1.6C6.30261 1.6 4.67475 2.27428 3.47452 3.47452C2.27428 4.67475 1.6 6.30261 1.6 8C1.6 9.69739 2.27428 11.3253 3.47452 12.5255C4.67475 13.7257 6.30261 14.4 8 14.4C9.69739 14.4 11.3253 13.7257 12.5255 12.5255C13.7257 11.3253 14.4 9.69739 14.4 8C14.4 6.30261 13.7257 4.67475 12.5255 3.47452C11.3253 2.27428 9.69739 1.6 8 1.6V1.6ZM7.2 4C7.38724 3.99994 7.56857 4.06555 7.71241 4.18542C7.85626 4.30529 7.9535 4.47182 7.9872 4.656L8 4.8V8H10.4C10.5999 7.99963 10.7927 8.07413 10.9405 8.20881C11.0882 8.3435 11.1801 8.52862 11.1982 8.72771C11.2163 8.92681 11.1591 9.12546 11.038 9.28453C10.917 9.44361 10.7407 9.55158 10.544 9.5872L10.4 9.6H7.2C7.01276 9.60006 6.83143 9.53445 6.68759 9.41458C6.54374 9.29471 6.4465 9.12818 6.4128 8.944L6.4 8.8V4.8C6.4 4.58783 6.48429 4.38434 6.63431 4.23431C6.78434 4.08429 6.98783 4 7.2 4V4Z" fill="black"/>
          </svg>
        )}

        <span {...editableField('customTitle')}>
          <a
            itemProp="url"
            className={classes.link}
            href={customLink || '/archivo'}>
            {customTitle || 'Lo más visto'}
          </a>
        </span>
        <i className={classes.icon} />
      </h4>

      {stories &&
        stories.map((item, i) => {
          const key = `most-read-${i}-${item.id}`
          const params = { item, viewImage, arcSite, metaValue }
          return <CardMostReadItem key={key} {...params} />
        })}

      {arcSite === 'depor' && (
        <>
          <button type="button" className="most-read__sm f f-center">
            <span id="mr-sm-txt">Ver más</span>

            <svg width="12" height="7.42" viewBox="0 0 12 7.42">
              <path
                d="M1.41.58,6,5.17,10.59.58,12,2,6,8,0,2Z"
                transform="translate(0 -0.58)"
              />
            </svg>
          </button>
          {/* document.addEventListener("DOMContentLoaded", function() {
                const showMoreBtn = document.querySelector(".most-read__sm")
                const showMoreContainer = document.querySelector(".most-read")
                const showMoreTxt = document.getElementById("mr-sm-txt")
                if (showMoreBtn && showMoreContainer && showMoreTxt) {
                  showMoreBtn.addEventListener("click", () => {
                    showMoreContainer.classList.toggle("active")
                    if (showMoreTxt.textContent === "Ver menos") {
                      showMoreTxt.textContent = "Ver más"
                    } else {
                      showMoreTxt.textContent = "Ver menos"
                    }
                  })
                }
              }); */}
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html:
                '"use strict";document.addEventListener("DOMContentLoaded",function(){var e=document.querySelector(".most-read__sm"),t=document.querySelector(".most-read"),n=document.getElementById("mr-sm-txt");e&&t&&n&&e.addEventListener("click",function(){t.classList.toggle("active"),"Ver menos"===n.textContent?n.textContent="Ver más":n.textContent="Ver menos"})});',
            }}
          />
        </>
      )}
    </div>
  )
}

export default CardMostReadChildList
