import { resizerSecret } from 'fusion:environment'
import getProperties from 'fusion:properties'
import { addResizedUrlsToStories } from '../../components/utilities/resizer'
import { sizeImg } from '../../components/utilities/config-params'

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
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes (opcional)',
    type: 'text',
  },
]

const transformImg = ({ contentElements, website, presets }) => {
  const { resizerUrl } = getProperties(website)
  return addResizedUrlsToStories({
    contentElements,
    resizerUrl,
    resizerSecret,
    presets,
  })
}

const resolve = (key = {}) => {
  const hasWebsiteUrl = Object.prototype.hasOwnProperty.call(key, 'website_url')
  if (!hasWebsiteUrl)
    throw new Error('Esta fuente de contenido requiere una URI y un sitio web')

  const website = key['arc-site'] || 'Arc Site no está definido'
  const { website_url: websiteUrl, published = '' } = key
  const isPublished = published === 'false' ? 'false' : 'true'

  const sourceInclude = `&included_fields=type,created_date,revision,last_updated_date,canonical_url,headlines,owner,content_restrictions,subheadlines,taxonomy,promo_items,display_date,credits,first_publish_date,websites,publish_date,website,website_url,redirect_url`

  const requestUri = `/content/v4/stories/?website_url=${websiteUrl}&website=${website}&published=${isPublished}${sourceInclude}`
  return requestUri
}

const transform = (data, { 'arc-site': website, presets }) => {
  if (data.type === 'redirect' || presets === 'no-presets') return data

  const { promo_items: { basic_gallery: basicGallery } = {} } = data
  const defaultPresets = sizeImg()
  let dataStory = data || {}

  if (basicGallery && basicGallery.promo_items) {
    const { content_elements: galleryContentElements } = basicGallery || {}
    if (!galleryContentElements)
      dataStory.promo_items.basic_gallery.content_elements = []
  }

  ;[dataStory] = transformImg({
    contentElements: [dataStory],
    website,
    presets:
      presets ||
      Object.keys(defaultPresets)
        .map(
          res =>
            `${res}:${defaultPresets[res].width}x${defaultPresets[res].height}`
        )
        .join(','),
  })

  return { ...dataStory }
}

export default {
  resolve,
  transform,
  schemaName,
  params,
  ttl: 300,
}
