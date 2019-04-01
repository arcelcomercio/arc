/* eslint-disable no-shadow */
import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import customFields from './_children/customfields'
import filterSchema from './_children/filterschema'
import Data from './_children/data'
import { Triplete as TripleteChildren } from '../../../../resources/components/triplete'

const API_URL = 'story__by-websiteurl'
@Consumer
class Triplete extends Component {
  constructor(props) {
    super(props)
    this.state = { data1: {}, data2: {}, data3: {} }
    this.renderCount = 0
    this.exec()
  }

  exec() {
    const LINK = 'link'
    const KEY_STATE = 'data'
    const LINK_LENGTH = 3
    const { customFields, arcSite } = this.props
    for (let i = 1; i <= LINK_LENGTH; i++) {
      if (customFields[LINK + i]) {
        const { fetched } = this.getContent(
          API_URL,
          { website_url: customFields[LINK + i], website: arcSite },
          filterSchema(arcSite)
        )
        const obj = {}
        fetched.then(response => {
          obj[KEY_STATE + i] = response
          // TODO:- Improve set state for render just only times
          this.setState(obj)
        })
      }
    }
  }

  render() {
    const { customFields, editableField, arcSite } = this.props
    const data = new Data({}, arcSite, customFields)
    const allDataResponse = this.state
    const dataFormatted = Object.keys(allDataResponse).map((el, index) => {
      data.__data = allDataResponse[el]
      data.__index = index + 1
      return data.attributesRaw
    })
    const params = {
      data: dataFormatted,
      multimediaOrientation: customFields.multimediaOrientation,
      editableField,
    }
    return <TripleteChildren {...params} />
  }
}

Triplete.propTypes = {
  customFields,
}
export default Triplete
