import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'
import React from 'react'

import {
  includePrimarySection,
  includePromoItems,
} from '../../../utilities/included-fields'
import UtilListKey from '../../../utilities/list-keys'
import StoryData from '../../../utilities/story-data'
import StorySeparatorChildItem from './_children/item'
import schemaFilter from './_dependencies/schema-filter'

const classes = {
  separator: 'story-separator block non-tablet non-mobile w-full h-auto',
  body: 'story-separator__body flex mt-0 mb-0 p-20',
}

const CONTENT_SOURCE = 'story-feed-by-section'

const StorySeparator = () => {
  const { deployment, contextPath, arcSite, globalContent } = useFusionContext()
  const { websites = {} } = globalContent || {}
  const { website_section: { path: section = '' } = {} } =
    websites[arcSite] || {}
  const data = useContent({
    source: CONTENT_SOURCE,
    query: {
      website: arcSite,
      section,
      stories_qty: 7,
      presets: 'portrait_xs:75x90',
      includedFields: `websites.${arcSite}.website_url,canonical_url,headlines.basic,${includePromoItems},${includePrimarySection(
        { arcSite }
      )}`,
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
