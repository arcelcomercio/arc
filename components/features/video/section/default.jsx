import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import ChildrenSectionVideo from './_children/section-video'
import schemaFilter from './_dependencies/schema-filter'

const SectionVideo = () => {
  const { globalContent, arcSite, contextPath, deployment } = useFusionContext()
  const section = globalContent._id

  const data =
    useContent({
      source: 'story-by-section',
      query: { section },
      filter: schemaFilter(arcSite),
    }) || {}

  console.log(data, 'DATA')

  return <ChildrenSectionVideo />
}

export default SectionVideo
