import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import CardNotice from '../../../../resources/components/listado-noticias'
import RenderPagination from '../../../../resources/components/paginador-fecha'
import { getActualDate } from '../../../utilities/helpers'

@Consumer
class Archivo extends Component {
  constructor(props) {
    super(props)
    this.renderCount = 0
  }

  render() {
    // console.log('props')
    // console.dir(this.props)

    const { globalContent, arcSite, globalContentConfig } = this.props
    const { content_elements: contentElements } = globalContent || {}
    const { query: { section, date } = {} } = globalContentConfig || {}

    const params = {
      data: contentElements || [],
      arcSite,
    }

    return (
      <Fragment>
        <div>
          {params.data.map(el => (
            <CardNotice
              key={`Archivo_${el._id}`}
              data={el}
              arcSite={params.arcSite}
            />
          ))}
        </div>
        <RenderPagination section={section} date={date || getActualDate()} />
      </Fragment>
    )
  }
}

Archivo.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  globalContent: PropTypes.object,
}

export default Archivo
