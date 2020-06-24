import React from 'react'

import StoryData from '../../../../utilities/story-data'

export default props => {
  const {
    content_elements: videoItems = [],
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
        {videoItems &&
          videoItems.map(item => {
            Story.__data = item
            return (
              <div className="play-list__item">
                <a
                  itemProp="url"
                  className="play-list__image-box"
                  href={Story.websiteLink}>
                  <img
                    src={Story.multimediaLandscapeMD}
                    className="play-list__image"
                    alt={Story.title}
                    loading="lazy"
                  />
                  {!(
                    Story.videoDuration === '00:00' ||
                    Story.videoDuration === '00:00:00'
                  ) && (
                    <span className="play-list__duration">
                      {Story.videoDuration}
                    </span>
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
