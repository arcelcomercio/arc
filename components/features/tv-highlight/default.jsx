import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import PropTypes from 'prop-types'

import schemaFilter from './_dependencies/schema-filter'
import TVHighlightChild from './_children/tv-highlight'
import StoryData from '../../utilities/story-data'

const CONTENT_SOURCE = 'story-by-section'

@Consumer
class TVHighlight extends PureComponent {
  constructor(props) {
    super(props)
    const { customFields: { section } = {} } = props

    this.fetchContent({
      data: {
        source: CONTENT_SOURCE,
        query: {
          section,
          feedOffset: 0,
          stories_qty: 1,
        },
        filter: schemaFilter,
        transform: data => this.filterData(data),
      },
    })
  }

  filterData = data => {
    const { deployment, contextPath, arcSite } = this.props
    const storyData = new StoryData({
      data,
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'lg',
    })
    return {
      category: {
        nameSection: storyData.primarySection,
        urlSection: storyData.primarySectionLink,
      },
      title: {
        nameTitle: storyData.title,
        urlTitle: storyData.link,
      },
      multimedia: {
        multimediaType: storyData.multimediaType,
        multimediaImg: storyData.multimediaLandscapeXL,
      },
      tags: storyData.tags,
      multimediaSubtitle: storyData.multimediaSubtitle,
      multimediaCaption: storyData.multimediaCaption,
    }
  }

  render() {
    const { data = {} } = this.state
    return data && <TVHighlightChild {...data} />
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
TVHighlight.static = true

export default TVHighlight
