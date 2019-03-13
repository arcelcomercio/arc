import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import CardNotice from '../../../../resources/components/listado-noticias'
import Paginacion from '../../../../resources/components/paginacion_numerica'

@Consumer
class Buscar extends Component {
  constructor(props) {
    super(props)
    this.renderCount = 0
  }

  render() {
    const { globalContent, globalContentConfig, arcSite } = this.props

    const params = {
      data: globalContent.content_elements || [],
      arcSite,
    }
    return (
      <Fragment>
        <CardNotice {...params} />
        <Paginacion
          totalElements={globalContent.count || 0}
          totalViews={
            (globalContentConfig.query && globalContentConfig.query.size) || 0
          }
          currentPage={
            (globalContentConfig.query && globalContentConfig.query.from) || 1
          }
        />
      </Fragment>
    )
  }
}

export default Buscar
