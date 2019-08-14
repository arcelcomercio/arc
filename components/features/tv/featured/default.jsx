import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import TvHeader from './_children/header'
import Icon from '../../../global-components/multimedia-icon'
import Modal from '../../../global-components/tv-modal'

import StoryData from '../../../utilities/story-data'
import { formatDateLocalTimeZone } from '../../../utilities/helpers'

const TvFeatured = props => {
  const { customFields: { section = '' } = {} } = props
  const { content_elements: contentElements = [] } =
    useContent({
      source: 'story-feed-by-section-with-custom-presets',
      query: { section, stories_qty: 1, preset1: '1350x570' },
      // filter: SchemaFilter(arcSite),
    }) || {}
  const data = contentElements[0] || {}

  const { arcSite, contextPath, deployment } = useFusionContext()

  const {
    title,
    date,
    multimediaType, // basic | basic_video
    multimedia,
    videoId,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'lg',
  })

  const getMultimedia = () => {
    let image = ''
    if (multimediaType === 'basic_video') {
      const {
        promo_items: {
          basic_video: {
            promo_items: {
              basic: { resized_urls: { preset1 } = {} } = {},
            } = {},
          } = {},
        } = {},
      } = data
      image = preset1 || multimedia
    } else if (multimediaType === 'basic') {
      const {
        promo_items: { basic: { resized_urls: { preset1 } = {} } = {} } = {},
      } = data
      image = preset1 || multimedia
    }
    return image
  }

  const getVideoId = () => {
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

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="tv-featured position-relative mb-40">
        <TvHeader />

        <div className="tv-featured__body mx-auto">
          <button
            type="button"
            className="block p-0"
            onClick={() => setIsModalOpen(!isModalOpen)}>
            <picture className="tv-featured__picture block position-relative">
              <img
                className="tv-featured__img object-cover w-full h-full"
                src={getMultimedia()}
                alt={title}
              />
            </picture>
            <Icon type="basic_video" iconClass="" />
          </button>

          <div className="tv-featured__content p-15 lg:ml-35">
            <div className="tv-featured__new-episode bg-primary text-white inline-block p-5 rounded-sm mb-10">
              NUEVO EPISODIO
            </div>
            <h2 className="mb-15">
              <button
                type="button"
                className="tv-featured__text-button text-white font-bold title-xs p-0 text-left"
                onClick={() => setIsModalOpen(!isModalOpen)}>
                {title}
              </button>
            </h2>
            <time className="block text-white mb-15" dateTime={date || ''}>
              {date && formatDateLocalTimeZone(date)}
            </time>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          close={() => {
            setIsModalOpen(!isModalOpen)
          }}
          {...getVideoId()}
          // youtubeId="_oQINN93ET4"
          // multimediaSource="4dc92932-7143-4776-94b7-798421d06108"
        />
      )}
    </>
  )
}

TvFeatured.propTypes = {
  customFields: PropTypes.shape({
    section: PropTypes.string.tag({
      name: 'URL de la sección',
      description:
        'Si no se coloca la URL de la sección, se renderiza la última historia publicada. Ejemplo: /deporte-total',
    }),
  }),
}

export default TvFeatured
