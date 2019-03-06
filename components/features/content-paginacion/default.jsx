import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import Paginacion from '../../../resources/components/paginacion_numerica'

const totalElements = 1500
const totalViews = 50

@Consumer
class ContentPagination extends Component {
  constructor(props) {
    super(props)
    const numPag = window.location.pathname.match(/\/[0-9]{1,2}/)
    this.state = {
      currentPage: numPag != null ? numPag[0].split('/')[1] : 0,
    }
    console.log(props)
  }
  render() {
    return (
      <Fragment>
        {totalElements > totalViews && (
          <Paginacion
            totalElements={totalElements}
            totalViews={totalViews}
            currentPage={this.state.currentPage}
          />
        )}
      </Fragment>
    )
  }
}

export default ContentPagination
