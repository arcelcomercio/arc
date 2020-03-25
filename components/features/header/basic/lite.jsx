import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import schemaFilter from './_dependencies/schema-filter'
import HeaderBasicChildren from './_children/header'

const HeaderBasic = () => {
  const { arcSite, contextPath } = useFusionContext()

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
  }

  return <HeaderBasicChildren {...params} />
}

HeaderBasic.static = true

export default HeaderBasic
