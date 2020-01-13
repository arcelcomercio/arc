import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import {
  addResizedUrlsToStory,
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

const resolve = (key = {}) => {
  website = key['arc-site'] || 'Arc Site no está definido'
  const { section, stories_qty: storiesQty = 6 } = key

  /** Para enviar params a transform luego */
  globalParams = {
    section_name: formatSlugToText(section) || 'Todas',
    section: section || 'todas',
  }

  let queryFilter = ''

  // Si se filtra por seccion se usa ?body, sino, se usa ?q
  if (section === 'todas') {
    queryFilter = `q=canonical_website:${website}+AND+type:story`
  } else {
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
            },
          ],
        },
      },
    }

    queryFilter = `body=${encodeURI(JSON.stringify(body))}`
  }

  const promoItems = (type = '') => {
    return `${type}promo_items.basic.caption,${type}promo_items.basic.url,${type}promo_items.basic.subtitle,${type}promo_items.basic.width,${type}promo_items.basic.height,${type}promo_items.basic.type,${type}promo_items.basic.additional_properties,`
  }
  const includedFields = `&_sourceInclude=headlines.basic,websites.${website}.website_url,canonical_url,website_url,display_date,_id,type,${promoItems()}promo_items.basic_gallery.caption,promo_items.basic_gallery.url,promo_items.basic_gallery.subtitle,promo_items.basic_gallery.width,promo_items.basic_gallery.height,promo_items.basic_gallery.type,promo_items.basic_gallery.additional_properties,${promoItems(
    'promo_items.basic_gallery.'
  )}promo_items.basic_gallery.content_elements,promo_items.basic_video.headlines.basic,promo_items.basic_video.type,promo_items.basic_video.embed_html,promo_items.basic_video.duration,${promoItems(
    'promo_items.basic_video.'
  )}promo_items.basic_video.streams`

  return `/content/v4/search/published?${queryFilter}&sort=display_date:desc&website=${website}&from=0&size=${storiesQty}${includedFields}`
}

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

const source = {
  resolve,
  schemaName,
  transform,
  params,
  ttl: 300,
}

export default source
