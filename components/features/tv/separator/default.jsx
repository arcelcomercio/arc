import React from 'react'
import PropTypes from 'prop-types'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import TvSeparatorItem from './_children/separator-item'
import StoryData from '../../../utilities/story-data'

const TvSeparator = props => {
  const { customFields: { section = '' } = {} } = props
  const { arcSite, contextPath, deployment } = useFusionContext()
  const { content_elements: contentElements = [], section_name: sectionName } =
    useContent({
      source: 'story-feed-by-section-with-custom-presets',
      query: { section, preset1: '280x157' },
      // filter: SchemaFilter(arcSite),
    }) || {}
  const dataStoryInstance = new StoryData({
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'lg',
  })

  const getMultimedia = ({ data, multimedia, multimediaType }) => {
    let image = ''
    if (multimediaType === 'basic_video') {
      const {
        promo_items: {
          basic_video: {
            promo_items: {
              basic: { resized_urls: { preset1 = '' } = {} } = {},
            } = {},
          } = {},
        } = {},
      } = data
      image = preset1 || multimedia
    } else if (multimediaType === 'basic') {
      const {
        promo_items: {
          basic: { resized_urls: { preset1 = '' } = {} } = {},
        } = {},
      } = data
      image = preset1 || multimedia
    }
    return image
  }

  const getVideoId = ({ data, multimediaType, videoId }) => {
    let auxVideoId = {}
    const { promo_items: { youtube_id: { content = '' } = {} } = {} } = data
    if (multimediaType === 'basic_video') {
      auxVideoId = { multimediaSource: videoId }
    } else if (multimediaType === 'basic') {
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
        multimediaType, // basic | basic_video
        multimedia,
        videoId,
      } = dataStoryInstance
      auxParams.push({
        title,
        date,
        multimedia: getMultimedia({
          data: element,
          multimedia,
          multimediaType,
        }),
        videoId: getVideoId({ data: element, multimediaType, videoId }),
      })
    })
    return auxParams
  }

  return (
    <div className="tv-separator ml-10 mr-10 lg:ml-30 lg:mr-30 mb-25">
      <div className="flex justify-between items-center mb-20">
        <h2>
          <a
            href={`${section}/`}
            className="title-lg text-white font-bold uppercase">
            {sectionName}
          </a>
        </h2>
        <a href={`${section}/`} className="tv-separator__program font-bold">
          Ver programa
        </a>
      </div>

      <div className="flex justify-center md:justify-start">
        {getParams().map(params => (
          <TvSeparatorItem {...params} />
        ))}
      </div>
    </div>
  )
}

TvSeparator.propTypes = {
  customFields: PropTypes.shape({
    section: PropTypes.string.tag({
      name: 'URL de la sección',
      description:
        'Si no se coloca la URL de la sección, se renderiza la última historia publicada. Ejemplo: /deporte-total',
    }),
  }),
}

export default TvSeparator
