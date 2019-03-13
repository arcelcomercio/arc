import React, { Component } from 'react'
import Consumer from 'fusion:consumer'

import Filter from '../../../resources/components/filters'

@Consumer
class ContentFilter extends Component {
  render() {
    const { arcSite: website } = this.props
    const params = {
      website,
    }
    return <Filter {...params} />
  }
}

export default ContentFilter
