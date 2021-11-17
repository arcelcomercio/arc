import * as React from 'react'
import { FC } from 'types/features'
import { ArcSite } from 'types/fusion'
import { ListDataStories } from 'types/story'

import { getAssetsPath } from '../../../../../../utilities/assets'
import CardMostReadChildrenItem from './item'

const classes = {
  mostRead: 'most-read f f-col ',
  title: `most-read__title f`,
  link: 'most-read__link',
  logo: 'most-read__logo',
  icon: 'most-read__icon ',
}

interface FeatureProps {
  arcSite?: ArcSite
  deployment?: string
  contextPath?: string
  viewImage?: boolean
  stories?: ListDataStories[]
  customTitle?: string
  customLink?: string
}
const CardMostReadChildrenList: FC<FeatureProps> = (props) => {
  const {
    viewImage = false,
    stories = [],
    customTitle,
    customLink,
    contextPath = '',
    arcSite = 'elcomercio',
  } = props

  const [active, setActive] = React.useState(false)

  const logoSidebar =
    arcSite === 'elcomercio'
      ? `${getAssetsPath(
          arcSite,
          contextPath
        )}/resources/dist/elcomercio/images/logo-sidebar.png?d=1`
      : ''

  return (
    <div
      role="list"
      className={`${classes.mostRead} ${active ? 'active' : ''}`}>
      <h4 itemProp="name" className={classes.title}>
        {logoSidebar && (
          <img className={classes.logo} alt="logo" src={logoSidebar} />
        )}

        <span>
          <a
            itemProp="url"
            className={classes.link}
            href={customLink || '/archivo'}>
            {customTitle || 'Lo más visto'}
          </a>
        </span>
        <i className={classes.icon} />
      </h4>

      {stories.map((item) => {
        const imageUrl = item?.imageUrl || ''
        const websiteUrl = item?.websiteUrl || ''
        const title = item?.title || ''
        const storyType = item?.storyType || ''

        return (
          <CardMostReadChildrenItem
            viewImage={viewImage}
            imageUrl={imageUrl}
            websiteUrl={websiteUrl}
            title={title}
            storyType={storyType}
            arcSite={arcSite}
          />
        )
      })}

      {arcSite === 'depor' && (
        <>
          <button
            type="button"
            className="most-read__sm f f-center"
            onClick={() => {
              setActive(!active)
            }}>
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
          {/* <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html:
                '"use strict";document.addEventListener("DOMContentLoaded",function(){var e=document.querySelector(".most-read__sm"),t=document.querySelector(".most-read"),n=document.getElementById("mr-sm-txt");e&&t&&n&&e.addEventListener("click",function(){t.classList.toggle("active"),"Ver menos"===n.textContent?n.textContent="Ver más":n.textContent="Ver menos"})});',
            }}
          /> */}
        </>
      )}
    </div>
  )
}

export default CardMostReadChildrenList
