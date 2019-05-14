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
    this.state = { data1: {}, data2: {}, data3: {} }
  }

  componentDidMount() {
    this.exec()
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
    const { customFields = {}, editableField, arcSite } = this.props
    const data = new Data({}, arcSite, customFields)
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
    return <Triplet {...params} />
  }
}

CardTriplet.label = 'Triplete'

CardTriplet.propTypes = {
  customFields: customFieldsConfig,
}

export default CardTriplet
