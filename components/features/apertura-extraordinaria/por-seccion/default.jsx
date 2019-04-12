import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import customFieldsExtern from './_children/customfields'
import filterSchema from './_children/filterschema'
import Data from '../_children/data'
import AperturaExtraordinariaChildren from '../../../../resources/components/apertura-extraordinaria'

const API_URL = 'story-feed-by-section'
const API_SIZE_DATA = 1
@Consumer
class AperturaExtraordinariaSection extends Component {
  constructor(props) {
    super(props)
    this.state = { data: {} }
    this.isVideo = false
    this.fetch()
  }

  componentDidUpdate() {
    if(window.powaBoot && this.isVideo){
      window.powaBoot()
    }
  }

  fetch() {
    const {
      customFields: { sectionName, positionData },
      arcSite,
    } = this.props
    // if (sectionName) {
      const { fetched } = this.getContent(
        API_URL,
        {
          section: sectionName,
          feedOffset: positionData || 0,
          news_number: API_SIZE_DATA,
        },
        filterSchema(arcSite)
      )
      fetched.then(response => {
        this.setState({ data: response || {} })
      })
    // }
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
    }
    return <AperturaExtraordinariaChildren {...params} />
  }
}

AperturaExtraordinariaSection.propTypes = {
  customFields: customFieldsExtern,
}

AperturaExtraordinariaSection.label = 'Apertura extraordinaria por sección'

export default AperturaExtraordinariaSection
