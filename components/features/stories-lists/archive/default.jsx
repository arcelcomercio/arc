import React, { Fragment } from 'react'
// El fragment se usa para poder agregar "key"
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import { customFields } from '../_dependencies/custom-fields'
import StoryItem from '../../../global-components/story-item'
import RenderPagination from '../../../global-components/pagination-by-date'
import Ads from '../../../global-components/ads'
import { getActualDate } from '../../../utilities/helpers'

const classes = {
  adsBox: 'flex items-center flex-col no-desktop pb-20',
}

const StoriesListArchive = props => {
  const hasAds = (index, adsList) => adsList.filter(el => el.pos === index)

  const { customFields: customFieldsProps = {} } = props
  const {
    globalContent,
    deployment,
    contextPath,
    arcSite,
    isAdmin,
    metaValue,
  } = useFusionContext()
  const { isDfp = false } = getProperties(arcSite)
  const { content_elements: contentElements, params: { section, date } = {} } =
    globalContent || {}
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

  return (
    <>
      <div>
        {stories.map((story, index) => {
          const ads = hasAds(index + 1, activeAdsArray)
          return (
            <Fragment key={`Archivo-${story._id}`}>
              <StoryItem
                data={story}
                {...{ deployment, contextPath, arcSite, isAdmin }}
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
      <RenderPagination section={section} date={date || getActualDate()} />
    </>
  )
}

StoriesListArchive.propTypes = {
  customFields,
}

StoriesListArchive.label = 'Listado de Archivo'
StoriesListArchive.static = true

export default StoriesListArchive
