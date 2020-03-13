import React from 'react'
import { useFusionContext } from 'fusion:context'
import { getResizedUrl } from '../../../../utilities/resizer'
import { getAssetsPathVideo } from '../../../../utilities/assets'

const classes = {
  caption: 'story-content__caption pt-10 secondary-font text-md',
}

const StoryContentChildVideo = props => {
  const {
    siteProperties: { urlPreroll },
    globalContent,
    arcSite,
    metaValue,
  } = useFusionContext()

  const {
    promo_items: {
      basic_video: {
        _id: idPrincial,
        additional_properties: video = {},
        promo_items: { basic: { url: urlImage = '' } = {} } = {},
        streams = [],
      } = {},
    } = {},
  } = globalContent || {}

  const videoData = video || ''
  const {
    _id: id,
    data = {},
    htmlContent = false,
    description = '',
    promo_items: { basic: { url: urlImageContent = '' } = {} } = {},
    streams: streamsContent = [],
    url: imagenMigrate = '',
    contentElemtent = false,
    reziserVideo = true,
  } = props
  const imageUrl = contentElemtent ? urlImageContent : urlImage
  const { large } =
    getResizedUrl({
      url: imageUrl || imagenMigrate,
      presets: 'large:680x400',
      arcSite,
    }) || {}

  const urlVideo = data

    .replace(
      /https:\/\/elcomercio.pe(\/uploads\/(.*)\/(.*)\/(.*)\/(.*)(jpeg|jpg|png|gif|mp4|mp3))/g,
      'https://img.elcomercio.pe$1'
    )
    .replace(
      /https:\/\/trome.pe(\/uploads\/(.*)\/(.*)\/(.*)\/(.*)(jpeg|jpg|png|gif|mp4|mp3))/g,
      'https://img.trome.pe$1'
    )
    .replace(
      /https:\/\/gestion.pe(\/uploads\/(.*)\/(.*)\/(.*)\/(.*)(jpeg|jpg|png|gif|mp4|mp3))/g,
      'https://img.gestion.pe$1'
    )

  const getResultVideo = streamss => {
    const resultVideo = streamss
      .map(({ url = '', stream_type: streamType = '' }) => {
        return streamType === 'ts' ? url : []
      })
      .filter(String)
    const cantidadVideo = resultVideo.length

    return arcSite !== 'elcomercio'
      ? getAssetsPathVideo(arcSite, resultVideo[cantidadVideo - 1])
      : resultVideo[cantidadVideo - 1]
  }

  const videoUrlContent =
    contentElemtent && streamsContent[1] ? getResultVideo(streamsContent) : ''

  const videoUrlPrincipal = streams[1] ? getResultVideo(streams) : ''

  const getSectionSlug = (sectionId = '') => {
    return sectionId.split('/')[1] || ''
  }

  const getParametroPublicidad = () => {
    const {
      taxonomy: {
        primary_section: {
          path: primarySection,
          additional_properties: {
            original: { _admin: { alias_ids: aliasId = [] } = {} } = {},
          } = {},
        } = {},
      } = {},
    } = globalContent || {}
    if (aliasId && aliasId[0]) {
      return aliasId[0]
    }

    if (
      arcSite === 'publimetro' ||
      arcSite === 'depor' ||
      arcSite === 'elcomercio' ||
      arcSite === 'elcomerciomag' ||
      arcSite === 'peru21' ||
      arcSite === 'gestion' ||
      arcSite === 'peru21g21' ||
      arcSite === 'diariocorreo' ||
      arcSite === 'ojo' ||
      arcSite === 'elbocon' ||
      arcSite === 'trome'
    ) {
      const arcSiteNew = arcSite === 'peru21g21' ? 'peru21' : arcSite

      let webSite = ''
      switch (arcSite) {
        case 'publimetro':
          webSite = 'publimetro.pe'
          break
        case 'depor':
          webSite = 'depor.com'
          break
        case 'elcomercio':
          webSite = 'elcomercio.pe'
          break
        case 'elcomerciomag':
          webSite = 'mag.elcomercio.pe'
          break
        case 'peru21':
          webSite = 'peru21.pe'
          break
        case 'gestion':
          webSite = 'gestion.pe'
          break
        case 'peru21g21':
          webSite = 'peru21.pe'
          break
        case 'diariocorreo':
          webSite = 'diariocorreo.pe'
          break
        case 'ojo':
          webSite = 'ojo.pe'
          break
        case 'elbocon':
          webSite = 'elbocon.pe'
          break
        case 'trome':
          webSite = 'trome.pe'
          break
        default:
          webSite = ''
          break
      }

      let tipoplantilla = ''
      switch (metaValue('id')) {
        case 'meta_section':
          tipoplantilla = 'sect'
          break
        case 'meta_story':
          tipoplantilla = 'post'
          break
        default:
          tipoplantilla = 'post'
          break
      }

      const sectionSlug = getSectionSlug(primarySection)

      return `https://pubads.g.doubleclick.net/gampad/ads?iu=/28253241/${arcSiteNew}/web/post/${sectionSlug
        .split('-')
        .join(
          ''
        )}/preroll&description_url=https%3A%2F%2F${webSite}%2F&tfcd=0&npa=0&sz=640x360&cust_params=fuente%3Dweb%26publisher%3D${arcSiteNew}%26seccion%3D${sectionSlug
        .split('-')
        .join(
          ''
        )}%26tipoplantilla%3D${tipoplantilla}&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=`
    }
    return urlPreroll
  }
  const ids = id || idPrincial

  const uidArray = urlVideo.match(
    /data-uuid="(([0-9a-z-A-Z]*[0-9a-z-A-Z])\w+)"/
  )
  const videoArray = urlVideo.match(
    /stream="((.*).(jpeg|jpg|png|gif|mp4|mp3))"/
  )

  return (
    <>
      <div
        className="lazyload-video"
        data-uuid={ids || (uidArray && uidArray[1])}
        data-reziser={reziserVideo}
        data-api="prod"
        data-streams={
          videoUrlContent || videoUrlPrincipal || (videoArray && videoArray[1])
        }
        data-preroll={
          videoData.advertising && videoData.advertising.playAds === true
            ? getParametroPublicidad()
            : ''
        }
        data-poster={large}></div>
      <figcaption className={classes.caption}>{description} </figcaption>
    </>
  )
}

export default StoryContentChildVideo
