// content/sources/content-api-v4.js
import { PureComponent } from 'react'
import renderHTML from 'react-render-html'
import Consumer from 'fusion:consumer'

@Consumer
class ArticleBodyChildVideo extends PureComponent {
  componentDidMount() {
    window.powaBoot()
    // window.addEventListener('powaRender', function(event) {       console.warn(event)     })
    // window.addEventListener('powaError', function(event) {       console.error(event)     })
    window.PoWaSettings.advertising = {
      adBar: false,
      adTag: ({ /**  powa, */ videoData }) => {
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
    const { data = {} } = this.props
    return data && renderHTML(data)
  }
}
export default ArticleBodyChildVideo
