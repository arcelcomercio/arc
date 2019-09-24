import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'

import CardMostReadList from './_children/list'

import schemaFilter from './_dependencies/schema-filter'
import { getQuery, getStories } from './_dependencies/functions'

const CONTENT_SOURCE = 'story-feed-by-views'

@Consumer
class CardMostRead extends Component {
  constructor(props) {
    super(props)
    const {
      globalContent,
      globalContentConfig,
      deployment,
      contextPath,
      arcSite,
      customFields: { storiesQty = 5 } = {},
    } = props
    this.fetchContent({
      data: {
        source: CONTENT_SOURCE,
        query: {
          ...getQuery({ globalContent, globalContentConfig, storiesQty }),
        },
        filter: schemaFilter,
        transform: ({ content_elements: contentElements = [] } = {}) => {
          const data = {
            stories: [
              ...getStories({
                data: contentElements,
                deployment,
                contextPath,
                arcSite,
              }),
            ],
          }
          return data
        },
      },
    })
  }

  render() {
    const {
      customFields,
      arcSite,
      requestUri,
      editableField,
      isAdmin,
    } = this.props
    const { viewImage = false, storiesQty = 5, customTitle = '', customLink } =
      customFields || {}
    const { data: { stories } = {} } = this.state
    const params = {
      viewImage,
      storiesQty,
      arcSite,
      requestUri,
      stories,
      customTitle,
      customLink,
      editableField,
      isAdmin,
    }
    return <CardMostReadList {...params} />
  }
}

CardMostRead.propTypes = {
  customFields: PropTypes.shape({
    viewImage: PropTypes.bool.tag({
      name: 'Imagen Visible',
    }),
    customTitle: PropTypes.string.tag({
      name: 'Editar Título',
    }),
    customLink: PropTypes.string.tag({
      name: 'Editar Url',
    }),
    storiesQty: PropTypes.number.tag({
      name: 'Número de Noticias',
      min: 1,
      max: 22,
      step: 1,
      defaultValue: 5,
    }),
  }),
}
// TODO: Cambiar nombre a Noticias mas leidas
// CardMostRead.label = 'Últimas Noticias'
// 
CardMostRead.label = 'Noticias mas Leidas'
CardMostRead.static = true

export default CardMostRead
