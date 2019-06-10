import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'

import FeaturedStory from '../../../global-components/featured-story'
import StoryFormatter from '../../../utilities/featured-story-formatter'

@Consumer
class CardFeaturedStoryAdvanced extends PureComponent {
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
    const { customFields } = this.props
    const {
      imgField,
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
    } = customFields

    const { schema } = this.storyFormatter

    const { fetched } = this.getContent(
      contentService,
      contentConfigValues,
      schema
    )
    fetched.then(response => {
      const newState = this.storyFormatter.formatStory(response, imgField)
      this.setState(newState)
    })
  }

  render() {
    const { customFields, editableField } = this.props
    const { category, title, author, image, multimediaType } = this.state
    const {
      imageSize,
      headband,
      size,
      hightlightOnMobile,
      titleField,
      categoryField,
    } = customFields
    const params = {
      title,
      category,
      author,
      image,
      imageSize,
      headband,
      size,
      hightlightOnMobile,
      editableField,
      titleField,
      categoryField,
      multimediaType,
    }
    return <FeaturedStory {...params} />
  }
}

CardFeaturedStoryAdvanced.propTypes = {
  customFields: PropTypes.shape({
    storyConfig: PropTypes.contentConfig('story').isRequired.tag({
      name: 'Configuración del contenido',
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
    headband: PropTypes.oneOf(['normal', 'live']).tag({
      name: 'Cintillo',
      labels: {
        normal: 'Normal',
        live: 'En vivo',
      },
      defaultValue: 'normal',
    }),
    size: PropTypes.oneOf(['oneCol', 'twoCol']).tag({
      name: 'Tamaño del destaque',
      labels: {
        oneCol: '1 fila, 1 columna',
        twoCol: '1 fila, 2 columnas',
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

CardFeaturedStoryAdvanced.label = 'Destaque Avanzado'

export default CardFeaturedStoryAdvanced
