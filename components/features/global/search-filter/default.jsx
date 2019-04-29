import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import SearchFilter from '../../../../resources/components/search-filter'

@Consumer
class ContentFilter extends PureComponent {
  render() {
    const { arcSite, requestUri, isAdmin, globalContentConfig } = this.props
    const params = {
      arcSite,
      requestUri,
      isAdmin,
      globalContentConfig,
    }
    return <SearchFilter {...params} />
  }
}

ContentFilter.label = 'Filtro de búsqueda'

export default ContentFilter
