import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import StoriesAuthorChild from './_children/stories-author'

const StoriesListAuthor = props => {
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()

  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
    } = {},
  } = props

  const data =
    useContent({
      source: contentService,
      query: contentConfigValues,
      filter: schemaFilter(arcSite),
    }) || {}

    console.log('data ', data)
  return <StoriesAuthorChild />
}

StoriesListAuthor.label = 'Listado de historias - autores'
// StoriesListAuthor.static = true

StoriesListAuthor.propTypes = {
  customFields,
}

export default StoriesListAuthor
