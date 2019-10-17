import React from 'react'
import PropTypes from 'prop-types'
import { useContent, useEditableContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'

const SeparatorFeatured = props => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      titleField,
      subtitleField,
      titleLinkField,
    } = {},
  } = props

  const { arcSite, contextPath, deployment } = useFusionContext()
  const { editableField } = useEditableContent()

  const { content_elements: contentElements = [] } =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, { size: 4, stories_qty: 4 }),
      filter: schemaFilter(arcSite),
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

  return (
    <div className="featured-separator col-3 flex p-10">
      <div className="featured-separator__title-container pr-10">
        <h2 className="featured-separator__title text-lg line-h-xs mb-10 font-bold">
          <a
            className="featured-separator__title-link"
            href={titleLinkField}
            {...editableField('titleField')}
            suppressContentEditableWarning>
            {titleField || 'Lo último'}
          </a>
          {subtitleField && (
            <span
              className="featured-separator__subtitle text-sm block"
              {...editableField('subtitleField')}
              suppressContentEditableWarning>
              {subtitleField}
            </span>
          )}
        </h2>
        <i className="featured-separator__icon icon-marca bg-white p-5 rounded" />
      </div>
      {stories.map(
        ({
          title,
          websiteLink,
          primarySection,
          primarySectionLink,
          multimediaPortraitS,
          // multimediaType,
        }) => {
          return (
            <div className="featured-separator__story flex flex-1 border-l-1 border-dashed pl-10 pr-10">
              <div className="featured-separator__story-content pr-5">
                <h3 className="featured-separator__story-section font-bold text-lg mb-5 line-h-xs tertiary-font">
                  <a
                    className="featured-separator__section-link"
                    href={primarySectionLink}>
                    {primarySection}
                  </a>
                </h3>
                <h2
                  className="featured-separator__story-title text-md line-h-xs tertiary-font overflow-hidden"
                  title={title}>
                  <a
                    className="featured-separator__story-link"
                    href={websiteLink}>
                    {title}
                  </a>
                </h2>
              </div>
              <a
                className="featured-separator__img-link block"
                href={websiteLink}>
                <img
                  src={multimediaPortraitS}
                  alt={title}
                  className="featured-separator__img w-full object-cover"
                />
              </a>
            </div>
          )
        }
      )}
    </div>
  )
}

SeparatorFeatured.label = 'Separador destacado'

SeparatorFeatured.propTypes = {
  customFields: PropTypes.shape({
    storyConfig: PropTypes.contentConfig('stories').isRequired.tag({
      name: 'Configuración del contenido',
      description:
        'Este feature siempre mostrará 4 noticias, no se toma en cuenta el campo "cantidad a mostrar"',
    }),
    titleField: PropTypes.string.tag({
      name: 'Título',
    }),
    subtitleField: PropTypes.string.tag({
      name: 'Subtítulo',
    }),
    titleLinkField: PropTypes.string.tag({
      name: 'URL del título',
    }),
  }),
}

export default SeparatorFeatured
