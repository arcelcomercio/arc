import React, { PureComponent, Fragment } from 'react'
import Consumer from 'fusion:consumer'

import StoryItem from '../../../global-components/story-item'
import RenderPagination from '../../../global-components/pagination-by-date'
import { getActualDate } from '../../../utilities/helpers'

@Consumer
class StoriesListArchive extends PureComponent {
  render() {
    const { globalContent, deployment, contextPath, arcSite } = this.props
    const {
      content_elements: contentElements,
      params: { section, date } = {},
    } = globalContent || {}
    const stories = contentElements || []

    return (
      <Fragment>
        <div>
          {stories.map(story => (
            <StoryItem
              key={`Archivo-${story._id}`}
              data={story}
              deployment={deployment}
              contextPath={contextPath}
              arcSite={arcSite}
            />
          ))}
        </div>
        <RenderPagination
          section={section}
          date={date || getActualDate()}
          contextPath={contextPath}
        />
      </Fragment>
    )
  }
}

StoriesListArchive.label = 'Listado de Archivo'

export default StoriesListArchive
