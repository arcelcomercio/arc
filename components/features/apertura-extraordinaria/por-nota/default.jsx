import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import customFieldsExtern from './_children/customfields'
import filterSchema from '../_children/filterschema'
import Data from '../_children/data'
import AperturaExtraordinariaChildren from '../../../../resources/components/apertura-extraordinaria'

const API_URL = 'story-by-url'
@Consumer
class AperturaExtraordinariaStory extends Component {
  mainLogic = {
    fetch: (api, url, filter = {}) => {
      if (url) {
        const { fetched } = this.getContent(api, { website_url: url }, filter)
        return fetched
      }
      return new Promise((resolve, reject) => {
        reject(new Error('Url empty'))
      })
    },

    dataState: (data = null) => {
      return data === null ? { data: {} } : { data }
    },
  }

  constructor(props) {
    super(props)
    this.state = this.mainLogic.dataState()
    this.isVideo = ''
  }

  componentDidMount() {
    const {
      customFields: { link },
      arcSite,
    } = this.props

    this.mainLogic
      .fetch(API_URL, link, filterSchema(arcSite))
      .then(response => {
        console.log(response)
        this.setState(this.mainLogic.dataState(response))
      })
      .catch(() => false)
  }

  componentDidUpdate() {
    if (window.powaBoot && this.isVideo) {
      window.powaBoot()
    }
  }

  render() {
    const { customFields, arcSite } = this.props
    const { data } = this.state
    const formattedData = new Data(customFields, data, arcSite)
    this.isVideo = formattedData.isVideo
    const params = {
      data: formattedData,
      multimediaType: formattedData.multimediaType,
      multimediaOrientation: formattedData.multimediaOrientation,
      contentOrientation: formattedData.contentOrientation,
    }

    return <AperturaExtraordinariaChildren {...params} />
  }
}

AperturaExtraordinariaStory.propTypes = {
  customFields: customFieldsExtern,
}

export default AperturaExtraordinariaStory
