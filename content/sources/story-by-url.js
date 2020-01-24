import { resizerSecret } from 'fusion:environment'
import { addResizedUrls } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStory } from '../../components/utilities/helpers'

let website = ''

const schemaName = 'story'

const params = [
  {
    name: 'website_url',
    displayName: 'URL de la nota',
    type: 'text',
  },
  {
    name: 'published',
    displayName: 'Esta Nota esta publica? (Defecto es true)',
    type: 'text',
  },
]

const resolve = (key = {}) => {
  const hasWebsiteUrl = Object.prototype.hasOwnProperty.call(key, 'website_url')
  if (!hasWebsiteUrl)
    throw new Error('Esta fuente de contenido requiere una URI y un sitio web')

  website = key['arc-site'] || 'Arc Site no está definido'
  const { website_url: websiteUrl, published = '' } = key
  const isPublished = published === 'false' ? 'false' : 'true'

  const sourceInclude = `&included_fields=type,created_date,revision,last_updated_date,canonical_url,headlines,owner,content_restrictions,subheadlines,taxonomy,promo_items,display_date,credits,first_publish_date,websites,publish_date,website,website_url,redirect_url`

  const requestUri = `/content/v4/stories/?website_url=${websiteUrl}&website=${website}&published=${isPublished}${sourceInclude}`
  return requestUri
}

const transform = data => {
  if (data.type === 'redirect') return data
  const { resizerUrl } = getProperties(website)

  const { promo_items: { basic_gallery: basicGallery } = {} } = data

  const dataStory = data || {}

  if (basicGallery && basicGallery.promo_items) {
    const { content_elements: galleryContentElements } = basicGallery || {}
    if (!galleryContentElements)
      dataStory.promo_items.basic_gallery.content_elements = []
  }

  return (
    addResizedUrlsToStory(
      [dataStory],
      resizerUrl,
      resizerSecret,
      addResizedUrls
    )[0] || null
  )
}

export default {
  resolve,
  transform,
  schemaName,
  params,
  ttl: 300,
}
