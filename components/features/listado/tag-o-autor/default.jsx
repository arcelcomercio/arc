import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import CardNotice from '../../../../resources/components/listado-noticias'
import Paginacion from '../../../../resources/components/paginacion_numerica'

@Consumer
class tagAutor extends Component {
  render() {
    const {
      globalContent: { content_elements: contentElements = [], count = 0 } = {},
      globalContentConfig: {
        query: { amountStories = 0, currentNumPage = 1 } = {},
      } = {},
      arcSite,
    } = this.props

    const params = {
      data: contentElements,
      arcSite,
    }

    return (
      <Fragment>
        <div>
          {params.data.map((el, index) => (
            <CardNotice key={index} data={el} arcSite={params.arcSite} />
          ))}
        </div>
        <Paginacion
          totalElements={count}
          totalViews={amountStories}
          currentPage={currentNumPage}
        />
      </Fragment>
    )
  }
}

export default tagAutor
