import * as React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import StoryData from '../../../utilities/story-data'
import { formatHtmlToText, nbspToSpace } from '../../../utilities/parse/strings'
import { localISODate } from '../../../utilities/date-time/dates'
import {
  ELEMENT_TEXT,
  ELEMENT_LIST,
  ELEMENT_CUSTOM_EMBED,
} from '../../../utilities/constants/element-types'

import VideoSeoItem from './_children/video-item'

const StructuredRecipe = () => {
  const { globalContent: data, arcSite, contextPath } = useAppContext()
  const { siteUrl = '' } = getProperties(arcSite)

  const {
    title,
    tags,
    displayDate,
    subTitle = arcSite,
    imagePrimarySeo,
    primarySection,
    videoSeo,
    contentElements,
    seoKeywords,
  } = new StoryData({ data, arcSite, contextPath, siteUrl })

  const displayDateZone = localISODate(displayDate)

  const {
    resized_urls: { imagenData },
  } =
    useContent({
      source: 'photo-resizer',
      query: {
        url: imagePrimarySeo[0]?.url,
        presets: 'imagenData:1200x800',
      },
    }) || {}

  const seoKeyWordsStructurada = seoKeywords.map(
    item => `"${formatHtmlToText(item)}"`
  )
  const listItemsTagsKeywords = tags.map(
    ({ description }) => `"${formatHtmlToText(description)}"`
  )
  const keywordsList = `[${
    seoKeyWordsStructurada[0]
      ? seoKeyWordsStructurada.map(item => item)
      : listItemsTagsKeywords.map(item => item)
  }]`

  const clearBrTag = paragraph => {
    return nbspToSpace(paragraph.trim().replace(/<\/?br[^<>]+>/, ''))
  }

  const clearHtml = paragraph => {
    return nbspToSpace(
      clearBrTag(
        paragraph
          .trim()
          .replace(/(<([^>]+)>)/gi, '')
          .replace('   ', ' ')
          .replace('  ', ' ')
      )
    )
  }

  const ingredientList = () => {
    let initFetch = false
    let arrayIngredients = []
    contentElements.forEach(({ type, content = '', items = [] }) => {
      if (type === ELEMENT_TEXT && content === '[fin-ingredientes]')
        initFetch = false
      if (initFetch) {
        if (type === ELEMENT_LIST)
          arrayIngredients = items.map(
            el => el.type === ELEMENT_TEXT && `"${clearHtml(el.content)}"`
          )
        else arrayIngredients.push(content)
      }
      if (type === ELEMENT_TEXT && content === '[inicio-ingredientes]')
        initFetch = true
    })
    return arrayIngredients
  }

  const instructionsContent = () => {
    let initFetch = false
    let arrayInstructions = []
    contentElements.forEach(({ type, content = '', items = [] }) => {
      if (type === ELEMENT_TEXT && content === '[fin-instrucciones]')
        initFetch = false
      if (initFetch) {
        switch (type) {
          case ELEMENT_LIST:
            arrayInstructions = items.map(
              el => el.type === ELEMENT_TEXT && `"${el.content}"`
            )
            break
          case ELEMENT_TEXT:
            arrayInstructions.push(
              `"${
                content.match(/^\d{1,2}.\s?(.*)/)
                  ? content.match(/^\d{1,2}.\s?(.*)/)[1]
                  : content
              }"`
            )
            break
          default:
            break
        }
      }
      if (type === ELEMENT_TEXT && content === '[inicio-instrucciones]')
        initFetch = true
    })
    return arrayInstructions
  }

  const instructionList = instructionsContent()

  const instructionsFormated = () => {
    return instructionList.map(el => {
      return `{ "@type":"HowToStep", "text": ${clearHtml(el)} }`
    })
  }

  const additionalData = () => {
    const arrayData = []
    contentElements.forEach(
      ({ type, subtype, embed: { config: configEmbed = {} } = {} }) => {
        if (
          type === ELEMENT_CUSTOM_EMBED &&
          subtype === 'recipe_data' &&
          configEmbed
        )
          arrayData.push(configEmbed)
      }
    )
    return arrayData
  }
  const {
    prepTime = '',
    totalTime = '',
    recipeCuisine = '',
    recipeYield = '',
    puntuation = '',
    countReviews = '',
  } = additionalData()[0] || {}

  const videoSeoItems = videoSeo.map(
    ({ url, caption, description, urlImage, date, duration } = {}) => (
      <VideoSeoItem
        url={url}
        caption={caption}
        description={description}
        urlImage={urlImage}
        date={date}
        duration={duration}
        arcSite={arcSite}
      />
    )
  )

  const formatTime = string =>
    string
      .trim()
      .toLowerCase()
      .replace(/minutos|minuto/, 'M')
      .replace(/segundos|segundo/, 'S')
      .replace(/y|,|\./, '')
      .split(' ')
      .join('')

  const structuredData = `{
    "@context":"https://schema.org",
    "@type":"Recipe",
    "author":{
      "@type":"Organization",
      "name":"Mag"
    },
    "name":"${formatHtmlToText(title)}",
    "datePublished":"${displayDateZone}",
    "description":"${formatHtmlToText(subTitle)}",
    "image":"${imagenData}",
    "recipeIngredient": [${ingredientList()}],
    "recipeInstructions":[${instructionsFormated()}],
    "prepTime":"${prepTime ? `PT${formatTime(prepTime)}` : ''}",
    "cookTime":"${totalTime ? `PT${formatTime(totalTime)}` : ''}",
    "keywords": ${keywordsList},
    "recipeCategory":"${primarySection}",
    "recipeCuisine":"${recipeCuisine}",
    "recipeYield": ${
      videoSeo.length > 0 || (puntuation && countReviews)
        ? `"${recipeYield}",`
        : `"${recipeYield}"`
    }
    ${
      videoSeo.length > 0
        ? `"video": [${videoSeoItems}]${puntuation && countReviews ? ',' : ''}`
        : ''
    }
    ${
      puntuation && countReviews
        ? `"aggregateRating":{
      "@type":"AggregateRating",
      "ratingValue":${puntuation},
      "reviewCount":${countReviews}}
    }`
        : ''
    }
  }`

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: structuredData }}
    />
  )
}

StructuredRecipe.label = 'Datos estructurado - Recetas'
StructuredRecipe.static = true

export default StructuredRecipe
