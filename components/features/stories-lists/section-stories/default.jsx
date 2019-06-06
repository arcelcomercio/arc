import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import StoryItem from '../../../global-components/story-item'

const classes = {
  listado: 'full-width',
  listadoSeeMore: 'flex flex--justify-center margin-top text-uppercase',
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
      customFields,
    } = this.props

    const { storiesQty = 50 } = customFields || {}
    let { initialStory = 1 } = customFields || {}
    initialStory -= 1 // Resta uno al initialStory. Para el editor 0 = 1

    const { query: { section = '' } = {} } = globalContentConfig || {}
    const { content_elements: contentElements } = globalContent || {}
    const stories = contentElements || []

    const seeMorePath = `${contextPath}/archivo${section}?_website=${arcSite}`

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
  customFields: PropTypes.shape({
    initialStory: PropTypes.number.tag({
      name: 'Iniciar desde la historia:',
      min: 1,
      max: 100,
      step: 1,
      defaultValue: 1,
      description:
        'Indique el número de la historia desde la que quiere empezar a imprimir. La primera historia corresponde al número 1',
    }),
    storiesQty: PropTypes.number.tag({
      name: 'Cantidad de historias',
      min: 1,
      max: 100,
      step: 1,
      defaultValue: 50,
      description: 'Indique el número de historias que deben ser listadas.',
    }),
  }),
}

StoriesListSectionStories.label = 'Listado de Sección'
// Static true no sirve
// StoriesListSectionStories.static = true

export default StoriesListSectionStories
