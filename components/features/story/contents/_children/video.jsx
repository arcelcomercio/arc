// content/sources/content-api-v4.js
import React, { PureComponent } from 'react'
import renderHTML from 'react-render-html'
import Consumer from 'fusion:consumer'

const classes = {
  caption: 'story-content__caption pt-10 secondary-font text-md',
}

@Consumer
class StoryContentChildVideo extends PureComponent {
  constructor(props) {
    super(props)
    this.videoData = ''
    const {
      globalContent: {
        promo_items: {
          basic_video: { additional_properties: video = {} } = {},
        } = {},
      } = {},
    } = this.props
    this.videoData = video
  }

  componentDidMount() {
    if (window.powaBoot) {
      window.powaBoot()
    }

    if (window.PoWaSettings) {
      window.preroll = this.getParametroPublicidad()
      window.PoWaSettings.advertising = {
        adBar: false,
        adTag: () => {
          return this.videoData.advertising &&
            this.videoData.advertising.playAds === true
            ? this.getParametroPublicidad()
            : ''
        },
      }
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
    const { data = {}, description = '' } = this.props
    const urlVideo = data.replace(
      /https:\/\/elcomercio.pe(\/uploads\/(.*)\/(.*)\/(.*)\/(.*)(jpeg|jpg|png|gif|mp4|mp3))/g,
      'https://img.elcomercio.pe$1'
    ).replace(
      /https:\/\/trome.pe(\/uploads\/(.*)\/(.*)\/(.*)\/(.*)(jpeg|jpg|png|gif|mp4|mp3))/g,
      'https://img.trome.pe$1'.
    return (
      <>
        {urlVideo && renderHTML(urlVideo.replace('[goldfish_publicidad]', ''))}
        <figcaption className={classes.caption}>{description} </figcaption>
      </>
    )
  }
}
export default StoryContentChildVideo
