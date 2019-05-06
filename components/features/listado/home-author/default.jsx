import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'
import CardNotice from '../../../global-components/stories-list'
import RenderPagination from '../../../global-components/pagination-by-date'
import { getActualDate } from '../../../utilities/helpers'

@Consumer
class ListHomeAuthor extends Component {
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

ListHomeAuthor.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  globalContent: PropTypes.object,
}

export default ListHomeAuthor
