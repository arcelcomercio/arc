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

  const data =
    useContent({
      source: contentService,
      query: contentConfigValues,
      filter: schemaFilter,
    }) || {}

  console.log(data, 'dataaaaa')

  return <NavBarChild list={data} />
}

navBarNoMenu.propTypes = {
  customFields,
}
navBarNoMenu.label = 'Barra de Navegacion sin menu'
export default navBarNoMenu
