import React, { Component } from 'react'
import Consumer from 'fusion:consumer'

import SearchFilter from '../../../../resources/components/search-filter'

@Consumer
class ContentFilter extends Component {
  render() {
    const { arcSite: website } = this.props
    const params = {
      website,
    }
    return <SearchFilter {...params} />
  }
}

ContentFilter.label = 'Filtro de búsqueda'

export default ContentFilter
