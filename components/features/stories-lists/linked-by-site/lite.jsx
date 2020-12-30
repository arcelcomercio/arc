/* eslint-disable import/no-unresolved */
import * as React from 'react'
import { useContent } from 'fusion:content'
import { useAppContext } from 'fusion:context'
import getProperties from 'fusion:properties'

import StoryData from '../../../utilities/story-data'
import { includePromoItems } from '../../../utilities/included-fields'
import { getAssetsPath } from '../../../utilities/assets'

import customFields from './_dependencies/custom-fields'
import StoriesListLinkedBySiteChild from './_lite/_children/linked-by-site'

const StoriesListLinkedBySite = props => {
  const { arcSite, contextPath, deployment } = useAppContext()

  const {
    customFields: {
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
      premium: { logo },
    },
  } = getProperties(arcSite)

  const presets = 'no-presets'
  const includedFields = `headlines.basic,promo_items.basic_html.content,${includePromoItems},websites.${website ||
    arcSite}.website_url`

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
  const { content_elements: resaizedContentElements = [] } = data || {}
  const stories = resaizedContentElements.map(story => {
    storyData._data = story

    const { websites = {} } = story || {}
    const { website_url: websiteUrl = '' } = websites[website] || {}

    const { title, websiteLink, multimedia, isPremium } = storyData

    return {
      title,
      websiteLink: `${siteUrl}${websiteUrl ||
        websiteLink}${`?ref=recomendados&source=${arcSite}`}`,
      multimedia,
      isPremium,
    }
  })

  return (
    <StoriesListLinkedBySiteChild
      siteName={siteName}
      stories={stories}
      isTargetBlank={isTargetBlank}
      titleField={titleField}
      subtitleField={subtitleField}
      logo={`${getAssetsPath(
        arcSite,
        contextPath
      )}/resources/dist/${arcSite}/images/${logo}?d=1`}
      arcSite={arcSite}
    />
  )
}

StoriesListLinkedBySite.propTypes = {
  customFields,
}

StoriesListLinkedBySite.label = 'Recomendados por marca'
StoriesListLinkedBySite.static = true

export default StoriesListLinkedBySite
