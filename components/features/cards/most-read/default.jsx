import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import CardMostReadList from './_children/list'

import schemaFilter from './_dependencies/schema-filter'
import { getQuery, getStories } from './_dependencies/functions'

const CONTENT_SOURCE = 'story-feed-by-views'

const CardMostRead = props => {
  const {
    globalContent,
    globalContentConfig,
    deployment,
    contextPath,
    arcSite,
    requestUri,
    isAdmin,
  } = useFusionContext()

  const { customFields } = props
  const { viewImage = false, storiesQty = 5, customTitle = '', customLink } =
    customFields || {}

  const data = useContent({
    source: CONTENT_SOURCE,
    query: {
      ...getQuery({ globalContent, globalContentConfig, storiesQty }),
    },
    filter: schemaFilter,
    transform: ({ content_elements: contentElements = [] } = {}) => {
      const response = {
        stories: [
          ...getStories({
            data: contentElements,
            deployment,
            contextPath,
            arcSite,
          }),
        ],
      }
      return response
    },
  })

  const { stories = [] } = data || {}
  const params = {
    viewImage,
    storiesQty,
    arcSite,
    requestUri,
    stories,
    customTitle,
    customLink,
    isAdmin,
  }

  return <CardMostReadList {...params} />
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
CardMostRead.label = 'Noticias más Leidas'
CardMostRead.static = true

export default CardMostRead
