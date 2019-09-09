import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import SchemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import VideoListItem from './_children/item'
import StoryData from '../../../utilities/story-data'

const VideoList = props => {
  const { globalContent, arcSite, contextPath, deployment } = useFusionContext()
  const { customFields: { offSetNote = 5, quantyStory = 15 } = {} } = props
  let dataList = {}

  const fetchListVideo = (section = '/') => {
    const listVideo =
      useContent({
        source: 'story-feed-by-section',
        query: {
          section,
          feedOffset: offSetNote,
          stories_qty: quantyStory,
        },
        filter: SchemaFilter(arcSite),
      }) || {}
    dataList = listVideo
  }

  if (globalContent && globalContent.type === 'story') {
    const {
      taxonomy: { primary_section: { path = '' } = {} } = {},
    } = globalContent
    fetchListVideo(path)
  } else {
    const section = globalContent._id
    fetchListVideo(section)
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

VideoList.propTypes = {
  customFields,
}

VideoList.label = 'Video - Lista'
export default VideoList
