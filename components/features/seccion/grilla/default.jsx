import Consumer from 'fusion:consumer'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import DataStory from '../../../../resources/components/utils/data-story'
import Destaque from '../_children/destaque-automatico/default'
import Publicidad from '../_children/publicidad/default'

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

@Consumer
class OrderedNews extends Component {
  renderGrilla = () => {
    const {
      customFields = {},
      arcSite,
      globalContent: { content_elements: stories = [] } = {},
    } = this.props
    let { initialStory: storyNumber = 1 } = customFields

    /**
     *      Resta uno al storyNumber. Para el editor 0 = 1
     */

    storyNumber -= 1

    return elements.map((element, idx) => {
      if (element.type === 'destaque') {
        /** TODO: Optimizar para no crear instancia cada paso del map */
        const story =
          stories && new DataStory(stories[storyNumber + idx], arcSite)
        return (
          <Destaque
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
          <Publicidad
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
    return (
      <div className="content-grid-base content--3col content--2col content--1col full-width margin-top">
        {this.renderGrilla()}
      </div>
    )
  }
}

OrderedNews.propTypes = {
  customFields: PropTypes.shape({
    initialStory: PropTypes.number.tag({
      name: 'Iniciar desde la historia:',
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

export default OrderedNews
