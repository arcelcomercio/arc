import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { LANDSCAPE_S } from '../../../utilities/constants/image-sizes'
import { dateDayAndMonth } from '../../../utilities/date-time/dates'
import {
  featuredStoryFields,
  includeContentBasic,
} from '../../../utilities/included-fields'
import StoryData from '../../../utilities/story-data'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

const classes = {
  container: 'saltar-intro-separator-premiere',
  titleSeparator: 'saltar-intro-separator-premiere__title--separator',
  titleSeparatorBox: 'saltar-intro-separator-premiere__box-title--separator',
  list: 'saltar-intro-separator-premiere__list',
  item: 'saltar-intro-separator-premiere__item',
  title: 'saltar-intro-separator-premiere__title',
  date: 'saltar-intro-separator-premiere__date',
  boxSeeMore: 'saltar-intro-separator-premiere__box-see-more',
  seeMore: 'saltar-intro-separator-premiere__see-more',
  image: 'saltar-intro-separator-premiere__image',
  imageBox: 'saltar-intro-separator-premiere__image-box',
  plataform: 'saltar-intro-separator-premiere__plataform',
  plataformReversing: 'saltar-intro-separator-premiere__plataform--reversing',
}

const SaltarIntroSeparatorPremiere: React.FC = (props) => {
  const {
    customFields: {
      storiesConfig: { contentService = '', contentConfigValues = {} } = {},
      seeMoreLink = '',
    } = {},
  } = props
  const { arcSite, contextPath, deployment, isAdmin } = useAppContext()

  const dataTransform = (data) => {
    const { content_elements: contentElements = [] } = data || {}

    const dataFormat = new StoryData({
      deployment,
      contextPath,
      arcSite,
    })

    const newData =
      contentElements.length > 0
        ? contentElements.map((story) => {
            dataFormat.__data = story
            return { ...dataFormat.attributesRaw }
          })
        : []

    return newData
  }

  const includedFields = `${featuredStoryFields},${includeContentBasic},content_elements.subtype,content_elements.embed,content_elements.embed.config`

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, {
        presets: `${LANDSCAPE_S}:159x235`,
        includedFields,
      }),
      filter: schemaFilter(arcSite),
      transform: dataTransform,
    }) || []

  return (
    <div className={classes.container}>
      <div className={classes.titleSeparatorBox}>
        <div className={classes.titleSeparator}>ESTRENOS DE LA SEMANA</div>
      </div>
      <div className={classes.boxSeeMore}>
        <a itemProp="url" href={seeMoreLink} className={classes.seeMore}>
          Ver más
          <svg
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            viewBox="0 0 28.44 26.27">
            <path
              d="M24.79,14.26c0,5.59-4.55,10.09-10.09,10.09c-5.59,0-10.09-4.49-10.09-10.09c0-5.54,4.49-10.03,10.09-10.03
	C20.24,4.23,24.79,8.72,24.79,14.26z M22.18,14.26l-5.59-5.56c-0.61-0.61-1.51-0.61-2.14,0c-0.29,0.26-0.41,0.67-0.41,1.04
	c0,0.41,0.12,0.78,0.41,1.1c0,0,0.96,0.96,1.94,1.94H8.7c-0.81,0-1.51,0.64-1.51,1.48c0,0.84,0.7,1.51,1.51,1.51h7.68
	c-0.99,1.04-1.94,1.94-1.94,1.94c-0.29,0.32-0.41,0.72-0.41,1.1c0,0.41,0.12,0.75,0.41,1.07c0.64,0.61,1.54,0.61,2.14,0L22.18,14.26
	z"
            />
          </svg>
        </a>
      </div>
      <div className={classes.list}>
        {data.map((row, i) => {
          const {
            websiteLink = '',
            multimediaLandscapeS,
            multimediaLazyDefault,
            multimediaCaption,
          } = row || {}
          const {
            embed: {
              config: {
                title = '',
                release_date: releaseDate = '',
                premiere_image: premiereImage = null,
                plataform = '',
              } = {},
            } = {},
          } = row?.dataSaltarIntro || {}
          return (
            <div className={classes.item} key={i}>
              <a itemProp="url" className={classes.imageBox} href={websiteLink}>
                <picture>
                  <img
                    className={`${isAdmin ? '' : 'lazy'} ${classes.image}`}
                    src={
                      isAdmin
                        ? premiereImage || multimediaLandscapeS
                        : multimediaLazyDefault
                    }
                    data-src={premiereImage || multimediaLandscapeS}
                    alt={multimediaCaption || title}
                  />
                </picture>
                <div className={classes.plataform}>
                  <span className={classes.plataformReversing}>
                    {plataform}
                  </span>
                </div>
              </a>
              <div className={classes.date}>
                {dateDayAndMonth(releaseDate) || '-'}
              </div>
              <a href={websiteLink} className={classes.title}>
                {title}
              </a>
            </div>
          )
        })}
      </div>
    </div>
  )
}

SaltarIntroSeparatorPremiere.propTypes = {
  customFields,
}

SaltarIntroSeparatorPremiere.label = 'Separador de Estrenos - Saltar Intro'
SaltarIntroSeparatorPremiere.static = true

export default SaltarIntroSeparatorPremiere
