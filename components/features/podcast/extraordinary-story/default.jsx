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
      <div className="podcast-extraordinary__content flex flex-col justify-center">
        <div className="podcast-extraordinary__section-container">
          <h3 className="podcast-extraordinary__section">
            <a href="/">El Comercio Hoy</a>
          </h3>
          <span className="podcast-extraordinary__tag">Nuevo</span>
        </div>
        <h2 lassName="podcast-extraordinary__title">
          <a href="/">Las noticias de hoy, Lunes 07 de Junio</a>
        </h2>
        <p>
          <a href="/">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Dignissimos nobis ad at. Nemo nisi modi sequi quae qui odio impedit.
            Obcaecati ipsum aperiam itaque, nemo quaerat ullam porro minus!
            Eveniet.
          </a>
        </p>
      </div>
      <picture className="podcast-extraordinary__picture">
        <img src={multimediaLandscapeL} alt="" />
      </picture>
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
