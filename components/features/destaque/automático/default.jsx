import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'
import React, { Component } from 'react'

import Destaque from '../../../../resources/components/destaque'

import DestaqueFormater from '../../../../resources/components/utils/destaque-formater'

@Consumer
class DestaqueAutomatico extends Component {
  constructor(props) {
    super(props)
    this.DestaqueFormater = new DestaqueFormater(props.arcSite)
    this.state = this.DestaqueFormater.initialState
    this.fetch()
  }

  fetch() {
    const { customFields, arcSite } = this.props
    const { section, imageSize, size, storyNumber } = customFields

    const { schema } = this.DestaqueFormater
    const storiesSchema = `{ content_elements ${schema} }`

    const source = 'stories__by-section'
    const params = {
      website: arcSite,
      section,
      feedOffset: storyNumber || 0,
      news_number: 1,
    }

    const { fetched } = this.getContent(source, params, storiesSchema)
    fetched.then(response => {
      const newState = this.DestaqueFormater.formatStory(
        response.content_elements[0],
        size,
        imageSize
      )
      this.setState(newState)
    })
  }

  render() {
    const { category, title, author, image, multimediaType } = this.state
    const { customFields, editableField } = this.props
    const { imageSize, size, titleField, categoryField } = customFields
    const params = {
      title,
      category,
      author,
      image,
      imageSize,
      size,
      editableField,
      titleField,
      categoryField,
      multimediaType,
    }
    return <Destaque {...params} />
  }
}

DestaqueAutomatico.propTypes = {
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
    categoryField: PropTypes.string.tag({
      name: 'Sección',
      group: 'Editar texto',
      description: 'Dejar vacío para tomar el valor original de la noticia.',
    }),
    titleField: PropTypes.string.tag({
      name: 'Título',
      group: 'Editar texto',
      description: 'Dejar vacío para tomar el valor original de la noticia.',
    }),
  }),
}

export default DestaqueAutomatico
