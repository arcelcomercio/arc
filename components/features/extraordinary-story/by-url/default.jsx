import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import customFieldsExtern from './_dependencies/custom-fields'
import schemaFilter from '../_dependencies/schema-filter'
import Data from '../_dependencies/data'
import ExtraordinaryStory from '../../../global-components/extraordinary-story'

const API_URL = 'story-by-url'
@Consumer
class ExtraordinaryStoryByUrl extends PureComponent {
  constructor(props) {
    super(props)
    // this.isVideo = ''

    const {
      customFields: { link = '' },
      arcSite,
    } = this.props
    this.fetchContent({
      data: {
        source: API_URL,
        query: { website_url: link },
        filter: schemaFilter(arcSite),
      },
    })
  }

  componentDidMount() {
    if (window.powaBoot) {
      window.powaBoot()
    }
  }

  render() {
    const { deployment, contextPath, arcSite, customFields } = this.props
    const { data = {} } = this.state || {}
    const formattedData = new Data({
      data,
      deployment,
      contextPath,
      arcSite,
      customFields,
      defaultImgSize: 'md',
    })
    // this.isVideo = formattedData.isVideo

    const params = {
      data: formattedData,
      multimediaType: formattedData.multimediaType,
      multimediaOrientation: formattedData.multimediaOrientation,
      contentOrientation: formattedData.contentOrientation,
      deployment,
      contextPath,
      arcSite,
    }
    return <ExtraordinaryStory {...params} />
  }
}

ExtraordinaryStoryByUrl.propTypes = {
  customFields: customFieldsExtern,
}

ExtraordinaryStoryByUrl.label = 'Apertura extraordinaria por historia'
ExtraordinaryStoryByUrl.static = true

export default ExtraordinaryStoryByUrl
