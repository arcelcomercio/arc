import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'

const SeparatorFeatured = props => {
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
    const {
      title,
      websiteLink,
      primarySection,
      primarySectionLink,
      multimediaPortraitS,
      multimediaType,
    } = storyData
    return {
      title,
      websiteLink,
      primarySection,
      primarySectionLink,
      multimediaPortraitS,
      multimediaType,
    }
  })

  console.log(
    contentConfigValues,
    'contentElements->',
    contentElements,
    'stories->',
    stories
  )

  const aux = [1, 2, 3, 4]
  return (
    <div className="featured-separator col-3 flex p-10">
      <div className="featured-separator__title-container pr-10">
        <h2 className="featured-separator__title text-lg line-h-xs mb-10 font-bold">
          <a className="featured-separator__title-link" href="/">
            COPA AMERICA{' '}
            <span className="featured-separator__subtitle text-sm">2019</span>
          </a>
        </h2>
        <i className="featured-separator__icon icon-marca" />
      </div>
      {aux.map((el, i) => {
        return (
          <div
            className={`featured-separator__story flex border-l-1 border-dashed pl-10${
              i === aux.length - 1 ? '' : ' pr-10'
            }`}>
            <div className="featured-separator__story-content pr-5">
              <h3 className="featured-separator__story-section font-bold text-lg mb-5 line-h-xs tertiary-font">
                <a className="featured-separator__section-link" href="/">
                  Entrevista
                </a>
              </h3>
              <h2 className="featured-separator__story-title text-md line-h-xs tertiary-font">
                <a className="featured-separator__story-link" href="/">
                  Oblitas: Hay jugadores que pensamos para esta copa america
                  pero desaparecieron
                </a>
              </h2>
            </div>
            <a className="featured-separator__img-link block" href="/">
              <img
                src="https://elcomercio.pe/resizer/op_jRGDDVRp82KUx5oaJKNK5QMM=/314x374/smart/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/43TH7ER2VRHVTKALWZNCYB5IIA.jpg"
                alt="No olvidarrrrr"
                className="featured-separator__img w-full object-cover"
              />
            </a>
          </div>
        )
      })}
    </div>
  )
}

SeparatorFeatured.label = 'Separador destacado'

SeparatorFeatured.propTypes = {
  customFields: PropTypes.shape({
    storyConfig: PropTypes.contentConfig('stories').isRequired.tag({
      name: 'Configuración del contenido',
    }),
  }),
}

export default SeparatorFeatured
