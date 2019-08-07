import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import Data from './_dependencies/data'
import TripletChildTriplet from './_children/triplet'

const API_STORY_BY_URL = 'story-by-url'
const API_FEED_BY_COLLECTION = 'story-feed-by-collection'

@Consumer
class CardTriplet extends PureComponent {
  constructor(props) {
    super(props)
    const { customFields: { webskedId } = {} } = props || {}
    this.initDataInstance()
    if (webskedId) this.getWebskedStories()
    else this.getFieldsStories()
  }

  getFieldsStories() {
    const { customFields: { data1, data2, data3 } = {}, arcSite } =
      this.props || {}

    const fetchDataModel = data => {
      return {
        source: API_STORY_BY_URL,
        query: { website_url: data },
        filter: schemaFilter(arcSite),
      }
    }
    const fetchData = {}

    if (data1) fetchData.data1 = fetchDataModel(data1)
    if (data2) fetchData.data2 = fetchDataModel(data2)
    if (data3) fetchData.data3 = fetchDataModel(data3)
    if (fetchData !== {}) this.fetchContent(fetchData)
  }

  getWebskedStories() {
    const { customFields: { webskedId } = {}, arcSite } = this.props || {}
    this.fetchContent({
      webskedData: {
        source: API_FEED_BY_COLLECTION,
        query: { id: webskedId },
        filter: `
          content_elements ${schemaFilter(arcSite)}
        `,
      },
    })
  }

  getInstanceSnap(el, index) {
    this.data.__data = el
    this.data.__index = index
    // TODO: Este feature no debería usar attributesRaw, consume muchos recursos
    return this.data.attributesRaw
  }

  getFormatFieldsStories() {
    const { data1 = {}, data2 = {}, data3 = {} } = this.state || {}
    return this.getFormatedData(data1, data2, data3)
  }

  getFormatWebskedStories() {
    const { webskedData: { content_elements: contentElements = [] } = {} } =
      this.state || {}
    const data1 = contentElements[0] || {}
    const data2 = contentElements[1] || {}
    const data3 = contentElements[2] || {}
    return this.getFormatedData(data1, data2, data3)
  }

  getFormatedData(data1, data2, data3) {
    return [
      this.getInstanceSnap(data1, 1),
      this.getInstanceSnap(data2, 2),
      this.getInstanceSnap(data3, 3),
    ]
  }

  initDataInstance() {
    const {
      deployment,
      contextPath,
      arcSite,
      customFields: custom = {},
    } = this.props
    this.data = new Data({
      deployment,
      contextPath,
      arcSite,
      customFields: custom,
      defaultImgSize: 'sm',
    })
  }

  render() {
    const {
      arcSite,
      editableField,
      isAdmin,
      customFields: { webskedId, multimediaOrientation } = {},
    } = this.props

    const dataFormatted = webskedId
      ? this.getFormatWebskedStories()
      : this.getFormatFieldsStories()
    const params = {
      arcSite,
      editableField,
      isAdmin,
      data: dataFormatted,
      multimediaOrientation,
    }
    return <TripletChildTriplet {...params} />
  }
}

CardTriplet.label = 'Triplete'
CardTriplet.static = true

CardTriplet.propTypes = {
  customFields,
}

export default CardTriplet
