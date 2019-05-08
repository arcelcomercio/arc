import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import StoryItem from '../../../global-components/story-item'
import Pagination from '../../../global-components/pagination'

@Consumer
class Buscar extends Component {
  render() {
    const { globalContent, globalContentConfig, arcSite } = this.props
    const { content_elements: contentElements, count = 0 } = globalContent || {}
    const { query: { size = 0, from = 1 } = {} } = globalContentConfig || {}

    const params = {
      data: contentElements || [],
      arcSite,
    }

    return (
      <Fragment>
        <div>
          {params.data.map((el, index) => (
            <StoryItem key={index} data={el} arcSite={params.arcSite} />
          ))}
        </div>
        <Pagination
          totalElements={count}
          storiesQty={size}
          currentPage={from}
        />
      </Fragment>
    )
  }
}

export default Buscar
