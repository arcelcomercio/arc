// content/sources/content-api-v4.js
import { PureComponent } from 'react'
import renderHTML from 'react-render-html'
import Consumer from 'fusion:consumer'

@Consumer
class StoryContentChildVideo extends PureComponent {
  componentDidMount() {
    window.powaBoot()

    window.PoWaSettings.advertising = {
      adBar: false,
      adTag: ({ videoData }) => {
        return videoData.additional_properties.advertising.playAds === true
          ? this.getParametroPublicidad()
          : ''
      },
    }

    window.addEventListener('powaReady', ({ detail: { element } }) => {
      element.setAttribute('data-sticky', 'true')
    })
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
            original: { _admin: { alias_ids: aliasId = [] } = {} },
          } = {},
        } = {},
      },
    } = globalContent || {}

    if (aliasId && aliasId[0]) {
      return aliasId[0]
    }
    return urlPreroll
  }

  render() {
    const { data = {} } = this.props
    return data && renderHTML(data)
  }
}
export default StoryContentChildVideo
