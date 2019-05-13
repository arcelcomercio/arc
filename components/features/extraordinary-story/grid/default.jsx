import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import customFieldsExtern from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import Data from '../_dependencies/data'
import ExtraordinaryStory from '../../../global-components/extraordinary-story'
import EmbedMultimedia from '../../../global-components/embed-multimedia'

const API_URL = 'story-feed-by-section'
const API_SIZE_DATA = 1
@Consumer
class ExtraordinaryStoryGrid extends Component {
  constructor(props) {
    super(props)
    this.state = { data: {} }
    this.isVideo = false
  }

  componentDidMount() {
    const {
      globalContent,
      customFields: { sectionName },
    } = this.props
    const { section_name: hasSection } = globalContent || {}

    if (hasSection && (sectionName === '/' || sectionName === '')) {
      this.setState({ data: globalContent || {} })
    } else this.fetch()
  }

  componentDidUpdate() {
    if (window.powaBoot && this.isVideo) {
      window.powaBoot()
    }
  }

  fetch() {
    const {
      arcSite,
      customFields: { sectionName, positionData },
    } = this.props
    const { fetched } = this.getContent(
      API_URL,
      {
        section: sectionName,
        feedOffset: positionData || 0,
        news_number: API_SIZE_DATA,
      },
      schemaFilter(arcSite)
    )
    fetched.then(response => {
      this.setState({ data: response || {} })
    })
  }

  render() {
    const { customFields, arcSite } = this.props
    const {
      data: { content_elements: contentElements = [] },
    } = this.state
    const dataElement =
      contentElements && contentElements.length > 0 ? contentElements[0] : {}
    const formattedData = new Data(customFields, dataElement, arcSite)
    this.isVideo = formattedData.isVideo
    const params = {
      data: formattedData,
      multimediaOrientation: formattedData.multimediaOrientation,
      contentOrientation: formattedData.contentOrientation,
      arcSite,
    }
    // return <ExtraordinaryStory {...params} />
    return (
      <EmbedMultimedia
        type="image"
        source="http://resizer.shared.arcpublishing.com/NHM-72hdnyWwaCgLPbm23WBaXJA=/500x400/smart/arc-anglerfish-arc2-sandbox-sandbox-elcomercio.s3.amazonaws.com/public/LH2OSHSE2RG3LCPS5HBSALKC3U.jpeg"
      />
    )
  }
}

ExtraordinaryStoryGrid.propTypes = {
  customFields: customFieldsExtern,
}

ExtraordinaryStoryGrid.label = 'Apertura extraordinaria con grilla'

export default ExtraordinaryStoryGrid
