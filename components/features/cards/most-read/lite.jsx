import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import Static from 'fusion:static'
import PropTypes from 'prop-types'
import React from 'react'

import { getQuery, getStories } from './_dependencies/functions'
import schemaFilter from './_dependencies/schema-filter'
import CardMostReadList from './_lite/_children/list'

const CONTENT_SOURCE = 'story-feed-by-views'
const CardMostReadLite = (props) => {
  const {
    globalContent,
    globalContentConfig,
    deployment,
    contextPath,
    arcSite,
    requestUri,
    isAdmin,
    metaValue,
  } = useFusionContext()

  const presets = 'no-presets'

  const { customFields } = props
  const { viewImage = false, storiesQty = 5, customTitle = '', customLink } =
    customFields || {}

  const data = useContent({
    source: CONTENT_SOURCE,
    query: {
      presets,
      ...getQuery({ globalContent, globalContentConfig, storiesQty, arcSite }),
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
    classList: '',
    contextPath,
    metaValue
  }

  return (
    <Static id="CardMostReadLite">
      <CardMostReadList {...params} />
    </Static>
  )
}

CardMostReadLite.propTypes = {
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

CardMostReadLite.label = 'Últimas Noticias'
CardMostReadLite.static = true

export default CardMostReadLite
