import React, { Fragment } from 'react'

import Image from '../../../../global-components/image'
import StoryData from '../../../../utilities/story-data'

export default (props) => {
  const {
    content_elements: videoItems = [],
    principalVideo,
    arcSite,
    contextPath,
    deployment,
  } = props
  const Story = new StoryData({
    data: {},
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  return (
    <div className="play-list">
      <h2 itemProp="name" className="play-list__name">
        PLAYLIST
      </h2>
      <div className="play-list__wrapper">
        {arcSite === 'trome' && principalVideo && (
          <div className="play-list__item">
            <span className="play-list__image-box play-list__current">
              <Image
                src={principalVideo.promoItemJwplayer.thumbnail_url}
                width={225}
                height={0}
                alt={principalVideo.title}
                className="play-list__image"
                loading="lazy"
                sizes="(max-width: 360px) 360px"
                uid="current_video"
              />

              {/* {!(
                principalVideo.videoDuration === '00:00' ||
                principalVideo.videoDuration === '00:00:00'
              ) && (
                <span className="play-list__duration">
                  {principalVideo.videoDuration}
                </span>
              )} */}
            </span>
            <h3 itemProp="name" className="play-list__title">
              {principalVideo.title}
            </h3>
          </div>
        )}
        {videoItems &&
          videoItems.map((item) => {
            Story.__data = item
            return (
              <div className="play-list__item">
                <a
                  itemProp="url"
                  className="play-list__image-box"
                  href={Story.websiteLink}>
                  <Image
                    src={Story.multimediaLandscapeMD}
                    width={225}
                    height={0}
                    alt={Story.title}
                    className="play-list__image"
                    loading="lazy"
                    sizes="(max-width: 360px) 360px"
                  />

                  {!(
                    Story.videoDuration === '00:00' ||
                    Story.videoDuration === '00:00:00'
                  ) && (
                    <span className="play-list__duration">
                      {Story.videoDuration}
                    </span>
                  )}
                  {arcSite === 'trome' && (
                    <svg
                      className="play-list__icon"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 52 52">
                      <path
                        className="play-list__icon-back"
                        d="M0,0H52V52H0Z"
                      />
                      <path
                        className="play-list__icon-front"
                        d="M15.17,10.83v26l21.66-13Z"
                      />
                    </svg>
                  )}
                </a>
                <h3 itemProp="name" className="play-list__title">
                  <a itemProp="url" href={Story.websiteLink}>
                    {Story.title}
                  </a>
                </h3>
              </div>
            )
          })}
      </div>
    </div>
  )
}
