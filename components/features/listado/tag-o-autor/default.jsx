import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import CardNotice from '../../../global-components/stories-list'
import Pagination from '../../../global-components/pagination'

@Consumer
class tagAutor extends Component {
  render() {
    const { globalContent, globalContentConfig, arcSite } = this.props
    const { content_elements: contentElements, count = 0 } = globalContent || {}
    const { query: { storiesQty, currentPageNumber } = {} } =
      globalContentConfig || {}

    const params = {
      data: contentElements || [],
      arcSite,
    }

    return (
      <Fragment>
        <div>
          {params.data.map((el, index) => (
            <CardNotice key={index} data={el} arcSite={params.arcSite} />
          ))}
        </div>
        <Pagination
          totalElements={count}
          storiesQty={storiesQty}
          currentPage={currentPageNumber}
        />
      </Fragment>
    )
  }
}

export default tagAutor
