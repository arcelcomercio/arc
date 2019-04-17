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
    this.state = { data1: {}, data2: {}, data3: {} }
    this.auxData = { data1: {}, data2: {}, data3: {} }
    this.renderCount = 0
  }

  componentDidMount() {
    this.exec()
  }

  setAuxData(response, i, length) {
    const KEY_STATE = 'data'
    this.auxData[KEY_STATE + i] = response || {}
    if (i === length) this.setState(this.auxData)
  }

  exec() {
    const LINK = 'link'
    const LINK_LENGTH = 3
    const { customFields = {}, arcSite } = this.props

    for (let i = 1; i <= LINK_LENGTH; i++) {
      if (customFields[LINK + i]) {
        const { fetched } = this.getContent(
          API_URL,
          { website_url: customFields[LINK + i], website: arcSite },
          filterSchema(arcSite)
        )
        fetched.then(response => this.setAuxData(response, i, LINK_LENGTH))
      }
    }
  }

  render() {
    const {
      customFields = {},
      editableField,
      arcSite,
    } = this.props
    const data = new Data({}, arcSite, customFields)
    const allDataResponse = this.state
    const dataFormatted = Object.keys(allDataResponse).map((el, index) => {
      data.__data = allDataResponse[el]
      data.__index = index + 1
      return data.attributesRaw
    })
    const { numLineTitle} = customFields
    const params = {
      data: dataFormatted,
      numLineTitle,
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
