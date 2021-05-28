import { useAppContext } from 'fusion:context'
import React from 'react'
import { FC } from 'types/features'
import { Streams } from 'types/story'

import PowaPlayer from '../../../../../global-components/powa-player'
import { getPreroll } from '../../../../../utilities/ads/preroll'
import { msToTime } from '../../../../../utilities/date-time/time'
import { getResultVideo } from '../../../../../utilities/story/helpers'

/**
 *
 * Si piden que los videos vengan del CDN de Arc en lugar del
 * CDN de El Comercio, solo se debe comentar:
 *
 * y descomentar la siguiente funcion
 */

const classes = {
  video: '__lL-video',
  powa: '__p-default',
  caption: '__caption ',
}

interface FeatureProps {
  primarySection?: string
  content?: string
  description?: string
  duration?: number
  classImage?: string
  streams?: Streams[]
  contentElemtent?: boolean
  id?: string
  imageUrl?: string
}

const StoryContentChildVideo: FC<FeatureProps> = (data) => {
  const {
    contentElemtent,
    primarySection = '',
    description,
    content,
    duration,
    classImage = 'story-contents',
    imageUrl,
    streams,
    id,
  } = data

  const {
    siteProperties: { urlPreroll, siteDomain },
    arcSite,
    metaValue,
  } = useAppContext()

  const urlVideo =
    content &&
    content
      .replace(
        /https:\/\/elcomercio.pe(\/uploads\/.+?\/.+?\/.+?\/.+?(?:jpeg|jpg|png|gif|mp4|mp3))/g,
        'https://img.elcomercio.pe$1'
      )
      .replace(
        /https:\/\/trome.pe(\/uploads\/.+?\/.+?\/.+?\/.+?(?:jpeg|jpg|png|gif|mp4|mp3))/g,
        'https://opta.minoticia.pe$1'
      )
      .replace(
        /https:\/\/gestion.pe(\/uploads\/.+?\/.+?\/.+?\/.+?(?:jpeg|jpg|png|gif|mp4|mp3))/g,
        'https://img.gestion.pe$1'
      )

  const videoUrl = streams && streams[1] ? getResultVideo(streams, arcSite) : ''

  const uidArray = urlVideo?.match(
    /data-uuid="(([0-9a-z-A-Z]*[0-9a-z-A-Z])\w+)"/
  )
  const uuid = uidArray ? uidArray[1] : ''

  const videoArray =
    urlVideo && urlVideo.match(/stream="((.*).(jpeg|jpg|png|gif|mp4|mp3))"/)

  const stream = videoUrl || videoArray?.[1]

  const dataTime = duration ? msToTime(duration) : ''

  return (
    <>
      <PowaPlayer
        uuid={id || uuid}
        stream={stream}
        time={videoArray && videoArray[1] ? '-1' : dataTime}
        image={imageUrl}
        preroll={
          getPreroll({
            section: primarySection,
            arcSite,
            siteDomain,
            metaValue,
          }) || urlPreroll
        }
        lazy={contentElemtent}
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
