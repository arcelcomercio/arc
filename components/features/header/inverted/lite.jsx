import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import schemaFilter from './_lite/_dependencies/schema-filter'
import HeaderBasicChildren from './_lite/_children/header'

const HeaderBasic = () => {
  const { arcSite, contextPath, globalContent } = useFusionContext()

  const menuSections = useContent({
    source: 'navigation-by-hierarchy',
    query: {
      website: arcSite,
      hierarchy: 'menu-default',
    },
    filter: schemaFilter,
    transform: data => {
      const { children: sections = [] } = data || {}
      return sections
    },
  })

  const params = {
    menuSections,
    arcSite,
    contextPath,
    globalContent,
  }

  return <HeaderBasicChildren {...params} />
}

HeaderBasic.static = true

export default HeaderBasic
