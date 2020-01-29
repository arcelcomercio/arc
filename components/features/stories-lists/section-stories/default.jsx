import React, { Fragment } from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import customFields from './_dependencies/custom-fields'
import StoryItem from '../../../global-components/story-item'
import Ads from '../../../global-components/ads'

const classes = {
  listado: 'w-full',
  listadoSeeMore: 'flex justify-center mt-20 uppercase',
  adsBox: 'flex items-center flex-col no-desktop pb-20',
}

const StoriesListSectionStories = props => {
  const hasAds = (index, adsList) => adsList.filter(el => el.pos === index)

  const { customFields: customFieldsProps = {} } = props
  const {
    globalContent,
    deployment,
    contextPath,
    arcSite,
    globalContentConfig,
    isAdmin,
    // metaValue,
  } = useFusionContext()
  const { isDfp = false } = getProperties(arcSite)
  const { storiesQty = 50, initialStory = 0 } = customFieldsProps
  const { query: { section = '' } = {} } = globalContentConfig || {}
  const { content_elements: contentElements } = globalContent || {}
  const stories = contentElements || []

  const activeAds = Object.keys(customFieldsProps)
    .filter(prop => prop.match(/adsMobile(\d)/))
    .filter(key => customFieldsProps[key] === true)

  const typeSpace = isDfp ? 'caja' : 'movil'

  const activeAdsArray = activeAds.map(el => {
    return {
      name: `${typeSpace}${el.slice(-1)}`,
      pos: customFieldsProps[`adsMobilePosition${el.slice(-1)}`] || 0,
      inserted: false,
    }
  })

  // Archivo sólo está disponible para secciones principales, no subsecciones.
  const seeMorePath = `/archivo/${section.split('/')[1]}/`

  return (
    <div className={classes.listado}>
      <div>
        {stories &&
          stories
            .slice(initialStory, initialStory + storiesQty)
            .map((story, index) => {
              const ads = hasAds(index + 1, activeAdsArray)
              return (
                <Fragment key={`Section-storie-${story._id}`}>
                  <StoryItem
                    data={story}
                    {...{ deployment, contextPath, arcSite, isAdmin }}
                    formato="row"
                  />
                  {ads.length > 0 && (
                    <div className={classes.adsBox}>
                      <Ads
                        adElement={ads[0].name}
                        isDesktop={false}
                        isMobile
                        isDfp={isDfp}
                      />
                    </div>
                  )}
                </Fragment>
              )
            })}
      </div>
      <div className={classes.listadoSeeMore}>
        <a href={seeMorePath} tabIndex="0" role="button">
          Ver más
        </a>
      </div>
    </div>
  )
}

StoriesListSectionStories.propTypes = {
  customFields,
}

StoriesListSectionStories.label = 'Listado de Sección'
StoriesListSectionStories.static = true

export default StoriesListSectionStories
