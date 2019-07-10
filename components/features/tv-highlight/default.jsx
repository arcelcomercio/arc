import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'

import TVHighlightChild from './_children/tv-highlight'
import StoryData from '../../utilities/story-data'

@Consumer
class TVHighlight extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      data: '',
    }
    this.fetch()
  }

  fetch() {
    const { customFields, deployment, contextPath, arcSite } = this.props
    const { section } = customFields
    const schema = `{ 
      headlines { basic }
      credits {
        by { name url type }
      }
      website_url
      promo_items {
        basic { url type resized_urls { small medium large} }
        basic_video {
          promo_items {
            basic { url type resized_urls { small medium large} }
          }
        }
        basic_gallery {
          promo_items {
            basic { url type resized_urls { small medium large} }
          }
        }
      }
      taxonomy {
        primary_section {
            name
            path
        }
      }
    }`
    const source = 'story-by-section'
    const params = {
      section,
      feedOffset: 0,
      stories_qty: 1,
    }
    const { fetched } = this.getContent(source, params, schema)
    fetched.then(story => {
      const get = new StoryData({
        data: story,
        deployment,
        contextPath,
        arcSite,
        defaultImgSize: 'lg',
      })
      const filterData = {
        category: {
          nameSection: get.section,
          urlSection: get.sectionLink,
        },
        title: {
          nameTitle: get.title,
          urlTitle: get.link,
        },
        multimedia: {
          multimediaType: get.multimediaType,
          multimediaImg: get.multimedia,
        },
        tags: get.tags,
      }
      this.setState({
        data: filterData,
      })
    })
  }

  render() {
    const { data: params } = this.state
    return <div>{params && <TVHighlightChild {...params} />}</div>
  }
}

TVHighlight.propTypes = {
  customFields: PropTypes.shape({
    section: PropTypes.string.tag({
      name: 'Path de la sección',
      description:
        'Si no se coloca el path de la sección, se renderiza la última historia publicada. Ejemplo: /deporte-total',
    }),
  }),
}

TVHighlight.label = 'Destaque TV'

export default TVHighlight
