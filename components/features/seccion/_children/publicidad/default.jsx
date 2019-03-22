import Consumer from 'fusion:consumer'
import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import Ads from '../../../../../resources/components/ads'

@Consumer
class GrillaPublicidad extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      adElement,
      isDesktop,
      isMobile,
      columns,
      rows,
      freeHtml,
    } = this.props

    const getSize = () => {
      let colCLass = ''
      if (columns === 'oneCol') colCLass = 'col-1'
      else if (columns === 'twoCol') colCLass = 'col-2'
      else if (columns === 'threeCol') colCLass = 'col-3'

      let rowClass = ''
      if (rows === 'oneRow') rowClass = 'row-1'
      else if (rows === 'twoRow') rowClass = 'row-2'

      if (colCLass || rowClass) return `${colCLass} ${rowClass}`
      return ''
    }
    const createMarkup = html => {
      return { __html: html }
    }

    const params = {
      adElement,
      isDesktop,
      isMobile,
    }

    // TODO: Corregir el nodo duplicado de html
    return (
      <Fragment>
        <div className={`no-mobile ${getSize()}`}>
          <Ads {...params} />
          {freeHtml && <div dangerouslySetInnerHTML={createMarkup(freeHtml)} />}
        </div>
        <Ads {...params} />
        {freeHtml && (
          <div
            className="no-desktop"
            dangerouslySetInnerHTML={createMarkup(freeHtml)}
          />
        )}
      </Fragment>
    )
  }
}

GrillaPublicidad.propTypes = {
  customFields: PropTypes.shape({
    adElement: PropTypes.string.isRequired,
    isDesktop: PropTypes.bool,
    isMobile: PropTypes.bool,
    columns: PropTypes.oneOf(['auto', 'oneCol', 'twoCol', 'threeCol']),
    rows: PropTypes.oneOf(['auto', 'oneRow', 'twoRow']),
  }),
}

export default GrillaPublicidad
