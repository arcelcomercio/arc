import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'

import FeaturedStory from '../../../global-components/featured-story'
import StoryFormatter from '../../../utilities/featured-story-formatter'

@Consumer
class CardFeaturedStoryManual extends PureComponent {
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
    const { path, imgField } = customFields

    const { schema } = this.storyFormatter

    const source = 'story-by-url'
    const params = {
      website: arcSite,
      website_url: path,
    }

    const { fetched } = this.getContent(source, params, schema)
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
      editableField,
      titleField,
      categoryField,
      multimediaType,
    }
    return <FeaturedStory {...params} />
  }
}

CardFeaturedStoryManual.propTypes = {
  customFields: PropTypes.shape({
    path: PropTypes.string.isRequired.tag({
      name: 'Path',
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
        oneCol: '1 columna',
        twoCol: '2 columnas',
      },
      defaultValue: 'oneCol',
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

CardFeaturedStoryManual.label = 'Destaque por URL'

export default CardFeaturedStoryManual
