import React from 'react'
import ENV from 'fusion:environment'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import { msToTime } from '../../../../utilities/date-time/time'
import { getResultVideo } from '../../../../utilities/story/helpers'

/**
 *
 * Si piden que los videos vengan del CDN de Arc en lugar del
 * CDN de El Comercio, solo se debe comentar:
 *
 * import { getResultVideo } from '../../../../utilities/story/helpers'
 *
 * y descomentar la siguiente funcion
 */
/* const getResultVideo = (streams, arcSite, type = 'ts') => {
  const resultVideo = streams
    .map(({ url = '', stream_type: streamType = '' }) => {
      return streamType === type ? url : []
    })
    .filter(String)
  const cantidadVideo = resultVideo.length

  return resultVideo[cantidadVideo - 1]
} */

const classes = {
  video: '__lL-video',
  powa: '__p-default',
  caption: '__caption ',
}

const StoryContentChildVideo = props => {
  const {
    siteProperties: { urlPreroll, siteDomain },
    globalContent,
    arcSite,
    metaValue,
  } = useAppContext()

  const {
    promo_items: {
      basic_video: {
        _id: principalId,
        duration: durationOne,
        additional_properties: video = {},
        promo_items: { basic: { url: urlImage = '' } = {} } = {},
        streams = [],
      } = {},
    } = {},
  } = globalContent || {}

  const {
    _id: id,
    data = {},
    description = '',
    promo_items: { basic: { url: urlImageContent = '' } = {} } = {},
    streams: streamsContent = [],
    duration: durationTwo,
    additional_properties: videoContent = {},
    url: imagenMigrate = '',
    contentElemtent = false,
    reziserVideo = true,
    classImage = 'story-contents',
  } = props

  const imageUrl = contentElemtent ? urlImageContent : urlImage
  const { resized_urls: { videoPoster } = {} } =
    useContent({
      source: 'photo-resizer',
      query: {
        url: imageUrl || imagenMigrate,
        presets: 'videoPoster:560x0',
      },
    }) || {}

  const videoData = videoContent.advertising || video.advertising

  const urlVideo = data
    .replace(
      /https:\/\/elcomercio.pe(\/uploads\/.+?\/.+?\/.+?\/.+?(?:jpeg|jpg|png|gif|mp4|mp3))/g,
      'https://img.elcomercio.pe$1'
    )
    .replace(
      /https:\/\/trome.pe(\/uploads\/.+?\/.+?\/.+?\/.+?(?:jpeg|jpg|png|gif|mp4|mp3))/g,
      'https://img.trome.pe$1'
    )
    .replace(
      /https:\/\/gestion.pe(\/uploads\/.+?\/.+?\/.+?\/.+?(?:jpeg|jpg|png|gif|mp4|mp3))/g,
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

    if (arcSite) {
      const arcSiteNew = arcSite === 'peru21g21' ? 'peru21' : arcSite
      const domain =
        arcSite === 'elcomerciomag' ? `mag.${siteDomain}` : siteDomain

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
        )}/preroll&description_url=https%3A%2F%2F${domain}%2F&tfcd=0&npa=0&sz=640x480|400x300|640x360&cust_params=fuente%3Dweb%26publisher%3D${arcSiteNew}%26seccion%3D${sectionSlug
        .split('-')
        .join(
          ''
        )}%26tipoplantilla%3D${tipoplantilla}&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=`
    }
    return urlPreroll
  }
  const uidArray = urlVideo.match(
    /data-uuid="(([0-9a-z-A-Z]*[0-9a-z-A-Z])\w+)"/
  )
  const uuid = id || principalId || (uidArray && uidArray[1])

  const videoArray = urlVideo.match(
    /stream="((.*).(jpeg|jpg|png|gif|mp4|mp3))"/
  )

  const stream =
    videoUrlContent || videoUrlPrincipal || (videoArray && videoArray[1])

  const dataTime =
    durationOne || durationTwo ? msToTime(durationTwo || durationOne) : ''
  const env = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox' // se reutilizó nombre de ambiente

  return (
    <>
      <div
        id="powa-default"
        className={`${classImage}${classes.video} multimedia${classes.powa}`}
        data-uuid={uuid}
        data-reziser={reziserVideo}
        data-api={env}
        data-time={videoArray && videoArray[1] ? '-1' : dataTime}
        data-streams={stream}
        data-poster={videoPoster}
        data-preroll={
          (videoData && videoData.playAds === true) ||
          (videoArray && videoArray[1])
            ? getParametroPublicidad()
            : ''
        }></div>
      {description && (
        <figcaption className={`${classImage}${classes.caption}`}>
          {description}{' '}
        </figcaption>
      )}
    </>
  )
}

export default StoryContentChildVideo
