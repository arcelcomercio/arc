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
      <h2 className="play-list__name">PLAYLIST</h2>
      <div className="play-list__wrapper">
        {videoItems &&
          videoItems.map(item => {
            Story.__data = item
            return (
              <div className="play-list__item">
                <a className="play-list__image-box" href={Story.websiteLink}>
                  <img
                    src={Story.multimediaSquareMD}
                    className="play-list__image"
                    alt={Story.title}
                    alt={Story.title}
                  />
                  {/* <span className="play-list__duration">0:41</span> */}
                </a>
                <h3 className="play-list__title">
                  <a href={Story.websiteLink}>{Story.title}</a>
                </h3>
              </div>
            )
          })}
      </div>
    </div>
  )
}
