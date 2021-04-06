import React from 'react'

import { useContent } from 'fusion:content'

import customFields from './_dependencies/custom-fields'
import { filterMenu } from './_dependencies/schema-filter'

import HeaderView from './_children/header-full'

const Elecciones2021Menu = props => {
  const { customFields: { hierarchyMenu } = {} } = props

  const {
    contentService: serviceMenu = '',
    contentConfigValues: valuesMenu = {},
  } = hierarchyMenu || {}
  const sourceMenu = serviceMenu || 'navigation-by-hierarchy'
  const queryMenu = valuesMenu || { hierarchy: 'menu-default' }

  const dataMenu =
    useContent({
      source: sourceMenu,
      query: queryMenu,
      filter: filterMenu,
    }) || {}
  const { children: menuList = [] } = dataMenu

  return <HeaderView menuList={menuList} />
}
Elecciones2021Menu.propTypes = {
  customFields,
}
Elecciones2021Menu.label = 'Elecciones 2021 - Menú'
export default Elecciones2021Menu
