import React, { PureComponent, Fragment } from 'react'
import Consumer from 'fusion:consumer'

import StoryItem from '../../../global-components/story-item'
import Pagination from '../../../global-components/pagination'

@Consumer
class StoriesListPaginatedList extends PureComponent {
  render() {
    const {
      globalContent,
      globalContentConfig,
      deployment,
      contextPath,
      arcSite,
    } = this.props
    const { content_elements: stories, count = 0 } = globalContent || {}
    const { query: { size = 0, from = 1 } = {} } = globalContentConfig || {}

    return (
      <Fragment>
        <div>
          {stories.map(story => (
            <StoryItem
              key={`Paginated-list-${story._id}`}
              data={story}
              deployment={deployment}
              contextPath={contextPath}
              arcSite={arcSite}
            />
          ))}
        </div>
        <Pagination
          totalElements={count}
          storiesQty={size}
          currentPage={from}
        />
      </Fragment>
    )
  }
}

StoriesListPaginatedList.label = 'Listado con paginación'

export default StoriesListPaginatedList
