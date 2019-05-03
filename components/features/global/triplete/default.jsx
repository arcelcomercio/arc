import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import customFieldsConfig from './_children/customfields'
import filterSchema from './_children/filterschema'
import Data from './_children/data'
import { Triplete as TripleteChildren } from '../../../../resources/components/triplete'

const API_URL = 'story-by-url'
@Consumer
class Triplete extends Component {
  constructor(props) {
    super(props)
    this.DATA_KEY = 'data'
    this.DATA_LENGTH = 3
    this.dataCounter = 0
    this.auxData = { data1: {}, data2: {}, data3: {} }
    this.state = { data1: {}, data2: {}, data3: {} }
  }

  componentDidMount() {
    this.exec()
  }

  setAuxData(data, i) {
    this.auxData[this.DATA_KEY + i] = data || {}
    this.dataCounter += 1
    if (this.dataCounter === this.DATA_LENGTH) this.setState(this.auxData)
  }

  exec() {
    const { customFields = {}, arcSite } = this.props

    for (let i = 1; i <= this.DATA_LENGTH; i++) {
      if (customFields[this.DATA_KEY + i]) {
        const { fetched } = this.getContent(
          API_URL,
          { website_url: customFields[this.DATA_KEY + i], website: arcSite },
          filterSchema(arcSite)
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
    return <TripleteChildren {...params} />
  }
}

Triplete.propTypes = {
  customFields: customFieldsConfig,
}

export default Triplete
