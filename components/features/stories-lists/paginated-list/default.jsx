import React, { Fragment } from 'react'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import { useContent } from 'fusion:content'

import { customFields } from '../_dependencies/custom-fields'
import StoryItem from '../../../global-components/story-item'
import Pagination from '../../../global-components/pagination'
import Ads from '../../../global-components/ads'
import StructuredData from './_children/structured-data'

const classes = {
  adsBox: 'flex items-center flex-col no-desktop pb-20',
}

const StoriesListPaginatedList = props => {
  const hasAds = (index, adsList) => adsList.filter(el => el.pos === index)

  const {
    globalContent,
    globalContentConfig,
    deployment,
    contextPath,
    arcSite,
    requestUri,
    isAdmin,
  } = useFusionContext()
  const { customFields: customFieldsProps = {} } = props
  const { isDfp = false } = getProperties(arcSite)

  let { content_elements: stories = [], count = 0, author: { url: authorPath = '' } = {} } = globalContent || {}
  const { author = {}, slug: slugAuthor = '', from: fromAuthor = 1, size:sizeAuthor = 30 } = globalContent || {}
  let { query: { size = 0, from = 1 } = {} } = globalContentConfig || {}

  if(stories.length === 0){
    if(author._id){
      ({bio_page: authorPath} = author)
      const storiesAuhor =
        useContent({
          source: 'story-feed-by-author',
          query: {
            name: slugAuthor,
            from: fromAuthor, 
            size: sizeAuthor, 
            website: arcSite
          },
        })

      if(storiesAuhor.content_elements.length > 0){
        ({content_elements: stories, count} = storiesAuhor)
        size = sizeAuthor
        from = fromAuthor
      }
    }
  }

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
            <Fragment key={`Paginated-list-${story._id}`}>
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
      {count !== 0 && (
        <Pagination
          totalElements={count}
          storiesQty={size}
          currentPage={from}
          requestUri={requestUri}
        />
      )}
      { (customFieldsProps.structuredData && stories.length > 0) &&
        <StructuredData authorPath={authorPath} stories={stories} arcSite={arcSite} />
      }
    </>
  )
}

StoriesListPaginatedList.propTypes = {
  customFields,
}

StoriesListPaginatedList.label = 'Listado con paginación'
StoriesListPaginatedList.static = true

export default StoriesListPaginatedList
