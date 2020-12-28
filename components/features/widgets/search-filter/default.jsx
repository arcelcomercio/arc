import React from 'react'
import { useAppContext } from 'fusion:context'

import ChildSearchFilter from './_children/search-filter'

const SearchFilter = () => {
  const { arcSite, requestUri, isAdmin, globalContentConfig } = useAppContext()

  const params = {
    arcSite,
    requestUri,
    isAdmin,
    globalContentConfig,
  }
  return <ChildSearchFilter {...params} />
}

SearchFilter.label = 'Filtro de búsqueda'

export default SearchFilter
