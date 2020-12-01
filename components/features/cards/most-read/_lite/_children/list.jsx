import React from 'react'
import { useEditableContent } from 'fusion:content'
import CardMostReadItem from './item'
import { getAssetsPath } from '../../../../../utilities/assets'

const classes = {
  mostRead: 'most-read f f-col ',
  title: `most-read__title f`,
  link: 'most-read__link',
  logo: 'most-read__logo',
  icon: 'most-read__icon ',
}

const CardMostReadChildList = props => {
  const {
    viewImage,
    stories,
    customTitle,
    customLink,
    contextPath,
    arcSite,
  } = props
  const { editableField } = useEditableContent()

  const logoSidebar =
    arcSite === 'elcomercio'
      ? `${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/elcomercio/images/logo-sidebar.png?d=1`
      : ''

  return (
    <div role="list" className={classes.mostRead}>
      <h4 itemProp="name" className={classes.title}>
        {logoSidebar && (
          <img className={classes.logo} alt="logo" src={logoSidebar}></img>
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
          const params = { item, viewImage, arcSite }
          return <CardMostReadItem key={key} {...params} />
        })}

      {arcSite === 'depor' && (
        <>
          <button type="button" className="most-read__sm f f-center">
            <span id="mr-sm-txt">Ver más</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="7.42"
              viewBox="0 0 12 7.42">
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
