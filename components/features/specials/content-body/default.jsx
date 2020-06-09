import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'

import ContentBodyChildSpecial from './_children/content-body'
import schemaFilter from './_dependencies/schema-filter'

const CONTENT_SOURCE = 'story-by-id'

const ContentSpecialBody = props => {
  const { customFields: { storyCode = '' } = {} } = props

  const story = useContent({
    source: CONTENT_SOURCE,
    query: {
      _id: storyCode,
      published: 'false',
    },
    filter: schemaFilter,
  })

  const { content_elements: contentElements = [] } = story || {}

  const params = { contentElements }

  return <ContentBodyChildSpecial {...params} />
}

ContentSpecialBody.label = 'Especial - Contenido'
ContentSpecialBody.static = true

ContentSpecialBody.propTypes = {
  customFields: PropTypes.shape({
    storyCode: PropTypes.string.tag({
      name: 'ID de historia',
    }),
  }),
}

export default ContentSpecialBody
