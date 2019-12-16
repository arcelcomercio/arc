import { useContent } from 'fusion:content'
import schemaFilter from '../features/stories-lists/card/_dependencies/schema-filter'
import { removeLastSlash } from '../utilities/helpers'

const StoriesRecent = ({ primarySectionLink, id, arcSite, cant = 6 }) => {
  const params = {
    section: removeLastSlash(primarySectionLink),
    stories_qty: cant,
  }

  const storyData =
    useContent({
      source: 'story-feed-by-section-url',
      query: params,
      filter: schemaFilter(arcSite),
    }) || {}

  const { content_elements: contentElements = [] } = storyData || {}
  const dataInterest = contentElements
    .map(story => {
      return story && story._id !== id ? story : ''
    })
    .filter(String)

  return dataInterest
}

export default StoriesRecent
