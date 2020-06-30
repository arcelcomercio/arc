import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_lite/_dependencies/schema-filter'
import HeaderBasicChildren from './_lite/_children/header'

const HeaderBasic = props => {
  const { arcSite, contextPath, globalContent } = useFusionContext()
  const {
    customFields: { customLogoTitle, hideMenu },
  } = props

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
    hideMenu,
    menuSections,
    arcSite,
    contextPath,
    globalContent,
    customLogoTitle,
  }

  return <HeaderBasicChildren {...params} />
}

HeaderBasic.static = true

HeaderBasic.propTypes = {
  customFields,
}

export default HeaderBasic
