import React from 'react'
import { useFusionContext } from 'fusion:context'
import { useContent } from 'fusion:content'

import schemaFilter from './_dependencies/schema-filter'
import StorySeparatorChildItem from './_children/item'
import StoryData from '../../../utilities/story-data'
import UtilListKey from '../../../utilities/list-keys'
import {
  includePromoItems,
  includePrimarySection,
} from '../../../utilities/included-fields'

const classes = {
  separator: 'story-separator block non-tablet non-mobile w-full h-auto',
  body: 'story-separator__body flex mt-0 mb-0 p-20',
}

const CONTENT_SOURCE = 'story-feed-by-section'

const StorySeparator = () => {
  const { deployment, contextPath, arcSite, globalContent } = useFusionContext()
  const { taxonomy: { primary_section: { path: section } = {} } = {} } =
    globalContent || {}

  const data = useContent({
    source: CONTENT_SOURCE,
    query: {
      website: arcSite,
      section,
      stories_qty: 7,
      presets: 'portrait_xs:75x90',
      includedFields: `websites.${arcSite}.website_url,canonical_url,headlines.basic,${includePromoItems},${includePrimarySection}`,
    },
    filter: schemaFilter(arcSite),
  })

  const renderItems = (stories, excluir) => {
    const storyData = new StoryData({
      deployment,
      contextPath,
      arcSite,
      defaultImgSize: 'sm',
    })

    let key = 0
    return (
      stories &&
      stories.map((story, i) => {
        if (key === 4) return false
        const { website_url: websiteUrl } = story
        if (websiteUrl === excluir) return false
        storyData.__data = story
        key += 1

        const filteredData = {
          title: storyData.title,
          link: storyData.websiteLink,
          section: storyData.primarySection,
          sectionLink: storyData.primarySectionLink,
          multimediaPortraitXS: storyData.multimediaPortraitXS,
          multimediaType: storyData.multimediaType,
        }
        return (
          <StorySeparatorChildItem
            data={filteredData}
            key={UtilListKey(i)}
            arcSite={arcSite}
          />
        )
      })
    )
  }

  const { content_elements: stories = [] } = data || {}
  const { website_url: excluir } = globalContent || {}

  return (
    <div className={classes.separator}>
      <div className={classes.body}>{renderItems(stories, excluir)}</div>
    </div>
  )
}

StorySeparator.label = 'Separador de artículo'
StorySeparator.static = true

export default StorySeparator
