import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import TabloidListChild from './_children/story-tabloid'
import schemaFilter from './_dependencies/filter-schema'

const TabloidList = () => {
  const {
    globalContentConfig,
    arcSite,
    contextPath,
    deployment,
    isAdmin,
  } = useFusionContext()
  // const { section } = globalContentConfig
  console.log(globalContentConfig, 'GLOBAAAAAAAAAAAL')
  // const data =
  //   useContent({
  //     source: 'story-feed-by-section',
  //     query: {
  //       section
  //     },
  //     filter: schemaFilter(arcSite),
  //   }) || {}

  return <TabloidListChild />
}

TabloidList.label = 'Listado Tabloide'
export default TabloidList
