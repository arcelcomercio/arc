import React from 'react'

import { useContent } from 'fusion:content'
// import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import NavBarChild from './_children/navbar-no-menu'

const navBarNoMenu = props => {
  const { customFields: { hierarchyConfig } = {} } = props

  const { contentService = '', contentConfigValues = {} } =
    hierarchyConfig || {}

  const isReadyNav = !!contentConfigValues.hierarchy
  const sourceValue = isReadyNav ? contentService : 'navigation-by-hierarchy'
  const queryValue = isReadyNav
    ? contentConfigValues
    : {
        hierarchy: 'navbar-default',
      }

  const data =
    useContent({
      source: sourceValue,
      query: queryValue,
      filter: schemaFilter,
    }) || {}

  return <NavBarChild list={data} />
}

navBarNoMenu.propTypes = {
  customFields,
}
navBarNoMenu.label = 'Barra de Navegacion sin menu'
export default navBarNoMenu
