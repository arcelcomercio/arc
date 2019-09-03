import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import TabloidListChild from './_children/story-tabloid'
import schemaFilter from './_dependencies/filter-schema'

const TabloidList = () => {
  const { globalContent, arcSite, contextPath, deployment } = useFusionContext()
  const section = globalContent._id
  const data =
    useContent({
      source: 'story-feed-by-section',
      query: {
        section,
      },
      filter: schemaFilter(arcSite),
    }) || {}

  const params = {
    data: data.content_elements,
    section,
    arcSite,
    contextPath,
    deployment,
  }
  return <TabloidListChild {...params} />
}

// TabloidList.static = true
TabloidList.label = 'Listado Tabloide'
export default TabloidList
