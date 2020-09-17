/* eslint-disable import/no-unresolved */
import React from 'react'

import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import customFields from './_dependencies/custom-fields'
import StoryData from '../../../utilities/story-data'
import { getAssetsPath } from '../../../utilities/constants'
import { includePromoItems } from '../../../utilities/included-fields'

import StoriesListRecommenderBySiteChild from './_lite/_children/linked-by-site'

const StoriesListRecommenderBySite = props => {
  const {
    arcSite,
    contextPath,
    deployment,
    isAdmin,
    siteProperties,
  } = useFusionContext()
  const {
    customFields: {
      enabledContentManual,
      storiesManualConfig: {
        contentService: contentServiceManual = '',
        contentConfigValues: contentConfigManualValues = {},
      } = {},
      storiesConfig: { contentService = '', contentConfigValues = {} } = {},
      isTargetBlank = false,
      titleField,
      subtitleField,
    } = {},
  } = props

  const { website } = contentConfigValues
  const { siteUrl, siteName } = getProperties(website || arcSite) || {}

  const presets = 'landscape_s:234x161,square_s:150x150'

  const includedFields = `headlines.basic,promo_items.basic_html.content,content_restrictions.content_code,${includePromoItems},websites.${website ||
    arcSite}.website_url`

  const dataManual =
    (enabledContentManual &&
      useContent({
        source: contentServiceManual,
        query: Object.assign(contentConfigManualValues, {
          presets,
          includedFields,
        }),
      })) ||
    {}

  const data =
    useContent({
      source: contentService,
      query: Object.assign(contentConfigValues, { presets, includedFields }),
    }) || {}

  const storyData = new StoryData({
    arcSite,
    contextPath,
    deployment,
    defaultImgSize: 'sm',
  })

  const process = contentElements => {
    const stories = contentElements
      ? contentElements.map(story => {
          storyData._data = story

          const { websites = {} } = story || {}
          const site = websites[website] || {}
          const websiteUrl = site.website_url || ''

          const {
            title,
            websiteLink,
            multimediaLazyDefault,
            multimediaSquareS,
            multimediaLandscapeS,
            isPremium,
          } = storyData

          return {
            title,
            websiteLink: `${siteUrl}${websiteUrl ||
              websiteLink}${`?ref=recomendados&source=${arcSite}`}`,
            multimediaLazyDefault,
            multimediaSquareS,
            multimediaLandscapeS,
            isPremium,
          }
        })
      : []
    return stories
  }

  const { content_elements: resaizedContentElementsManual = [] } =
    dataManual || {}
  const storiesManual = process(resaizedContentElementsManual)

  const { content_elements: resaizedContentElements = [] } = data || {}
  const stories = process(resaizedContentElements)

  const {
    assets: {
      premium: { logo },
    },
  } = siteProperties || {}

  const params = {
    isAdmin,
    siteName,
    stories: [...storiesManual, ...stories],
    isTargetBlank: isTargetBlank ? { target: '_blank', rel: 'noopener' } : {},
    titleField,
    subtitleField,
    logo: `${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/${logo}?d=1`,
    arcSite,
  }

  return <StoriesListRecommenderBySiteChild {...params} />
}

StoriesListRecommenderBySite.propTypes = {
  customFields,
}

StoriesListRecommenderBySite.label = 'Recomendados Por Marca'
StoriesListRecommenderBySite.static = true

export default StoriesListRecommenderBySite
