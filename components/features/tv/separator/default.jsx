import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import schemaFilter from './_dependencies/schema-filter'
import customFields from './_dependencies/custom-fields'

import TvSeparatorItem from './_children/separator-item'
import StoryData from '../../../utilities/story-data'

const TvSeparator = props => {
  const {
    customFields: {
      section = '',
      maxStories = 6,
      customTitle = '',
      deleteLinks,
    } = {},
  } = props
  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()
  const { content_elements: contentElements = [], section_name: sectionName } =
    useContent({
      source: 'story-feed-by-section-with-custom-presets',
      query: {
        section,
        stories_qty: maxStories,
        preset1: '4x4',
        preset2: '280x157',
      },
      filter: schemaFilter,
    }) || {}
  const dataStoryInstance = new StoryData({
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'md',
  })

  const getMultimedia = ({ data, multimedia, multimediaType }) => {
    let image = ''
    let lazyImage = ''
    if (multimediaType === 'basic_video') {
      const {
        promo_items: {
          basic_video: {
            promo_items: {
              basic: { resized_urls: { preset1 = '', preset2 = '' } = {} } = {},
            } = {},
          } = {},
        } = {},
      } = data
      image = preset2 || multimedia
      lazyImage = preset1 || ''
    } else {
      const {
        promo_items: {
          basic: { resized_urls: { preset1 = '', preset2 = '' } = {} } = {},
        } = {},
      } = data
      image = preset2 || multimedia
      lazyImage = preset1 || ''
    }
    return { image, lazyImage }
  }

  const getVideoId = ({ data, multimediaType, videoId }) => {
    let auxVideoId = {}
    const { promo_items: { youtube_id: { content = '' } = {} } = {} } = data
    if (multimediaType === 'basic_video') {
      auxVideoId = { multimediaSource: videoId }
    } else if (multimediaType === 'youtube_id') {
      /** Si es un video de Youtube */
      auxVideoId = { youtubeId: content }
    }
    return auxVideoId
  }

  const getParams = () => {
    const auxParams = []
    contentElements.forEach(element => {
      dataStoryInstance.__data = element
      const {
        title,
        date,
        getPromoItemsType,
        multimedia,
        videoId,
      } = dataStoryInstance
      const multimediaType = getPromoItemsType()
      auxParams.push({
        title,
        date,
        multimedia: getMultimedia({
          data: element,
          multimedia,
          multimediaType,
        }),
        videoId: getVideoId({ data: element, multimediaType, videoId }),
        maxStories,
        isAdmin,
      })
    })
    return auxParams
  }

  return (
    <div className="tv-separator ml-10 mr-10 lg:ml-30 lg:mr-30 pb-25">
      <div className="flex justify-between items-center mb-20">
        <h2>
          {deleteLinks ? (
            <span className="title-lg text-white font-bold uppercase">
              {customTitle || sectionName}
            </span>
          ) : (
            <a
              href={`${section}/`}
              className="title-lg text-white font-bold uppercase">
              {customTitle || sectionName}
            </a>
          )}
        </h2>
        {!deleteLinks && (
          <a href={`${section}/`} className="tv-separator__program font-bold">
            Ver programa
          </a>
        )}
      </div>

      <div className="flex justify-center md:justify-start flex-wrap">
        {getParams().map(params => (
          <TvSeparatorItem {...params} key={params.title} />
        ))}
      </div>
    </div>
  )
}

TvSeparator.propTypes = {
  customFields,
}

TvSeparator.label = 'Tv - separador'

export default TvSeparator
