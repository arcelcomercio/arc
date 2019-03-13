import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
// import PropTypes from 'prop-types'
import CardNotice from '../../../../resources/components/listado-noticias'
import RenderPagination from '../../../../resources/components/paginador-fecha'
import { getActualDate } from '../../../../resources/utilsJs/helpers'

@Consumer
class Archivo extends Component {
  static SECTION_DEFAULT = 'todas'

  constructor(props) {
    super(props)
    this.renderCount = 0
  }

  render() {
    // console.log('props')
    // console.dir(this.props)
    const {
      globalContent: { content_elements: contentElements },
      arcSite,
      globalContentConfig,
    } = this.props
    const { query } = globalContentConfig || {}
    const { section, date } = query || {}
    const params = {
      data: contentElements || [],
      arcSite,
    }
    const sectionPag =
      section === undefined || section === '' ? this.SECTION_DEFAULT : section
    const datePag = date === undefined || date === '' ? getActualDate() : date

    return (
      <Fragment>
        <CardNotice {...params} />
        <RenderPagination section={sectionPag} date={datePag} />
      </Fragment>
    )
  }
}

/* Archivo.propTypes = {
  globalContent: PropTypes.object,
} */

export default Archivo
