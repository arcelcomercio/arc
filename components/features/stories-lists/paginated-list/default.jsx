import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import React, { Fragment } from 'react'

import Ads from '../../../global-components/ads'
import Pagination from '../../../global-components/pagination'
import StoryItem from '../../../global-components/story-item'
import {
  SITE_DEPOR,
  SITE_GESTION,
  SITE_TROME,
} from '../../../utilities/constants/sitenames'
import { customFields } from '../_dependencies/custom-fields'
import StructuredData from './_children/structured-data'

const classes = {
  adsBox: 'flex items-center flex-col no-desktop pb-20',
  adsAfsBox: 'pb-20',
  contentTitle: 'story-item__wrapper-title',
}

const StoriesListPaginatedList = (props) => {
  const hasAds = (index, adsList) => adsList.filter((el) => el.pos === index)

  const {
    globalContent: contextGlobalContent,
    globalContentConfig: contextGlobalContentConfig,
    deployment,
    contextPath,
    arcSite,
    requestUri,
    isAdmin,
  } = useFusionContext()
  const { customFields: customFieldsProps = {} } = props
  const {
    customFields: { showTitle },
  } = props
  const { isDfp = false } = getProperties(arcSite)
  const isSearchSection = /^\/buscar\//.test(requestUri)

  const { isComponent, customGlobalContentConfig, customGlobalContent } = props
  const globalContent = isComponent ? customGlobalContent : contextGlobalContent
  const globalContentConfig = isComponent
    ? customGlobalContentConfig
    : contextGlobalContentConfig

  let {
    content_elements: stories = [],
    count = 0,
    author: { url: authorPath = '' } = {},
  } = globalContent || {}

  const { author: { firstName } = {} } = globalContent || {}
  const {
    author = {},
    slug: slugAuthor = '',
    from: fromAuthor = 1,
    size: sizeAuthor = 30,
  } = globalContent || {}
  let { query: { size = 0, from = 1 } = {} } = globalContentConfig || {}

  if (stories.length === 0) {
    if (author._id) {
      ; ({ bio_page: authorPath } = author)
      const storiesAuthor = useContent({
        source: 'story-feed-by-author',
        query: {
          name: slugAuthor,
          from: fromAuthor,
          size: sizeAuthor,
          website: arcSite,
        },
      })

      if (
        typeof storiesAuthor !== 'undefined' &&
        typeof storiesAuthor.content_elements === 'object' &&
        storiesAuthor.content_elements.length > 0
      ) {
        ; ({ content_elements: stories, count } = storiesAuthor)
        size = sizeAuthor
        from = fromAuthor
      }
    }
  }

  const activeAds = Object.keys(customFieldsProps)
    .filter((prop) => prop.match(/adsMobile(\d)/))
    .filter((key) => customFieldsProps[key] === true)
  const typeSpace = isDfp ? 'caja' : 'movil'

  const activeAdsArray = activeAds.map((el) => ({
    name: `${typeSpace}${el.slice(-1)}`,
    pos: customFieldsProps[`adsMobilePosition${el.slice(-1)}`] || 0,
    inserted: false,
  }))

  return (
    <>
      <div>
        {arcSite === SITE_TROME && showTitle && (
          <div className={classes.contentTitle}>
            {firstName && <p>LAS NOTICIAS DE {firstName}</p>}
          </div>
        )}
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
              {(arcSite === SITE_DEPOR || arcSite === SITE_GESTION) &&
                isSearchSection &&
                index === 2 && (
                  <div className={classes.adsAfsBox}>
                    <div id="afs_container_1" />
                  </div>
                )}
            </Fragment>
          )
        })}
      </div>
      {(arcSite === SITE_DEPOR || arcSite === SITE_GESTION) &&
        isSearchSection &&
        stories.length < 3 && <div id="afs_container_1" />}
      {count !== 0 && (
        <Pagination
          arcSite={arcSite}
          totalElements={count}
          storiesQty={size}
          currentPage={from}
          requestUri={requestUri}
        />
      )}
      {customFieldsProps.structuredData && stories.length > 0 && (
        <StructuredData
          authorPath={authorPath}
          stories={stories}
          arcSite={arcSite}
        />
      )}
    </>
  )
}

StoriesListPaginatedList.propTypes = {
  customFields,
}

StoriesListPaginatedList.label = 'Listado con paginación'
StoriesListPaginatedList.static = true

export default StoriesListPaginatedList
