import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import customFields from './_children/customfields'
import filterSchema from '../_children/filterschema'
import Data from '../_children/data'
import AperturaExtraordinariaChildren from '../../../../resources/components/apertura-extraordinaria'

const API_URL = 'story__by-websiteurl'
@Consumer
class AperturaExtraordinariaStory extends Component {

  mainLogic = {
    fetch: (api, url, filter = {}) => {
      if (url) {
        const { fetched } = this.getContent(api, { website_url: url }, filter)
        return fetched
      }
      return new Promise((resolve, reject) => {
        resolve(null)
      })
    },

    dataState: (data = null) => {
      if (data === null) return { data: {} }
      return { data }
    },
  }

  constructor(props) {
    super(props)
    this.state = this.mainLogic.dataState()
    const {
      customFields: { link },
      arcSite,
    } = this.props
    this.mainLogic.fetch(API_URL, link, filterSchema(arcSite)).then(response => {
        this.setState(this.mainLogic.dataState(response))
        /* if(window !== undefined && window.powaBoot() !== undefined){
          window.powaBoot()
          console.log('7777')
        } */
        // window.powaBoot()
    })
  }

  componentDidMount() {
    // debugger
    /* if(!!window.powaBoot){
      console.log('powaBoot')
      window.powaBoot()
    } */
  }

  componentDidUpdate() {
    if(!!window.powaBoot){
      console.log('powaBoot update')
      window.powaBoot()
    }
  }

  render() {
    // eslint-disable-next-line no-shadow
    const { customFields, arcSite } = this.props
    const { data } = this.state
    console.log('data')
    console.dir(data)
    const formattedData = new Data(customFields, data, arcSite)
    const params = {
      data: formattedData,
      multimediaOrientation: formattedData.multimediaOrientation,
      contentOrientation: formattedData.contentOrientation,
    }

    return <AperturaExtraordinariaChildren {...params} />
  }
}

AperturaExtraordinariaStory.propTypes = {
  customFields,
}

export default AperturaExtraordinariaStory
