import React from 'react'
import { useFusionContext } from 'fusion:context'

import StoryData from '../../../utilities/story-data'
import {
  formatHtmlToText,
  getDateSeo,
  nbspToSpace,
  msToTime,
} from '../../../utilities/helpers'
import { createResizedParams } from '../../../utilities/resizer/resizer'
import {
  ELEMENT_TEXT,
  ELEMENT_LIST,
  ELEMENT_CUSTOM_EMBED,
} from '../../../utilities/constants/element-types'

import { getAssetsPathVideo } from '../../../utilities/assets'

const StructuredRecipe = () => {
  const {
    globalContent: data,
    arcSite,
    contextPath,
    siteProperties,
  } = useFusionContext()
  const { siteUrl = '' } = siteProperties

  const {
    title,
    tags,
    displayDate: publishDate,
    subTitle = arcSite,
    imagePrimarySeo,
    primarySection,
    videoSeo,
    contentElements,
    seoKeywords,
  } = new StoryData({ data, arcSite, contextPath, siteUrl })

  const publishDateZone = getDateSeo(publishDate)

  const imagesSeoItems = imagePrimarySeo.map(({ url = '' } = {}) => {
    const { large } =
      createResizedParams({
        url,
        presets: 'large:1200x800',
        arcSite,
      }) || {}
    return large || url
  })

  const imagenData = imagesSeoItems[1] ? imagesSeoItems[0] : imagesSeoItems

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
    ({ url, caption, description, urlImage, date, duration } = {}) => {
      const {
        amp_image_1x1: ampVideo1x1 = urlImage,
        amp_image_4x3: ampVideo4x3 = urlImage,
        amp_image_16x9: ampVideo16x9 = urlImage,
      } =
        createResizedParams({
          url: urlImage || url,
          presets:
            'amp_image_1x1:1200x1200,amp_image_4x3:1200x900,amp_image_16x9:1200x675,large:980x528',
          arcSite,
        }) || {}
      const image = `["${ampVideo1x1}", "${ampVideo4x3}", "${ampVideo16x9}"]`

      return `{ 
        "@type":"VideoObject",  
        "name":"${formatHtmlToText(caption || arcSite)}", 
        "thumbnailUrl": ${image},  
        "description":"${formatHtmlToText(description || caption || arcSite)}", 
        "contentUrl": "${getAssetsPathVideo(arcSite, url)}",  
        "uploadDate": "${date}", 
        "duration": "${msToTime(duration, false)}" } `
    }
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
    "datePublished":"${publishDateZone}",
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
