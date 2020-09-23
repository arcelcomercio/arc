import { getResizedImageData } from '../../components/utilities/resizer/resizer'

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

const transform = (data, { 'arc-site': arcSite, presets }) => {
  if (data.type === 'redirect' || presets === 'no-presets') return data
  return getResizedImageData(data, presets, arcSite)
}

export default {
  resolve,
  transform,
  schemaName,
  params,
  ttl: 300,
}
