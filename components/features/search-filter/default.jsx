import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import ChildSearchFilter from './_children/search-filter'

@Consumer
class SearchFilter extends PureComponent {
  render() {
    const {
      arcSite,
      requestUri,
      isAdmin,
      globalContentConfig,
      contextPath,
    } = this.props

    const params = {
      arcSite,
      requestUri,
      contextPath,
      isAdmin,
      globalContentConfig,
    }

    return <ChildSearchFilter {...params} />
  }
}

SearchFilter.label = 'Filtro de búsqueda'

export default SearchFilter
