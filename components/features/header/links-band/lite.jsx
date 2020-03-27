import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'
import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'

import LinksBand from './_children/links-band'
// import getProperties from 'fusion:properties'

const BAND_HIERARCHY = 'header-default'
const CONTENT_SOURCE = 'navigation-by-hierarchy'

const HeaderLinksBand = props => {
  const {
    customFields: { hierarchyConfig, tag },
  } = props

  const { arcSite } = useFusionContext()

  const { contentService = '', contentConfigValues = {} } =
    hierarchyConfig || {}

  const isHierarchyReady = !!contentConfigValues.hierarchy
  const bandSource = isHierarchyReady ? contentService : CONTENT_SOURCE
  const sourceQuery = isHierarchyReady
    ? contentConfigValues
    : {
        website: arcSite,
        hierarchy: BAND_HIERARCHY,
      }

  const links = useContent({
    source: bandSource,
    query: sourceQuery,
    filter: schemaFilter,
    transform: data => {
      const { children = [] } = data || {}
      const LINK = 'link'
      return children.map(child => {
        let name = child.node_type === LINK ? child.display_name : child.name
        const rawMatch = name.match(/\[#.*\]/g)
        const match =
          rawMatch === null
            ? ''
            : rawMatch[0]
                .replace('[', '')
                .replace(']', '')
                .split(',')
        if (match) {
          name = name.replace(/\[#.*\]/g, '')
        }
        return {
          name,
          url: child.node_type === LINK ? child.url : child._id,
          styles: match,
        }
      })
    },
  })

  return <LinksBand links={links} tag={tag} />
}

HeaderLinksBand.label = 'Cabecera - Temas del día'
HeaderLinksBand.static = true

HeaderLinksBand.propTypes = {
  customFields,
}

export default HeaderLinksBand
