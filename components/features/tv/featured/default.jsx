import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import TvHeader from './_children/header'
import Icon from '../../../global-components/multimedia-icon'
import Modal from '../../../global-components/tv-modal'

import StoryData from '../../../utilities/story-data'
import { formatDateLocalTimeZone } from '../../../utilities/helpers'

/**
 * CR: Por favor, recuerda agregar algo a los alt="" :c
 * ayuda a las personas que no tienen la misma suerte que tú
 * al tener dos ojos sanos y la capacidad de ver las
 * bellezas de la vida en full HD 4k.
 */

const TvFeatured = props => {
  const { customFields: { section = '' } = {} } = props
  const { content_elements: contentElements = [] } =
    useContent({
      source: 'story-feed-by-section-with-custom-presets',
      query: { section, preset1: '1350x570' },
      // filter: SchemaFilter(arcSite),
    }) || []
  const data = contentElements[0] || {}
  /**
   * CR: Sería mejor si se destructura de una vez entrando al primer elemento:
   *
   * const { content_elements: [ data = {} ] = [] } = ...
   *
   * o si en la query se envía "stories_qty = 1" para evitar consumir
   * data innecesaria.
   */

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
              basic: { resized_urls: { preset1 = '' } = {} } = {},
              /**
               * CR: Creo que la evaluación de preset1 se hace dos veces,
               * la primera cuando se destructura y por defecto se asigna ''
               * y la segunda cuando se evalua = preset1 || multimedia.
               * Si preset1 al no tener contenido viene como 'undefined',
               * podría ser mejor destructurar { preset1 = multimedia } y
               * sólo asignar image = preset1 (aunque de esta manera se
               * pierde un poco la autodocumentación del código ya que
               * preset1 también podría significar "multimedia"). La otra
               * opción podría ser simplemente no hacer la asignación por
               * defecto de '' a preset1 en la destructuración, ya que no
               * servirá de nada si abajo se hace = preset1 || multimedia.
               */
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
                alt=""
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
            <time
              className="block text-white mb-15"
              dateTime={date /** CD: También valida esta peeeee */}>
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
