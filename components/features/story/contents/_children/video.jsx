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

  getSectionSlug = (sectionId = '') => {
    return sectionId.split('/')[1] || ''
  }

  getParametroPublicidad = () => {
    const {
      siteProperties: { urlPreroll },
      globalContent,
      arcSite, 
      metaValue,
    } = this.props
    
    const {
      taxonomy: {
        primary_section: {
          path: primarySection,
          additional_properties: {
            original: { _admin: { alias_ids: aliasId = [] } = {} },
          } = {},
        } = {},
      },
    } = globalContent || {}
    if (aliasId && aliasId[0]) {
      return aliasId[0]
    }
    
    if(arcSite === 'publimetro' ||arcSite === 'depor'){

      let tipoplantilla = ''
      switch (metaValue('id')) {
        case 'meta_section':
          tipoplantilla = 'sect'
          break;
        case 'meta_story':
          tipoplantilla ='post'
          break;
        default:
          tipoplantilla ='post'
          break
      }

      let sectionSlug = this.getSectionSlug(primarySection)
      if(arcSite === 'publimetro' )
      {
        return `https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/${arcSite}_post_${sectionSlug}_web_preroll&description_url=https%3A%2F%2F${arcSite}.pe%2F&tfcd=0&npa=0&sz=640x360&cust_params=fuente%3Dweb%26publisher%3D${arcSite}%26seccion%3D${sectionSlug}%26tipoplantilla%3D${tipoplantilla}&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=`;
      }
      else
       { 
         return `https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/${arcSite}/web/post/${sectionSlug.split('-').join('')}/preroll&description_url=https%3A%2F%2F${arcSite}.pe%2F&tfcd=0&npa=0&sz=640x360&cust_params=fuente%3Dweb%26publisher%3D${arcSite}%26seccion%3D${sectionSlug.split('-').join('')}%26tipoplantilla%3D${tipoplantilla}&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=`;}
      
    }else{
      return urlPreroll
    }

    
  }

  render() {
    const { data = {}, description = '' } = this.props
    const urlVideo = data
      .replace(
        /https:\/\/elcomercio.pe(\/uploads\/(.*)\/(.*)\/(.*)\/(.*)(jpeg|jpg|png|gif|mp4|mp3))/g,
        'https://img.elcomercio.pe$1'
      )
      .replace(
        /https:\/\/trome.pe(\/uploads\/(.*)\/(.*)\/(.*)\/(.*)(jpeg|jpg|png|gif|mp4|mp3))/g,
        'https://img.trome.pe$1'
      )
    return (
      <>
        {urlVideo && renderHTML(urlVideo.replace('[goldfish_publicidad]', ''))}
        <figcaption className={classes.caption}>{description} </figcaption>
      </>
    )
  }
}
export default StoryContentChildVideo
