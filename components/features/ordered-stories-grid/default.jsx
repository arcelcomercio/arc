import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import StoryData from '../../utilities/story-data'
import FeaturedStory from './_children/featured-story/default'
import Ads from './_children/ads/default'

const elements = [
  { col: 2, row: 1, type: 'destaque' },
  { col: 1, row: 2, type: 'publicidad' },
  { col: 1, row: 1, type: 'destaque' },
  { col: 1, row: 1, type: 'destaque' },
  { col: 1, row: 1, type: 'destaque' },
  { col: 1, row: 1, type: 'destaque' },
  { col: 1, row: 1, type: 'destaque' },
  { col: 1, row: 1, type: 'destaque' },
  { col: 2, row: 1, type: 'destaque' },
]

const classes = {
  container:
    'grid grid--content grid--col-3 grid--col-2 grid--col-1 w-full mt-20',
}

@Consumer
class OrderedStoriesGrid extends PureComponent {
  renderGrilla() {
    const {
      globalContent,
      deployment,
      contextPath,
      arcSite,
      customFields,
    } = this.props
    const { content_elements: contentElements } = globalContent || {}
    const stories = contentElements || []
    let { initialStory: storyNumber = 1 } = customFields || {}
    storyNumber -= 1 // Resta uno al storyNumber. Para el editor 0 = 1

    const storyDataElement = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'md',
    })
    return elements.map((element, idx) => {
      if (element.type === 'destaque') {
        storyDataElement.__data = stories[storyNumber + idx] || {}
        const story = storyDataElement.attributesRaw || {}
        return (
          <FeaturedStory
            key={story.link}
            arcSite={arcSite}
            story={story}
            imageSize="complete"
            size={element.col === 2 ? 'twoCol' : 'oneCol'}
          />
        )
      }
      if (element.type === 'publicidad') {
        storyNumber -= 1
        const { adElement, isDesktop, isMobile, freeHtml } = customFields || {}
        return (
          <Ads
            adElement={adElement}
            isDesktop={isDesktop}
            isMobile={isMobile}
            columns={element.col === 2 ? 'twoCol' : 'oneCol'}
            rows={element.row === 2 ? 'twoRow' : 'oneRow'}
            freeHtml={freeHtml}
          />
        )
      }
      return {}
    })
  }

  render() {
    return <div className={classes.container}>{this.renderGrilla()}</div>
  }
}

OrderedStoriesGrid.propTypes = {
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
    /**
     *      CustomFields de publicidad
     */
    adElement: PropTypes.string.isRequired.tag({
      name: 'Identificador de publicidad',
    }),
    isDesktop: PropTypes.bool.tag({
      name: 'Desktop',
      group: 'Dispositivo de publicidad',
    }),
    isMobile: PropTypes.bool.tag({
      name: 'Mobile',
      group: 'Dispositivo de publicidad',
    }),
    freeHtml: PropTypes.richtext.tag({
      name: 'Código HTML',
      group: 'Agregar bloque de html para publicidad',
    }),
  }),
}

OrderedStoriesGrid.label = 'Grilla de Historias Ordenadas'

export default OrderedStoriesGrid
