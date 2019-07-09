import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import customFields from './_dependencies/custom-fields'
import StoryItem from '../../../global-components/story-item'

const classes = {
  listado: 'w-full',
  listadoSeeMore: 'flex justify-center mt-20 uppercase',
}

@Consumer
class StoriesListSectionStories extends PureComponent {
  render() {
    const {
      globalContent,
      deployment,
      contextPath,
      arcSite,
      globalContentConfig,
      customFields: { storiesQty = 50, initialStory = 0 } = {},
    } = this.props

    const { query: { section = '' } = {} } = globalContentConfig || {}
    const { content_elements: contentElements } = globalContent || {}
    const stories = contentElements || []

    // Archivo sólo está disponible para secciones principales, no subsecciones.
    const seeMorePath = `/archivo/${section.split('/')[1]}/`

    return (
      <div className={classes.listado}>
        <div>
          {stories &&
            stories
              .slice(initialStory, initialStory + storiesQty)
              .map(story => (
                <StoryItem
                  key={`Section-storie-${story._id}`}
                  data={story}
                  deployment={deployment}
                  contextPath={contextPath}
                  arcSite={arcSite}
                  formato="row"
                />
              ))}
        </div>
        <div className={classes.listadoSeeMore}>
          <a href={seeMorePath} tabIndex="0" role="button">
            Ver más
          </a>
        </div>
      </div>
    )
  }
}

StoriesListSectionStories.propTypes = {
  customFields,
}

StoriesListSectionStories.label = 'Listado de Sección'
StoriesListSectionStories.static = true

export default StoriesListSectionStories
