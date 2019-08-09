import React, { PureComponent, Fragment } from 'react'
import Consumer from 'fusion:consumer'

import { customFields } from '../_dependencies/custom-fields'
import StoryItem from '../../../global-components/story-item'
import Pagination from '../../../global-components/pagination'
import Ads from '../../../global-components/ads'

const classes = {
  adsBox: 'flex items-center flex-col no-desktop pb-20',
}

@Consumer
class StoriesListPaginatedList extends PureComponent {
  hasAds = (index, adsList) => adsList.filter(el => el.pos === index)

  render() {
    const {
      globalContent,
      globalContentConfig,
      deployment,
      contextPath,
      arcSite,
      requestUri,
      isAdmin,
      customFields: customFieldsProps = {},
    } = this.props
    const { content_elements: stories = [], count = 0 } = globalContent || {}
    const { query: { size = 0, from = 1 } = {} } = globalContentConfig || {}

    const activeAds = Object.keys(customFieldsProps)
      .filter(prop => prop.match(/adsMobile(\d)/))
      .filter(key => customFieldsProps[key] === true)

    const activeAdsArray = activeAds.map(el => {
      return {
        name: `movil${el.slice(-1)}`,
        pos: customFieldsProps[`adsMobilePosition${el.slice(-1)}`] || 0,
        inserted: false,
      }
    })

    return (
      <>
        <div>
          {stories.map((story, index) => {
            const ads = this.hasAds(index + 1, activeAdsArray)
            return (
              <Fragment key={`Paginated-list-${story._id}`}>
                <StoryItem
                  data={story}
                  {...{ deployment, contextPath, arcSite, isAdmin }}
                />
                {ads.length > 0 && (
                  <div className={classes.adsBox}>
                    <Ads adElement={ads[0].name} isDesktop={false} isMobile />
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
      </>
    )
  }
}

StoriesListPaginatedList.propTypes = {
  customFields,
}

StoriesListPaginatedList.label = 'Listado con paginación'
StoriesListPaginatedList.static = true

export default StoriesListPaginatedList
