import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import {
  addResizedUrlsToStory,
  getActualDate,
  formatSlugToText,
} from '../../components/utilities/helpers'

let globalParams = {}

const schemaName = 'stories'
let website = ''

const params = [
  {
    name: 'section',
    displayName: 'Sección',
    type: 'text',
  },
  {
    name: 'stories_qty',
    displayName: 'Cantidad de historias',
    type: 'number',
  },
]

const transform = data => {
  const dataStories = data
  const { resizerUrl, siteName } = getProperties(website)
  dataStories.content_elements = addResizedUrlsToStory(
    dataStories.content_elements,
    resizerUrl,
    resizerSecret,
    addResizedUrls
  )
  dataStories.siteName = siteName

  const aux = {
    ...dataStories,
    params: {
      ...globalParams,
    },
  }
  return aux
}

const pattern = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'
  const { section, date, stories_qty: storiesQty = 6 } = key

  /** Para enviar params a transform luego */
  globalParams = {
    section_name: formatSlugToText(section) || 'Todas',
    section: section || 'todas',
    date: date || getActualDate(),
  }

  const body = {
    query: {
      bool: {
        must: [
          {
            term: {
              type: 'story',
            },
          },
          {
            term: {
              'revision.published': 'true',
            },
          },
        ],
      },
    },
  }

  /** Filtra por sección sólo cuando sea lo que se busca */
  if (globalParams.section !== 'todas') {
    body.query.bool.must.push({
      nested: {
        path: 'taxonomy.sections',
        query: {
          bool: {
            must: [
              {
                terms: {
                  'taxonomy.sections._id': [`${section}`],
                },
              },
              {
                term: {
                  'taxonomy.sections._website': website,
                },
              },
            ],
          },
        },
      },
    })
  }
  const prmoItems = (type = '') => {
    return `${type}promo_items.basic.caption,${type}promo_items.basic.url,${type}promo_items.basic.subtitle,${type}promo_items.basic.width,${type}promo_items.basic.height,${type}promo_items.basic.type,${type}promo_items.basic.additional_properties,`
  }
  const includedFields = `&_sourceInclude=headlines.basic,websites.${website}.website_url,canonical_url,website_url,display_date,_id,type,${prmoItems()}promo_items.basic_gallery.caption,promo_items.basic_gallery.url,promo_items.basic_gallery.subtitle,promo_items.basic_gallery.width,promo_items.basic_gallery.height,promo_items.basic_gallery.type,promo_items.basic_gallery.additional_properties,${prmoItems(
    'promo_items.basic_gallery.'
  )}promo_items.basic_gallery.content_elements,promo_items.basic_video.headlines.basic,promo_items.basic_video.type,promo_items.basic_video.embed_html,promo_items.basic_video.duration,${prmoItems(
    'promo_items.basic_video.'
  )}promo_items.basic_video.streams`

  // Por defecto, los API's están limitados a 100 notas como máximo (no va a llegar a 500)
  const requestUri = `/content/v4/search/published?sort=display_date:desc&website=${website}&body=${JSON.stringify(
    body
  )}&from=0&size=${storiesQty}${includedFields}`

  return requestUri
}

const resolve = key => pattern(key)

const source = {
  resolve,
  schemaName,
  transform,
  params,
  // cache: false,
  ttl: 120,
}

export default source
