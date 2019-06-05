import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import customFieldsConfig from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import Data from './_dependencies/data'
import { TripletChildTriplet as Triplet } from './_children/triplet'

const API_URL = 'story-by-url'

@Consumer
class CardTriplet extends PureComponent {
  constructor(props) {
    super(props)
    this.dataCounter = 0
    this.auxData = { data1: {}, data2: {}, data3: {} }
    this.getFieldsStories()
  }

  getFieldsStories() {
    const { customFields: { data1, data2, data3 } = {}, arcSite } = this.props

    const fetchDataModel = data => {
      return {
        source: API_URL,
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

  render() {
    const {
      deployment,
      contextPath,
      arcSite,
      editableField,
      customFields = {},
    } = this.props
    const data = new Data({
      deployment,
      contextPath,
      arcSite,
      customFields,
      defaultImgSize: 'sm',
    })

    const getInstanceSnap = (el, index) => {
      data.__data = el
      data.__index = index
      return data.attributesRaw
    }

    const { data1 = {}, data2 = {}, data3 = {} } = this.state || {}

    const dataFormatted = [
      getInstanceSnap(data1, 1),
      getInstanceSnap(data2, 2),
      getInstanceSnap(data3, 3),
    ]
    const params = {
      data: dataFormatted,
      arcSite,
      multimediaOrientation: customFields.multimediaOrientation,
      editableField,
    }
    return <Triplet {...params} />
  }
}

CardTriplet.label = 'Triplete'

CardTriplet.propTypes = {
  customFields: customFieldsConfig,
}

export default CardTriplet
