import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import { customFields } from './_children/customfields'
import { filterSchema } from './_children/filterschema'
import AperturaExtraordinariaChildren from './_children/apertura-extraordinaria'

const API_URL = 'story__by-websiteurl'
@Consumer
class AperturaExtraordinaria extends Component {
  constructor(props) {
    super(props)
    this.state = { data: {} }
    this.renderCount = 0
    this.fetch()
  }

  fetch() {
    const {
      customFields: { link },
      arcSite,
    } = this.props
    if (link) {
      const { fetched } = this.getContent(
        API_URL,
        {
          website_url: link,
          website: arcSite,
        },
        filterSchema(arcSite)
      )
      fetched.then(response => {
        this.setState({ data: response })
      })
    }
  }

  render() {
    console.log('apertura extraordinaria render', this.renderCount + 1)
    // console.dir(this.state)
    // eslint-disable-next-line no-shadow
    const { customFields, editableField, arcSite } = this.props
    const { data } = this.state
    const website = arcSite
    const params = {
      customFields,
      data,
      editableField,
      website,
    }
    return <AperturaExtraordinariaChildren {...params} />
  }
}

AperturaExtraordinaria.propTypes = {
  customFields,
}

export default AperturaExtraordinaria
