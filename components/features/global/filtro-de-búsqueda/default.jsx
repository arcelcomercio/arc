import React, { Component } from 'react'
import Consumer from 'fusion:consumer'

import FilterSearch from '../../../../resources/components/filter-search'

@Consumer
class ContentFilter extends Component {
  render() {
    const { arcSite: website } = this.props
    const params = {
      website,
    }
    return <FilterSearch {...params} />
  }
}

export default ContentFilter
