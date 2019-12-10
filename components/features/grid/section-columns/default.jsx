import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Consumer from 'fusion:consumer'

import ChildrenSectionColumn from './_children/section-column'

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

  componentDidMount() {
    const {
      customFields: {
        storyConfig: { contentService = '', contentConfigValues = {} } = {},
      } = {},
    } = this.props
    this.fetchContent({
      data: {
        source: contentService,
        query: contentConfigValues,
        filter: `{ 
          children {
            name
            _id
          }
        }`,
        transform: data => {
          const { children = [] } = data || {}
          const { _id } = children[0] || {}
          this.fetchContent({
            storiesBySection1: {
              source: 'story-feed-by-section',
              query: {
                section: _id,
                stories_qty: 4,
              },
            },
          })
        },
      },
    })
  }

  render() {
    console.log('STATE->', this.state)
    return (
      <>
        <h2 className="w-full mt-20 custom-title text-center col-3 custom-border large">
          SECCIONES
        </h2>
        <ChildrenSectionColumn />
        <ChildrenSectionColumn />
        <ChildrenSectionColumn />
      </>
    )
  }
}

GridSectionColumns.propTypes = {
  customFields: PropTypes.shape({
    storyConfig: PropTypes.contentConfig('navigation').tag({
      name: 'Configuración del contenido',
    }),
  }),
}

GridSectionColumns.label = 'Grid de noticias por sección'

export default GridSectionColumns
