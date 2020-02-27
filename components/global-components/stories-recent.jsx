import { useContent } from 'fusion:content'
import schemaFilter from '../features/stories-lists/card/_dependencies/schema-filter'
import { removeLastSlash } from '../utilities/helpers'
import { includePromoItems } from '../utilities/included-fields'

const StoriesRecent = ({ primarySectionLink, id, arcSite, cant = 6 }) => {
  const params = {
    section: removeLastSlash(primarySectionLink),
    stories_qty: cant,
    presets: 'landscape_md:314x157',
    includedFields: `_id,headlines.basic,websites.${arcSite}.website_url,display_date,publish_date,${includePromoItems}`,
  }

  const storyData =
    useContent({
      source: 'story-feed-by-section',
      query: params,
      filter: schemaFilter(arcSite,true),
    }) || {}

  const { content_elements: contentElements = [] } = storyData || {}
  const dataInterest =
    contentElements &&
    contentElements
      .map(story => {
        return story && story._id !== id ? story : ''
      })
      .filter(String)
  return dataInterest || []
}

export default StoriesRecent
