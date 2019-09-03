import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'

const CardFeaturedStoryAuthor = props => {
  const { arcSite, contextPath, deployment } = useFusionContext()

  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
    } = {},
  } = props

  const data =
    useContent({
      source: contentService,
      query: contentConfigValues,
      // filter: schemaFilter(arcSite),
    }) || {}

  const {
    title,
    link,
    primarySection,
    primarySectionLink,
    author,
    authorLink,
    authorImage,
    multimediaLandscapeMD,
    authorRole,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  console.log('DATA -->', data)

  return (
    <article className="featured-author row-1">
      <a className="block" href={link}>
        <picture className="block">
          <img
            className="w-full featured-author__img object-cover"
            src={multimediaLandscapeMD}
            alt={title}
          />
        </picture>
      </a>
      <h3 className="flex justify-center mt-10 mb-10">
        <a className="text-gray-200 title-sm" href={primarySectionLink}>
          {primarySection}
        </a>
      </h3>
      <h2 className="flex justify-center mb-15">
        <a
          className="featured-author__title-link text-center line-h-xs overflow-hidden"
          href={link}>
          {title}
        </a>
      </h2>
      <div className="flex justify-center">
        <a className="rounded overflow-hidden bg-tertiary" href={authorLink}>
          <picture>
            <img
              className="featured-author__author-img object-cover"
              src={authorImage}
              alt={author}
            />
          </picture>
        </a>
        <div className="flex flex-col justify-center ml-10">
          <h4>
            <a className="text-md line-h-xs" href={authorLink}>
              {author}
            </a>
          </h4>
          <a className="text-sm text-gray-200" href={authorLink}>
            {authorRole}
          </a>
        </div>
      </div>
    </article>
  )
}

CardFeaturedStoryAuthor.label = 'Destaque de autor'

CardFeaturedStoryAuthor.propTypes = {
  customFields: PropTypes.shape({
    storyConfig: PropTypes.contentConfig('story').isRequired.tag({
      name: 'Configuración del contenido',
    }),
  }),
}

export default CardFeaturedStoryAuthor
