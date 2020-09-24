import React from 'react'
import { useAppContext } from 'fusion:context'
import { getResultVideo } from '../../../../utilities/story/helpers'
import { getPreroll } from '../../../../utilities/ads/preroll'
import PowaPlayer from '../../../../global-components/powa-player'

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
        promo_items: { basic: { url: urlImage = '' } = {} } = {},
        streams = [],
      } = {},
    } = {},
    taxonomy: { primary_section: { path: primarySection } = {} },
  } = globalContent || {}

  const {
    _id: id,
    data = {},
    description = '',
    promo_items: { basic: { url: urlImageContent = '' } = {} } = {},
    streams: streamsContent = [],
    url: imagenMigrate = '',
    contentElemtent = false,
    classImage = 'story-contents',
  } = props

  const lazy = contentElemtent
  const imageUrl = contentElemtent ? urlImageContent : urlImage

  const urlVideo = data
    .replace(
      /https:\/\/elcomercio.pe(\/uploads\/.+?\/.+?\/.+?\/.+?(?:jpeg|jpg|png|gif|mp4|mp3))/g,
      'https://img.elcomercio.pe$1'
    )
    .replace(
      /https:\/\/trome.pe(\/uploads\/.+?\/.+?\/.+?\/.+?(?:jpeg|jpg|png|gif|mp4|mp3))/g,
      'https://opta.minoticia.pe $1'
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

  const uidArray = urlVideo.match(
    /data-uuid="(([0-9a-z-A-Z]*[0-9a-z-A-Z])\w+)"/
  )
  const uuid = id || principalId || (uidArray && uidArray[1])

  const videoArray = urlVideo.match(
    /stream="((.*).(jpeg|jpg|png|gif|mp4|mp3))"/
  )

  const stream =
    videoUrlContent || videoUrlPrincipal || (videoArray && videoArray[1])

  return (
    <>
      <PowaPlayer
        uuid={uuid}
        stream={stream}
        image={imageUrl || imagenMigrate}
        preroll={
          getPreroll({
            section: primarySection,
            arcSite,
            siteDomain,
            metaValue,
          }) || urlPreroll
        }
        lazy={lazy}
      />
      {description && (
        <figcaption className={`${classImage}${classes.caption}`}>
          {description}{' '}
        </figcaption>
      )}
    </>
  )
}

export default StoryContentChildVideo
