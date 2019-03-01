/* eslint-disable no-shadow */
import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import { customFields } from './_children/customfields'
// import Api from './_children/api'
import { filterSchema } from './_children/filterschema'
import TripleteChildren from './_children/triplete'

@Consumer
class Triplete extends Component {
  constructor(props) {
    super(props)
    this.state = { data1: {}, data2: {}, data3: {} }
    // this.api = new Api(this.props, this.getContent)
    // console.log('this.api.state', this.api.state)
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
          'get-story-by-websiteurl',
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
    console.log('render triplete manual', ++this.renderCount)
    // console.dir(this.state)
    const { customFields, editableField, arcSite } = this.props
    const website = arcSite
    const params = {
      customFields,
      state: this.state,
      editableField,
      website,
    }
    return <TripleteChildren {...params} />
  }
}

Triplete.propTypes = {
  customFields,
}
export default Triplete
