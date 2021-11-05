import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'
import * as React from 'react'

import Ads from '../../../global-components/ads'
import Pagination from '../../../global-components/pagination'
import StorySimple from '../../../global-components/story-simple'
import { SITE_DEPOR } from '../../../utilities/constants/sitenames'
import { customFields } from '../_dependencies/custom-fields'
import StructuredData from './_children/structured-data'

const classes = {
  adsBox: 'flex items-center flex-col no-desktop pb-20',
  storySimpleHeader: 'story-simple__header',
}

const StoriesListPaginatedList = (props) => {
  const hasAds = (index, adsList) => adsList.filter((el) => el.pos === index)

  const {
    globalContent,
    globalContentConfig,
    deployment,
    contextPath,
    arcSite,
    requestUri,
  } = useFusionContext()
  const { customFields: customFieldsProps = {} } = props
  const { isDfp = false } = getProperties(arcSite)
  const isSearchSection = /^\/buscar\//.test(requestUri)

  let {
    content_elements: stories = [],
    count = 0,
    author: { url: authorPath = '' } = {},
  } = globalContent || {}
  const {
    author = {},
    slug: slugAuthor = '',
    from: fromAuthor = 1,
    size: sizeAuthor = 30,
  } = globalContent || {}
  let { query: { size = 0, from = 1 } = {} } = globalContentConfig || {}

  if (stories.length === 0) {
    if (author._id) {
      ;({ bio_page: authorPath } = author)
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
        ;({ content_elements: stories, count } = storiesAuthor)
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
      <div className="pl-20 pr-20">
        {author && (
          <div className={classes.storySimpleHeader}>
            <svg fill="none" viewBox="0 0 53 54">
              <defs />
              <g clipPath="url(#clip0)">
                <path
                  fill="#000"
                  d="M26.5 54c14.498 0 26.25-12.088 26.25-27S40.998 0 26.5 0C12.003 0 .25 12.088.25 27S12.003 54 26.5 54z"
                />
                <path
                  fill="#fff"
                  d="M38.28 22.06H26.9v13.82c.06 1.823.401 2.588 2.23 2.588 2.574 0 2.46-1.884 2.574-4l.056-1.645h7.835v2.765c0 8.41-3.031 10.294-11.036 10.294-6.29 0-11.494-.825-11.494-8.588V22.059h-3.66v-7.411h3.66V8.12h9.836v6.53h11.38v7.408z"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <path
                    fill="#fff"
                    d="M0 0h52.5v54H0z"
                    transform="translate(.25)"
                  />
                </clipPath>
              </defs>
            </svg>
            <h2>Las noticias de {author.firstName}</h2>
          </div>
        )}
        {stories.map((story, index) => {
          const ads = hasAds(index + 1, activeAdsArray)
          return (
            <React.Fragment key={`Paginated-list-${story._id}`}>
              <StorySimple
                data={story}
                {...{ deployment, contextPath, arcSite }}
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
            </React.Fragment>
          )
        })}
      </div>

      {arcSite === SITE_DEPOR && isSearchSection && <div id="afscontainer1" />}
      {count !== 0 && (
        <Pagination
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

StoriesListPaginatedList.label = 'Listado con paginación simple'
StoriesListPaginatedList.static = true

export default StoriesListPaginatedList
