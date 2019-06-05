import React, { PureComponent } from 'react'
import Consumer from 'fusion:consumer'

import customFieldsConfig from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'
import Data from './_dependencies/data'
import { TripletChildTriplet as Triplet } from './_children/triplet'

const API_URL = 'story-by-url'
const DATA_KEY = 'data'
const DATA_LENGTH = 3

@Consumer
class CardTriplet extends PureComponent {
  constructor(props) {
    super(props)
    this.dataCounter = 0
    this.auxData = { data1: {}, data2: {}, data3: {} }
    this.getFieldsStories()
  }

  componentDidMount() {
    // this.exec()
  }

  getFieldsStories() {
    const { customFields: { data1, data2, data3 } = {} } = this.props

    const fetchData = {}

    if (data1)
      fetchData.data1 = { source: API_URL, query: { website_url: data1 } }
    if (data2)
      fetchData.data2 = { source: API_URL, query: { website_url: data2 } }
    if (data3)
      fetchData.data3 = { source: API_URL, query: { website_url: data3 } }
    console.log(fetchData)
    if (fetchData !== {}) this.fetchContent(fetchData)
  }

  setAuxData(data, i) {
    this.auxData[DATA_KEY + i] = data || {}
    this.dataCounter += 1
    if (this.dataCounter === DATA_LENGTH) this.setState(this.auxData)
  }

  exec() {
    const { customFields = {}, arcSite } = this.props

    for (let i = 1; i <= DATA_LENGTH; i++) {
      if (customFields[DATA_KEY + i]) {
        const { fetched } = this.getContent(
          API_URL,
          { website_url: customFields[DATA_KEY + i], website: arcSite },
          schemaFilter(arcSite)
        )
        fetched.then(response => this.setAuxData(response, i))
      } else this.setAuxData({}, i)
    }
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
    const allDataResponse = this.state
    const dataFormatted = Object.keys(allDataResponse).map((el, index) => {
      data.__data = allDataResponse[el]
      data.__index = index + 1
      return data.attributesRaw
    })

    const params = {
      data: dataFormatted,
      arcSite,
      multimediaOrientation: customFields.multimediaOrientation,
      editableField,
    }
    console.log(this.state, 'asdasdasdasdasd')
    return <Triplet {...params} />
  }
}

CardTriplet.label = 'Triplete'

CardTriplet.propTypes = {
  customFields: customFieldsConfig,
}

export default CardTriplet
