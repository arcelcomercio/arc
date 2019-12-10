import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'

@Consumer
class GridSectionColumns extends Component {
  /* constructor(props) {
    super(props)

    this.fetchContent({
      data: {
        source: contentService,
        query: contentConfigValues,
        filter: schemaFilter(arcSite),
      },
    })
  } */

  componentDidMount() {}

  render() {
    return (
      <h2 className="w-full mt-20 custom-title text-center col-3 custom-border large">
        SECCIONES
      </h2>
    )
  }
}

GridSectionColumns.propTypes = {
  customFields: PropTypes.shape({}),
}

GridSectionColumns.label = 'Grid de noticias por sección'

export default GridSectionColumns
