import React, { PureComponent, Fragment } from 'react'
import Consumer from 'fusion:consumer'

import StoryItem from '../../../global-components/story-item'
import RenderPagination from '../../../global-components/pagination-by-date'
import { getActualDate } from '../../../utilities/helpers'

@Consumer
class StoriesListArchive extends PureComponent {
  render() {
    const { globalContent, arcSite, globalContentConfig } = this.props
    const { content_elements: contentElements } = globalContent || {}
    const { query: { section, date } = {} } = globalContentConfig || {}
    const params = {
      data: contentElements || [],
      arcSite,
    }

    return (
      <Fragment>
        <div>
          {params.data.map(story => (
            <StoryItem
              key={`Archivo-${story._id}`}
              data={story}
              arcSite={params.arcSite}
            />
          ))}
        </div>
        <RenderPagination section={section} date={date || getActualDate()} />
      </Fragment>
    )
  }
}

StoriesListArchive.label = 'Listado de Archivo'
StoriesListArchive.static = true

export default StoriesListArchive
