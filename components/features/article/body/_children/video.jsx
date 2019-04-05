// content/sources/content-api-v4.js
import React, { Component, Fragment } from 'react'
import Consumer from 'fusion:consumer'

import renderHTML from 'react-render-html'

@Consumer
class Video extends Component {
  componentDidMount() {
    window.powaBoot()
    // window.addEventListener('powaRender', function(event) {       console.warn(event)     })
    // window.addEventListener('powaError', function(event) {       console.error(event)     })
    window.PoWaSettings.advertising = {
      adBar: false,
      adTag: ({ powa, videoData }) => {
        console.log(videoData.additional_properties.advertising.playAds)
        console.log(this.getParametroPublicidad())
        return videoData.additional_properties.advertising.playAds === true
          ? this.getParametroPublicidad()
          : ''
      },
    }
  }

  getParametroPublicidad = () => {
    const {
      siteProperties: { urlPreroll },
      globalContent,
    } = this.props

    const {
      taxonomy: {
        primary_section: {
          additional_properties: {
            original: {
              _admin: { alias_ids: aliasId },
            },
          },
        },
      },
    } = globalContent || {}

    if (aliasId && aliasId[0]) {
      return aliasId[0]
    }
    return urlPreroll
  }

  render() {
    const { data: data = {} } = this.props

    return <Fragment>{data && renderHTML(data)}</Fragment>
  }
}
export default Video
