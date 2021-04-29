import { ConentSourceBase } from 'types/content-source'
import { Story } from 'types/story'

import { getResizedImageData } from '../../components/utilities/resizer/resizer'

export type StoryByUrlQuery = {
  website_url: number
  published?: string
  presets?: string
}

type StoryByUrlParams = StoryByUrlQuery & ConentSourceBase

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

const resolve = (key: StoryByUrlParams): string | never => {
  const hasWebsiteUrl = Object.prototype.hasOwnProperty.call(key, 'website_url')
  if (!hasWebsiteUrl)
    throw new Error('Esta fuente de contenido requiere una URI y un sitio web')

  const website = key?.['arc-site'] || 'Arc Site no está definido'
  const { website_url: websiteUrl, published = '' } = key
  const isPublished = published === 'false' ? 'false' : 'true'

  const sourceInclude = `&included_fields=type,created_date,revision,last_updated_date,canonical_url,headlines,owner,content_restrictions,subheadlines,taxonomy,promo_items,display_date,credits,first_publish_date,websites,publish_date,website,website_url,redirect_url`

  const requestUri = `/content/v4/stories/?website_url=${websiteUrl}&website=${website}&published=${isPublished}${sourceInclude}`
  return requestUri
}

const transform = (
  data: Story,
  { 'arc-site': arcSite, presets }: StoryByUrlParams
): Story => {
  if (data.type === 'redirect' || presets === 'no-presets') return data
  return getResizedImageData(data, presets, arcSite) as Story
}

export default {
  resolve,
  transform,
  schemaName,
  params,
  ttl: 300,
}
