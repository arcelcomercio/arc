import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import CardNotice from '../../../global-components/stories-list'
import Pagination from '../../../global-components/pagination'

@Consumer
class Buscar extends Component {
  constructor(props) {
    super(props)
    this.renderCount = 0
  }

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
            <CardNotice key={index} data={el} arcSite={params.arcSite} />
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
