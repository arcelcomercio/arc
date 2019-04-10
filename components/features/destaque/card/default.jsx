import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

import Destaque from '../../../../resources/components/destaque'

import DestaqueFormater from '../_children/destaque-formater'

@Consumer
class DestaqueCard extends Component {
  constructor(props) {
    super(props)
    this.DestaqueFormater = new DestaqueFormater(props.arcSite)
    this.state = this.DestaqueFormater.initialState
    this.fetch()
  }

  fetch() {
    const { customFields } = this.props
    const {
      imageSize,
      size,
      imgField,
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
    } = customFields

    const { schema } = this.DestaqueFormater

    const { fetched } = this.getContent(
      contentService,
      contentConfigValues,
      schema
    )
    fetched.then(response => {
      const newState = this.DestaqueFormater.formatStory(
        response,
        size,
        imageSize,
        imgField
      )
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
    return <Destaque {...params} />
  }
}

DestaqueCard.propTypes = {
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

DestaqueCard.label = 'Destaque avanzado'

export default DestaqueCard
