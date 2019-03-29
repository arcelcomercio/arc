import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
// import PropTypes from 'prop-types'
import CardNotice from '../../../../resources/components/listado-noticias'
import RenderPagination from '../../../../resources/components/paginador-fecha'
import { getActualDate } from '../../../../resources/utilsJs/helpers'

@Consumer
class Archivo extends Component {
  constructor(props) {
    super(props)
    this.renderCount = 0
  }

  render() {
    // console.log('props')
    // console.dir(this.props)

    const {
      globalContent: { content_elements: contentElements } = {},
      arcSite,
      globalContentConfig: {
        query: { section = 'todas', date = getActualDate() } = {},
      } = {},
    } = this.props

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
        <RenderPagination section={section} date={date} />
      </Fragment>
    )
  }
}

/* Archivo.propTypes = {
  globalContent: PropTypes.object,
} */

export default Archivo
