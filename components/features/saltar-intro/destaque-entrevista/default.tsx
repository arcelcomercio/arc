import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
// import getProperties from 'fusion:properties'
import * as React from 'react'

import {
  LANDSCAPE_MD,
  LANDSCAPE_S,
} from '../../../utilities/constants/image-sizes'
import {
  featuredStoryFields,
  includeContentBasic,
} from '../../../utilities/included-fields'
import StoryData from '../../../utilities/story-data'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

const classes = {
  container: 'saltar-intro-destaque-entrevista',
  containerCard: 'saltar-intro-destaque-entrevista--card',
  containerTrailer: 'saltar-intro-destaque-entrevista--trailer',
  category: 'saltar-intro-destaque-entrevista__category',
  categoryLink: 'saltar-intro-destaque-entrevista__category-link',
  image: 'saltar-intro-destaque-entrevista__image',
  imageBox: 'saltar-intro-destaque-entrevista__image-box',
  title: 'saltar-intro-destaque-entrevista__title',
  subtitle: 'saltar-intro-destaque-entrevista__subtitle',
  author: 'saltar-intro-destaque-entrevista__author',
  interviewed: 'saltar-intro-destaque-entrevista__interviewed',
  rol: 'saltar-intro-destaque-entrevista__rol',
  info: 'saltar-intro-destaque-entrevista__info',
}
const SaltarIntroDestaqueEntrevista: React.FC = (props) => {
  const {
    customFields: {
      storyConfig: { contentService = '', contentConfigValues = {} } = {},
      isCard = false,
      isTrailer = false,
    } = {},
  } = props

  const { arcSite, contextPath, deployment, isAdmin } = useAppContext()

  // const { siteName } = getProperties(arcSite)
  const includedFields = `${featuredStoryFields},${includeContentBasic},content_elements.subtype,content_elements.embed,content_elements.embed.config,subheadlines`

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, {
        presets: `${LANDSCAPE_S}:397x274,${LANDSCAPE_MD}:634x387`,
        includedFields,
      }),
      filter: schemaFilter(arcSite),
    }) || {}

  const {
    primarySection,
    primarySectionLink,
    title,
    subTitle,
    websiteLink,
    author,
    authorLink,
    multimediaLandscapeMD,
    multimediaLandscapeS,
    multimediaCaption,
    multimediaLazyDefault,
    dataSaltarIntro: {
      embed: {
        config: {
          interviewed = '-',
          career_interviewed: careerInterviewed = '-',
          plataform = '-',
        } = {},
      } = {},
    },
  } = new StoryData({
    data,
    deployment,
    contextPath,
    arcSite,
  })

  const classCard = isCard ? classes.containerCard : ''
  const classTrailer = isTrailer ? classes.containerTrailer : ''

  return (
    <div className={`${classes.container} ${classCard} ${classTrailer}`}>
      <div className={classes.info}>
        {isTrailer ? (
          <>
            <h3 itemProp="name" className={classes.category}>
              <a
                itemProp="url"
                className={classes.categoryLink}
                href={primarySectionLink}>
                {plataform || primarySection}
              </a>
            </h3>
          </>
        ) : (
          <>
            <div className={classes.interviewed}>{interviewed}</div>
            <div className={classes.rol}>{careerInterviewed}</div>
          </>
        )}

        <a href={websiteLink} className={classes.title}>
          {title}
        </a>
        {isTrailer ? (
          <>
            <a className={classes.subtitle} href={websiteLink}>
              {subTitle}
            </a>
          </>
        ) : (
          <></>
        )}
        <a itemProp="url" href={authorLink} className={classes.author}>
          {author}
        </a>
      </div>
      <a itemProp="url" className={classes.imageBox} href={websiteLink}>
        <picture>
          <source
            className={isAdmin ? '' : 'lazy'}
            media="(max-width: 620px)"
            type="image/jpeg"
            srcSet={isAdmin ? multimediaLandscapeS : multimediaLazyDefault}
            data-srcset={multimediaLandscapeS}
          />
          <img
            className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
            src={isAdmin ? multimediaLandscapeMD : multimediaLazyDefault}
            data-src={multimediaLandscapeMD}
            alt={multimediaCaption || title}
          />
        </picture>
      </a>
    </div>
  )
}

SaltarIntroDestaqueEntrevista.propTypes = {
  customFields,
}

SaltarIntroDestaqueEntrevista.label = 'Destaque Entrevista -  Saltar Intro'
SaltarIntroDestaqueEntrevista.static = true

export default SaltarIntroDestaqueEntrevista
