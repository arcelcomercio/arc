import React from 'react'

import { useContent } from 'fusion:content'
// import { useFusionContext } from 'fusion:context'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import NavBarChild from './_children/navbar-no-menu'

const navBarNoMenuNoSignwall = props => {
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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useContent({
      source: sourceValue,
      query: queryValue,
      filter: schemaFilter,
    }) || {}

  return <NavBarChild list={data} />
}

navBarNoMenuNoSignwall.propTypes = {
  customFields,
}
navBarNoMenuNoSignwall.label = 'Barra de Navegacion sin menu y signwall'
navBarNoMenuNoSignwall.static = true

export default navBarNoMenuNoSignwall
