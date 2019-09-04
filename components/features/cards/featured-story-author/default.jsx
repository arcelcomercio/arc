import React from 'react'
import PropTypes from 'prop-types'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'

const CardFeaturedStoryAuthor = props => {
  const classes = {
    featuredAuthor: 'featured-author row-1',
    storyImgLink: 'featured-author__img-link block',
    storyPicture: 'block',
    storyImg: 'featured-author__img w-full object-cover',
    content: 'featured-author__content',
    section: 'flex justify-center mt-10 mb-10',
    sectionLink: 'text-gray-200 title-sm',
    title: 'flex justify-center mb-15',
    titleLink:
      'featured-author__title-link text-center line-h-xs overflow-hidden',
    subtitle: '',
    subtitleLink: '',
    authorContainer: 'flex justify-center',
    authorImgLink: 'rounded overflow-hidden bg-tertiary',
    authorPicture: '',
    authorImg: 'featured-author__author-img object-cover',
    authorNameContainer: 'flex flex-col justify-center ml-10',
    authorName: '',
    authorNameLink: 'text-md line-h-xs',
    authorRole: 'text-sm text-gray-200',
  }

  const { arcSite, contextPath, deployment } = useFusionContext()

  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      design = 'first',
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
    multimediaPortraitMD,
    authorRole,
    subTitle,
  } = new StoryData({
    data,
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  let storyImage = multimediaLandscapeMD
  /** Estilos por cada diseño */
  if (design === 'second') {
    classes.featuredAuthor =
      'featured-author second row-1 col-2 flex flex-row-reverse'
    storyImage = multimediaPortraitMD
  }

  return (
    <article className={classes.featuredAuthor}>
      <a className={classes.storyImgLink} href={link}>
        <picture className={classes.storyPicture}>
          <img className={classes.storyImg} src={storyImage} alt={title} />
        </picture>
      </a>
      <div className={classes.content}>
        <h3 className={classes.section}>
          <a className={classes.sectionLink} href={primarySectionLink}>
            {primarySection}
          </a>
        </h3>
        <h2 className={classes.title}>
          <a className={classes.titleLink} href={link}>
            {title}
          </a>
        </h2>
        {design !== 'first' && (
          <h3 className={classes.subtitle}>
            <a className={classes.subtitleLink} href={{ link }}>
              {subTitle}
            </a>
          </h3>
        )}
        <div className={classes.authorContainer}>
          <a className={classes.authorImgLink} href={authorLink}>
            <picture>
              <img
                className={classes.authorImg}
                src={authorImage}
                alt={author}
              />
            </picture>
          </a>
          <div className={classes.authorNameContainer}>
            <h4>
              <a className={classes.authorNameLink} href={authorLink}>
                {author}
              </a>
            </h4>
            <a className={classes.authorRole} href={authorLink}>
              {authorRole}
            </a>
          </div>
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
    design: PropTypes.oneOf(['first', 'second', 'third', 'fourth']).tag({
      name: 'Diseño',
      labels: {
        first: 'Diseño 1', // 1col, 1row, imagen parcial superior, sin subtítulo
        second: 'Diseño 2', // 2col, 1row, imagen parcial derecha, con subtítulo
        third: 'Diseño 3', // 2col, 1row, imagen completa derecha, con subtítulo
        fourth: 'Diseño 4', // 2col, 2row, imagen parcial superior, con subtítulo
      },
      defaultValue: 'first',
    }),
  }),
}

export default CardFeaturedStoryAuthor
