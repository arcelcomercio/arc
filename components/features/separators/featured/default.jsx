import * as React from 'react'
import PropTypes from 'prop-types'
import { useContent, useEditableContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import { separatorFeaturedFields } from '../../../utilities/included-fields'

import schemaFilter from './_dependencies/schema-filter'
import SeparatorFeaturedStory from './_children/story'

// TODO: Subir clases a objeto

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

  const { arcSite, contextPath, deployment } = useAppContext()
  const { editableField } = useEditableContent()

  const presets = 'no-presets'
  const includedFields = separatorFeaturedFields

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
  })


  /**
   * @typedef FeaturedSeparatorStory
   * @property {string} title
   * @property {string} websiteLink
   * @property {string} primarySection
   * @property {string} primarySectionLink
   * @property {string} multimediaCaption
   * @property {string} imageUrl
   */
  /**
   * @type {Array<FeaturedSeparatorStory>}
   */
  const stories = contentElements.map(story => {
    storyData._data = story
    
    return {
      title: storyData.title,
      websiteLink: storyData.websiteLink,
      primarySection: storyData.primarySection,
      primarySectionLink: storyData.primarySectionLink,
      multimediaCaption: storyData.multimediaCaption,
      imageUrl: storyData.imageUrl,
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
        <h2
          itemProp="name"
          className="featured-separator__title text-lg line-h-xs mb-10 font-bold">
          <a
            itemProp="url"
            className="featured-separator__title-link"
            href={titleLinkField}
            {...editableField('titleField')}
            suppressContentEditableWarning>
            {titleField || 'Lo último'}
          </a>
          {subtitleField ? (
            <span
              className="featured-separator__subtitle text-sm block"
              {...editableField('subtitleField')}
              suppressContentEditableWarning>
              {subtitleField}
            </span>
          ) : null}
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
            multimediaCaption,
            imageUrl
          },
          i
        ) => {
          return <SeparatorFeaturedStory 
            key={`separator-feat-${websiteLink}`}
            title={title}
            websiteLink={websiteLink}
            primarySection={primarySection}
            primarySectionLink={primarySectionLink}
            multimediaCaption={multimediaCaption}
            imageUrl={imageUrl}
            sectionField={sectionFields[i]}
            isLazyLoadActivate={isLazyLoadActivate}
            index={i}
          />
        }
      )}
    </div>
  )
}

SeparatorFeatured.label = 'Separador destacado'
SeparatorFeatured.static = true

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
