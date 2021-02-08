import * as React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import customFields from './_dependencies/custom-fields'
import StoryData from '../../../utilities/story-data'
import { getAssetsPath } from '../../../utilities/assets'
import { includePromoItems } from '../../../utilities/included-fields'

import StoriesListRecommenderBySiteChild from './_lite/_children/linked-by-site'

const StoriesListRecommenderBySite = props => {
  const {
    arcSite,
    contextPath,
    deployment,
  } = useAppContext()
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
  const {
    assets: {
      premium: { logo }
    }
  } = getProperties(arcSite)

  // 'landscape_s:234x161,square_s:150x150'
  const presets = 'no-presets'
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
  })

  const process = contentElements => {
    const stories = contentElements
      ? contentElements.map(story => {
          storyData._data = story

          const { websites = {} } = story || {}
          const { website_url: websiteUrl } = websites[website] || {}

          const {
            title,
            websiteLink,
            multimedia,
            isPremium,
          } = storyData

          return {
            title,
            websiteLink: `${siteUrl}${websiteUrl ||
              websiteLink}${`?ref=recomendados&source=${arcSite}`}`,
            multimedia,
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

  return <StoriesListRecommenderBySiteChild
    siteName={siteName}
    stories={[...storiesManual, ...stories]}
    isTargetBlank={isTargetBlank}
    titleField={titleField}
    subtitleField={subtitleField}
    logo={`${getAssetsPath(
      arcSite,
      contextPath
    )}/resources/dist/${arcSite}/images/${logo}?d=1`}
    arcSite={arcSite}
  />
}

StoriesListRecommenderBySite.propTypes = {
  customFields,
}

StoriesListRecommenderBySite.label = 'Recomendados Por Marca'
StoriesListRecommenderBySite.static = true

export default StoriesListRecommenderBySite
