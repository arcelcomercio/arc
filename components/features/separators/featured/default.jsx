import React from 'react'
import PropTypes from 'prop-types'
import { useContent, useEditableContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import schemaFilter from './_dependencies/schema-filter'
import StoryData from '../../../utilities/story-data'
import {
  includePromoItems,
  includePromoItemsCaptions,
  includePrimarySection,
} from '../../../utilities/included-fields'

// TODO: Subir clases a objeto
// TODO: sacar schemaFilter

const SeparatorFeatured = props => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      titleField,
      subtitleField,
      titleLinkField,
      sectionField1,
      sectionField2,
      sectionField3,
      sectionField4,
      isLazyLoadActivate = true,
    } = {},
  } = props

  const { arcSite, contextPath, deployment, isAdmin } = useFusionContext()
  const { editableField } = useEditableContent()

  const presets = 'portrait_s:161x220'
  const includedFields = `headlines.basic,${includePromoItems},${includePromoItemsCaptions},websites.${arcSite}.website_url,${includePrimarySection}`

  const { content_elements: contentElements = [] } =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, {
        size: 4,
        stories_qty: 4,
        presets,
        includedFields,
      }),
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
      multimediaLazyDefault,
      multimediaSubtitle,
      multimediaCaption,
    } = storyData
    return {
      title,
      websiteLink,
      primarySection,
      primarySectionLink,
      multimediaPortraitS,
      multimediaType,
      multimediaLazyDefault,
      multimediaSubtitle,
      multimediaCaption,
    }
  })

  const sectionFields = [
    sectionField1,
    sectionField2,
    sectionField3,
    sectionField4,
  ]

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
        (
          {
            title,
            websiteLink,
            primarySection,
            primarySectionLink,
            multimediaPortraitS,
            multimediaLazyDefault,
            // multimediaType,
            multimediaCaption,
          },
          i
        ) => {
          return (
            <div className="featured-separator__story flex flex-1 border-l-1 border-dashed pl-10 pr-10 justify-between">
              <div className="featured-separator__story-content pr-5">
                <h3 className="featured-separator__story-section font-bold text-lg mb-5 line-h-xs tertiary-font overflow-hidden">
                  <a
                    className="featured-separator__section-link"
                    href={primarySectionLink}
                    {...editableField(`sectionField${i + 1}`)}
                    suppressContentEditableWarning>
                    {sectionFields[i] || primarySection}
                  </a>
                </h3>
                <h2 className="featured-separator__story-title text-md line-h-xs tertiary-font overflow-hidden">
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
                {!isLazyLoadActivate && i === 0 ? (
                  <img
                    src={multimediaPortraitS}
                    alt={multimediaCaption || title}
                    className="featured-separator__img w-full object-cover"
                  />
                ) : (
                  <img
                    src={isAdmin ? multimediaPortraitS : multimediaLazyDefault}
                    data-src={multimediaPortraitS}
                    alt={multimediaCaption || title}
                    className={`${
                      isAdmin ? '' : 'lazy'
                    } featured-separator__img w-full object-cover`}
                  />
                )}
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
    sectionField1: PropTypes.string.tag({
      name: 'Configurar sección de la noticia 1',
      group: 'Configurar noticias',
    }),
    sectionField2: PropTypes.string.tag({
      name: 'Configurar sección de la noticia 2',
      group: 'Configurar noticias',
    }),
    sectionField3: PropTypes.string.tag({
      name: 'Configurar sección de la noticia 3',
      group: 'Configurar noticias',
    }),
    sectionField4: PropTypes.string.tag({
      name: 'Configurar sección de la noticia 4',
      group: 'Configurar noticias',
    }),
    isLazyLoadActivate: PropTypes.bool.tag({
      name: 'Activar lazy load',
      group: 'Configuración',
      defaultValue: true,
    }),
  }),
}

export default SeparatorFeatured
