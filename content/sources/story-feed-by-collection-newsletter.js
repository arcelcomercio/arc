// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment'
import getProperties from 'fusion:properties'
import { getResizedImageData } from '../../components/utilities/resizer/resizer'

const schemaName = 'stories-dev'

const params = [
  {
    name: 'id',
    displayName: 'Slug de la etiqueta',
    type: 'text',
  },
]

const options = {
  gzip: true,
  json: true,
  auth: {
    bearer: ARC_ACCESS_TOKEN,
  },
}

const sortStories = (collectionIds, storiesByCollection) => {
  const sortedStories = []

  collectionIds.forEach(id => {
    const foundStory = storiesByCollection.find(story => story._id === id)

    if (foundStory) {
      sortedStories.push(foundStory)
    }
  })

  return sortedStories
}

const fetch = ({ 'arc-site': website, id }) => {
  if (!id)
    throw new Error('Esta fuente de contenido necesita el ID de la collección')
  return request({
    uri: `${CONTENT_BASE}/content/v4/collections?website=${website}&_id=${id}`,
    ...options,
  }).then(collection => {
    const {
      headlines: { basic: name } = {},
      description: { basic: description } = {},
      content_elements: contentElements = [],
    } = collection || {}

    const ids = contentElements.map((story = {}) => story._id)

    return request({
      uri: `${CONTENT_BASE}/content/v4/ids?ids=${ids.toString()}&website=${website}&included_fields=content_elements,headlines.basic,subheadlines.basic,websites,content_restrictions,display_date,taxonomy.primary_section.path,taxonomy.primary_section.name,credits`,
      ...options,
    }).then(response => {
      const { content_elements: stories } = response || {}

      return {
        content_elements: contentElements
          .filter(collectionStory => collectionStory._id)
          .map(collectionStory => ({
            headlines: collectionStory.headlines,
            description: collectionStory.description,
            promo_items: collectionStory.promo_items,
          })),
        stories: sortStories(ids, stories),
        websked: {
          name,
          description,
        },
      }
    })
  })
}

const transform = (data, { 'arc-site': arcSite }) => {
  const { siteName } = getProperties(arcSite)
  const collectionData = getResizedImageData(data, 'newsletter', arcSite)

  return {
    ...collectionData,
    siteName,
  }
}

const source = {
  fetch,
  transform,
  schemaName,
  params,
  ttl: 120,
}

export default source
