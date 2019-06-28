import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'
import customFieldsExtern from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import Data from '../_dependencies/data'
import ExtraordinaryStory from '../../../global-components/extraordinary-story'

const API_URL = 'story-feed-by-section'
const API_SIZE_DATA = 1
@Consumer
class ExtraordinaryStoryBySection extends PureComponent {
  constructor(props) {
    super(props)

    // this.isVideo = false

    const {
      arcSite,
      customFields: { sectionName, positionData },
    } = this.props
    this.fetchContent({
      data: {
        source: API_URL,
        query: {
          section: sectionName,
          feedOffset: positionData || 0,
          stories_qty: API_SIZE_DATA,
        },
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
    const { data: { content_elements: contentElements = [] } = {} } = this.state
    console.log(contentElements)
    const data =
      contentElements && contentElements.length > 0 ? contentElements[0] : {}
    const formattedData = new Data({
      data,
      deployment,
      contextPath,
      arcSite,
      customFields,
      defaultImgSize: 'md',
    })
    console.log('before Formatter: ', data)
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
    console.log('Formatter: ', data)
    return <ExtraordinaryStory {...params} />
  }
}

ExtraordinaryStoryBySection.propTypes = {
  customFields: customFieldsExtern,
}

ExtraordinaryStoryBySection.label = 'Apertura extraordinaria por sección'

export default ExtraordinaryStoryBySection
