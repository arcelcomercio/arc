import Consumer from 'fusion:consumer'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import DataStory from '../../utilities/story-data'
import FeaturedStory from '../../global-components/featured-story'
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
    const { content_elements: contentElements = [] } = globalContent || {}

    const dataStory = new DataStory({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'md',
    })
    let storyNumber = 0

    return elements.map(element => {
      if (element.type === 'destaque') {
        dataStory.__data = contentElements[storyNumber]
        const params = {
          title: {
            name: dataStory.title,
            url: dataStory.link,
          },
          category: {
            name: dataStory.section,
            url: dataStory.sectionLink,
          },
          author: {
            name: dataStory.author,
            url: dataStory.authorLink,
          },
          image: dataStory.multimedia,
          imageSize: 'complete',
          headband: 'normal',
          size: element.col === 1 ? 'oneCol' : 'twoCol',
          hightlightOnMobile: true,
          arcSite,
          multimediaType: dataStory.multimediaType,
        }
        storyNumber += 1
        return <FeaturedStory key={dataStory.id} {...params} />
      }
      if (element.type === 'publicidad') {
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
    adElement: PropTypes.string.tag({
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
