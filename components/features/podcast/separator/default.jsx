import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'

const PodcastSeparator = props => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
    } = {},
  } = props

  const { arcSite, contextPath, deployment } = useFusionContext()

  const { content_elements: contentElements = [] } =
    useContent({
      source: contentService,
      query: contentConfigValues,
      // filter: schemaFilter(arcSite),
    }) || {}

  const storyData = new StoryData({
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const stories = contentElements.map(story => {
    storyData._data = story
    const { multimediaLandscapeMD } = storyData
    return {
      multimediaLandscapeMD,
    }
  })

  return (
    <div className="podcast-separator md:pl-0 md:pr-0 pl-20 pr-20 pt-20 pb-20">
      <div className="podcast-separator__title-container flex justify-between pt-10 mb-20 border-t-1 border-solid border-black">
        <h2 className="podcast-separator__title">
          <a
            href="/"
            className="podcast-separator__title-link title-xs font-bold secondary-font text-black">
            El Comercio Hoy
          </a>
        </h2>
        <a
          href="/"
          className="podcast-separator__title-button secondary-font font-bold text-sm text-black flex items-center">
          Ver todos
          <i className="icon-back podcast-separator__title-icon ml-5 text-sm font-bold"></i>
        </a>
      </div>
      <div className="podcast-separator__body">
        {stories.map(({ multimediaLandscapeMD }) => (
          <div className="podcast-separator__item">
            <a href="/" className="podcast-separator__img-link">
              <picture className="podcast-separator__picture">
                <img
                  src={multimediaLandscapeMD}
                  alt=""
                  className="podcast-separator__img w-full"
                />
              </picture>
            </a>
            <h3 className="podcast-separator__item-title mt-15 mb-15">
              <a
                href="/"
                className="podcast-separator_item-t-link text-xl font-bold secondary-font text-black">
                Las noticias de hoy, Viernes 28 de...
              </a>
            </h3>
            <p className="podcast-separator__item-subtitle">
              <a
                href="/"
                className="podcast-separator__item-s-link text-md line-h-sm text-gray-300 secondary-font overflow-hidden block mb-10 line-h-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                adipisci molestias eum dolor provident facilis omnis beatae,
                consequuntur ad. Recusandae eum natus qui iste tempore ipsam
                doloremque, nulla laboriosam ullam?
              </a>
            </p>
            <time
              dateTime=""
              className="podcast-separator__time text-sm line-h-sm text-gray-300 secondary-font overflow-hidden text-gray-200">
              Viernes 28 de Junio, 2019
            </time>
          </div>
        ))}
      </div>
    </div>
  )
}

PodcastSeparator.label = 'Podcast - Separador'

PodcastSeparator.propTypes = {
  customFields: PropTypes.shape({
    storyConfig: PropTypes.contentConfig('stories').isRequired.tag({
      name: 'Configuración del contenido',
    }),
  }),
}

export default PodcastSeparator
