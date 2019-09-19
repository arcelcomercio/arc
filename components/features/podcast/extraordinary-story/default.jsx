import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'

const PodcastExtraordinazryStory = props => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
    } = {},
  } = props

  const { arcSite, contextPath, deployment } = useFusionContext()

  const data =
    useContent({
      source: contentService,
      query: contentConfigValues,
      // filter: schemaFilter(arcSite),
    }) || {}

  const { multimediaLandscapeL } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  return (
    <div className="podcast-extraordinary flex">
      <div className="podcast-extraordinary__content flex flex-col justify-center pr-20">
        <div className="podcast-extraordinary__section-container flex mb-10">
          <h3 className="podcast-extraordinary__section mr-10">
            <a
              href="/"
              className="podcast-extraordinary__section-link text-lg text-gray-200 font-bold">
              El Comercio Hoy
            </a>
          </h3>
          <span className="podcast-extraordinary__tag text-sm font-bold text-white rounded-lg pt-5 pb-5 pl-10 pr-10">
            Nuevo
          </span>
        </div>
        <h2 className="podcast-extraordinary__title mb-15">
          <a
            href="/"
            className="podcast-extraordinary__title-link text-black font-bold line-h-xs">
            Las noticias de hoy, Lunes 07 de Junio
          </a>
        </h2>
        <p className="podcast-extraordinary__subtitle">
          <a
            href="/"
            className="podcast-extraordinary__subtitle-link text-md line-h-sm text-gray-300 secondary-font overflow-hidden">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Dignissimos nobis ad at. Nemo nisi modi sequi quae qui odio impedit.
            Obcaecati ipsum aperiam itaque, nemo quaerat ullam porro minus!
            Eveniet.
          </a>
        </p>
      </div>
      <a href="/" className="podcast-extraordinary__img-link">
        <picture className="podcast-extraordinary__picture">
          <img
            src={multimediaLandscapeL}
            alt=""
            className="podcast-extraordinary__img w-full"
          />
        </picture>
      </a>
    </div>
  )
}

PodcastExtraordinazryStory.label = 'Podcast - Apertura Extraordinaria'

PodcastExtraordinazryStory.propTypes = {
  customFields: PropTypes.shape({
    storyConfig: PropTypes.contentConfig('story').isRequired.tag({
      name: 'Configuración del contenido',
    }),
  }),
}

export default PodcastExtraordinazryStory
