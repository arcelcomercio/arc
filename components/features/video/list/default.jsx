import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import SchemaFilter from './_dependencies/schema-filter'
import VideoListItem from './_children/item'
import StoryData from '../../../utilities/story-data'

const VideoList = () => {
  const { globalContent, arcSite, contextPath, deployment } = useFusionContext()
  let section = null
  let dataList = {}
  if (globalContent && globalContent.type === 'story') {
    console.log(globalContent)
  } else {
    section = globalContent._id
    const fetchListVideo =
      useContent({
        source: 'story-feed-by-section',
        query: {
          section,
          feedOffset: 5,
          stories_qty: 15,
        },
        filter: SchemaFilter(arcSite),
      }) || {}
    dataList = fetchListVideo
  }
  const list = dataList.content_elements || []

  const Story = new StoryData({
    data: {},
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })
  return (
    <div className="flex video-list justify-center md:justify-between mt-50 flex-wrap">
      {list &&
        list.map(video => {
          Story.__data = video
          const {
            websiteLink,
            title,
            multimediaSquareMD,
            primarySection,
            primarySectionLink,
          } = Story
          const params = {
            websiteLink,
            title,
            multimediaSquareMD,
            primarySection,
            primarySectionLink,
          }
          return <VideoListItem {...params} />
        })}
    </div>
  )
}

VideoList.label = 'Video - Lista'
export default VideoList
