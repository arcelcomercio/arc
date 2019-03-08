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
    console.log(props)
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
          totalElements={globalContent.count}
          totalViews={globalContentConfig.query.amountStories}
          currentPage={globalContentConfig.query.currentNumPage || 1}
        />
      </Fragment>
    )
  }
}

export default tagAutor
