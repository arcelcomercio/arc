import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import * as React from 'react'

import { LANDSCAPE_S } from '../../../utilities/constants/image-sizes'
import {
  featuredStoryFields,
  includeContentBasic,
} from '../../../utilities/included-fields'
import StoryData from '../../../utilities/story-data'
import customFields from './_dependencies/custom-fields'
import schemaFilter from './_dependencies/schema-filter'

const classes = {
  container: 'saltar-intro-card-calendario__container',
  list: 'saltar-intro-card-calendario__list',
  item: 'saltar-intro-card-calendario__item',
  title: 'saltar-intro-card-calendario__title',
  plataform: 'saltar-intro-card-calendario__plataform',
  temporada: 'saltar-intro-card-calendario__temporada',
  estreno: 'saltar-intro-card-calendario__estreno',
  image: 'saltar-intro-card-calendario__image',
}

const SaltarIntroCardCalendario = (props: any) => {
  const {
    customFields: {
      storiesConfig: { contentService = '', contentConfigValues = {} } = {},
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
        presets: `${LANDSCAPE_S}:219x117`,
        includedFields,
      }),
      filter: schemaFilter(arcSite),
      transform: dataTransform,
    }) || []

  return (
    <div className={classes.container}>
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
                chapter = '',
                premiere_image: premiereImage = null,
                plataform = '',
              } = {},
            } = {},
          } = row?.dataSaltarIntro || {}
          return (
            <div className={classes.item} key={i}>
              <a itemProp="url" href={websiteLink}>
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
              </a>
              <a href={websiteLink} className={classes.title}>
                {title || '-'}
              </a>
              <div className={classes.plataform}>
                <span>{plataform || '-'}</span>
              </div>
              <span className={classes.temporada}>{chapter || '-'}</span>
              <span className={classes.estreno}>estreno</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

SaltarIntroCardCalendario.propTypes = {
  customFields,
}

SaltarIntroCardCalendario.label = 'Card Calendario - Saltar Intro'
SaltarIntroCardCalendario.static = true

export default SaltarIntroCardCalendario
