import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'

import FeaturedStory from '../../../global-components/featured-story'
import StoryFormatter from '../../../utilities/featured-story-formatter'

@Consumer
class CardFeaturedStoryAuto extends PureComponent {
  constructor(props) {
    super(props)
    const { deployment, contextPath, arcSite } = props
    this.storyFormatter = new StoryFormatter({
      deployment,
      contextPath,
      arcSite,
    })
    this.state = this.storyFormatter.initialState
    this.fetch()
  }

  fetch() {
    const { customFields, arcSite } = this.props
    const { section, storyNumber, imgField } = customFields

    const { schema } = this.storyFormatter
    const storiesSchema = `{ content_elements ${schema} }`

    const source = 'story-feed-by-section'
    const params = {
      website: arcSite,
      section,
      feedOffset: storyNumber || 0,
      news_number: 1,
    }

    const { fetched } = this.getContent(source, params, storiesSchema)
    fetched.then(response => {
      const { content_elements: contentElements = [] } = response || {}
      const newState = this.storyFormatter.formatStory(
        contentElements[0],
        imgField
      )
      this.setState(newState)
    })
  }

  render() {
    const { category, title, author, image, multimediaType } = this.state
    const { customFields, editableField, arcSite } = this.props
    const { imageSize, size, hightlightOnMobile, titleField, categoryField } =
      customFields || {}
    const params = {
      title,
      category,
      author,
      image,
      imageSize,
      size,
      hightlightOnMobile,
      editableField,
      titleField,
      categoryField,
      arcSite,
      multimediaType,
    }
    return <FeaturedStory {...params} />
  }
}

CardFeaturedStoryAuto.propTypes = {
  customFields: PropTypes.shape({
    section: PropTypes.string.tag({
      name: 'Path de la sección',
      description:
        'Si no se coloca el path de la sección, se renderiza la última historia publicada. Ejemplo: /deporte-total',
    }),
    storyNumber: PropTypes.number.tag({
      name: 'Número de la historia',
      description:
        'Si no se completa el campo, el número de la historia será 0 (la última historia publicada)',
      group: 'Elgir el número de la historia',
      min: 0,
    }),
    imageSize: PropTypes.oneOf(['parcialBot', 'parcialTop', 'complete']).tag({
      name: 'Posición de la imagen',
      labels: {
        parcialBot: 'Parcial inferior',
        parcialTop: 'Parcial Superior',
        complete: 'Completa',
      },
      defaultValue: 'parcialBot',
    }),
    size: PropTypes.oneOf(['oneCol', 'twoCol']).tag({
      name: 'Tamaño del destaque',
      labels: {
        oneCol: '1 columna',
        twoCol: '2 columnas',
      },
      defaultValue: 'oneCol',
    }),
    hightlightOnMobile: PropTypes.bool.tag({
      name: 'Destacar en móvil',
      defaultValue: false,
    }),
    categoryField: PropTypes.string.tag({
      name: 'Sección',
      group: 'Editar campos',
      description: 'Dejar vacío para tomar el valor original de la noticia.',
    }),
    titleField: PropTypes.string.tag({
      name: 'Título',
      group: 'Editar campos',
      description: 'Dejar vacío para tomar el valor original de la noticia.',
    }),
    imgField: PropTypes.string.tag({
      name: 'Imagen',
      group: 'Editar campos',
      description: 'Dejar vacío para tomar el valor original de la noticia.',
    }),
  }),
}

CardFeaturedStoryAuto.label = 'Destaque por Sección'

export default CardFeaturedStoryAuto
