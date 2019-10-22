import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import SchemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'
import VideoListItemAmp from './_children/amp-item'
import StoryData from '../../../utilities/story-data'
import ConfigParams from '../../../utilities/config-params'

const classes = {
  videoList: 'video-list bg-white pl-20 pr-20 m-0 mx-auto amp-story-content',
  taboola: 'amp-story-content bg-white pl-20 pr-20 m-0 mx-auto ',
}

const VideoListAmp = props => {
  const {
    arcSite,
    globalContent,
    contextPath,
    deployment,
    siteProperties: {
      taboola: { dataModeAmp },
    },
  } = useFusionContext()

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

  const {
    taxonomy: { primary_section: { path = '' } = {} } = {},
  } = globalContent
  fetchListVideo(path)

  const list = dataList.content_elements || []

  const Story = new StoryData({
    data: {},
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  return (
    <>
      <div className={classes.videoList}>
        {list &&
          list.map(video => {
            Story.__data = video
            const {
              websiteLink,
              title,
              multimediaSquareMD,
              primarySection,
              primarySectionLink,
              videoDuration,
            } = Story
            const params = {
              websiteLink,
              title,
              multimediaSquareMD,
              primarySection,
              primarySectionLink,
              videoDuration,
            }
            return <VideoListItemAmp {...params} />
          })}
      </div>
      <div className={classes.taboola}>
        {arcSite !== ConfigParams.SITE_GESTION && (
          <amp-embed // TODO: publicidad taboola x definir de parte del cliente // se Retira para gestion
            width="100"
            height="100"
            type="taboola"
            layout="responsive"
            heights="(min-width:1862px) 213%, (min-width:1293px) 218%, (min-width:909px) 226%, (min-width:647px) 236%, (min-width:500px) 252%, (min-width:397px) 272%, 297%"
            data-publisher={`grupoelcomercio-${
              arcSite === 'publimetro' ? 'publimetrope' : arcSite
            }`}
            data-mode={dataModeAmp}
            data-placement="Mobile Below Article Thumbnails AMP"
            data-target_type="mix"
            data-article="auto"
            data-url=""
          />
        )}
      </div>
    </>
  )
}

VideoListAmp.propTypes = {
  customFields,
}

VideoListAmp.label = 'Artículo - Taboola'
VideoListAmp.static = true

export default VideoListAmp
