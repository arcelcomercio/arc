import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
// import PropTypes from 'prop-types'
import CardNotice from '../../../../resources/components/listado-noticias'
import Paginacion from '../../../../resources/components/paginacion_numerica'

@Consumer
class tagAutor extends Component {
  constructor(props) {
    super(props)
    this.renderCount = 0
    console.dir(props)
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
            (globalContentConfig.query &&
              globalContentConfig.query.amountStories) ||
            0
          }
          currentPage={
            (globalContentConfig.query &&
              globalContentConfig.query.currentNumPage) ||
            1
          }
        />
      </Fragment>
    )
  }
}

export default tagAutor
