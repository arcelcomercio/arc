import React from 'react'
import ENV from 'fusion:environment'
import { useFusionContext } from 'fusion:context'
import { msToTime } from '../../../../utilities/date-time/time'
// import { getResultVideo } from '../../../../utilities/story/helpers'

/**
 *
 * TODO:TEMP: Cambio temporal, cuando se indique, activar nuevamente el
 * getResultVideo que viene de story/helpers y borrar este.
 */
const getResultVideo = (streams, arcSite, type = 'ts') => {
  const resultVideo = streams
    .map(({ url = '', stream_type: streamType = '' }) => {
      return streamType === type ? url : []
    })
    .filter(String)
  const cantidadVideo = resultVideo.length

  return resultVideo[cantidadVideo - 1]
}

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
        duration: durationOne = '',
        _id: idPrincial,
        additional_properties: video = {},
        //        promo_items: { basic: { url: urlImage = '' } = {} } = {},
        streams = [],
      } = {},
    } = {},
  } = globalContent || {}

  const {
    _id: id,
    data = {},
    // htmlContent = false,
    description = '',
    // promo_items: { basic: { url: urlImageContent = '' } = {} } = {},
    streams: streamsContent = [],
    duration: durationTwo = '',
    additional_properties: videoContent = {},
    // url: imagenMigrate = '',
    contentElemtent = false,
    reziserVideo = true,
  } = props

  const videoData = videoContent.advertising || video.advertising

  /* const imageUrl = contentElemtent ? urlImageContent : urlImage
   const { large } =
    getResizedUrl({
      url: imageUrl || imagenMigrate,
      presets: 'large:680x400',
      arcSite,
    }) || {} */

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

  const videoUrlContent =
    contentElemtent && streamsContent[1]
      ? getResultVideo(streamsContent, arcSite)
      : ''

  const videoUrlPrincipal = streams[1] ? getResultVideo(streams, arcSite) : ''

  const getSectionSlug = (sectionId = '') => {
    return sectionId.split('/')[1] || ''
  }

  const getParametroPublicidad = () => {
    const {
      taxonomy: { primary_section: { path: primarySection } = {} } = {},
    } = globalContent || {}

    if (
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
        )}/preroll&description_url=https%3A%2F%2F${webSite}%2F&tfcd=0&npa=0&sz=640x480|640x360|400x300&cust_params=fuente%3Dweb%26publisher%3D${arcSiteNew}%26seccion%3D${sectionSlug
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

  const dataTime =
    durationOne || durationTwo ? msToTime(durationTwo || durationOne) : ''
  const CURRENT_ENVIRONMENT =
    ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox' // se reutilizó nombre de ambiente

  return (
    <>
      <div
        id="powa-default"
        className="lazyload-video powa-default"
        data-uuid={ids || (uidArray && uidArray[1])}
        data-reziser={reziserVideo}
        data-api={CURRENT_ENVIRONMENT}
        data-type="pwa"
        data-streams={
          videoUrlContent || videoUrlPrincipal || (videoArray && videoArray[1])
        }
        data-time={videoArray && videoArray[1] ? '-1' : dataTime}
        data-preroll={
          (videoData && videoData.playAds === true) ||
          (videoArray && videoArray[1])
            ? getParametroPublicidad()
            : ''
        }></div>
      <figcaption className={classes.caption}>{description} </figcaption>
    </>
  )
}

export default StoryContentChildVideo
