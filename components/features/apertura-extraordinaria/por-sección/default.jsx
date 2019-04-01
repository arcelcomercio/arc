import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import customFields from './_children/customfields'
import filterSchema from './_children/filterschema'
import Data from '../_children/data'
import AperturaExtraordinariaChildren from '../../../../resources/components/apertura-extraordinaria'

const API_URL = 'historias-por-seccion'
const API_SIZE_DATA = 1
@Consumer
class AperturaExtraordinariaSection extends Component {
  constructor(props) {
    super(props)
    this.state = { data: {} }
    this.fetch()
  }

  fetch() {
    const {
      customFields: { sectionName, positionData },
      arcSite,
    } = this.props
    if (sectionName) {
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
        this.setState({ data: response })
      })
    }
  }

  render() {
    // eslint-disable-next-line no-shadow
    const { customFields, arcSite } = this.props
    const {
      data: { content_elements: contentElements },
    } = this.state
    const dataElement =
      contentElements && contentElements.length > 0 ? contentElements[0] : {}
    const formattedData = new Data(customFields, dataElement, arcSite)
    const params = {
      data: formattedData,
      multimediaOrientation: formattedData.multimediaOrientation,
      contentOrientation: formattedData.contentOrientation,
    }
    return <AperturaExtraordinariaChildren {...params} />
  }
}

AperturaExtraordinariaSection.propTypes = {
  customFields,
}

export default AperturaExtraordinariaSection
