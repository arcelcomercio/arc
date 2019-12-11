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
      arcSite,
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
            content_elements {
              headlines { basic }
              websites { ${arcSite} { website_url } }
              promo_items {
                basic { type resized_urls { 314x157 } }
                basic_video {
                  promo_items {
                    basic { type resized_urls { 314x157 } }
                  }
                }
                basic_gallery {
                  promo_items {
                    basic { type resized_urls { 314x157 } }
                  }
                }
                youtube_id { content }
              }
              credits { by { type name url } }
            }  
          }
        }`,
        transform: resp => {
          const { children = [] } = resp || {}
          return children.map(
            ({
              name: sectionName,
              _id: sectionUrl,
              content_elements: contentElements = [],
            }) => ({
              sectionName,
              sectionUrl,
              contentElements: contentElements.map(
                ({
                  headlines: { basic } = {},
                  websites: {
                    [arcSite]: { website_url: websiteUrl } = {},
                  } = {},
                }) => ({
                  title: basic,
                  storyUrl: websiteUrl,
                })
              ),
            })
          )
        },
      },
    })
  }

  render() {
    console.log('STATE->', this.state)
    const { data: { children = [] } = {} } = this.state || {}
    const { isAdmin } = this.props
    return (
      <>
        <h2 className="w-full mt-20 custom-title text-center col-3 custom-border large">
          SECCIONES
        </h2>
        {children.map(
          ({
            name: sectionName,
            _id: sectionUrl,
            content_elements: contentElements = [],
          } = {}) => (
            <ChildrenSectionColumn
              {...{ sectionName, sectionUrl, contentElements, isAdmin }}
            />
          )
        )}
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
