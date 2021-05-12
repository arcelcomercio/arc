import { ConentSourceBase } from 'types/content-source'
import { Story } from 'types/story'

import { getResizedImageData } from '../../components/utilities/resizer/resizer'

export type StoryByTagQuery = {
  name?: string
  feedOffset: number
  presets?: string
}

type StoryByTagParams = StoryByTagQuery & ConentSourceBase

const schemaName = 'story'

const params = [
  {
    name: 'name',
    displayName: 'Slug de la etiqueta',
    type: 'text',
  },
  {
    name: 'feedOffset',
    displayName: 'Número de la noticia',
    type: 'number',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes (opcional)',
    type: 'text',
  },
]

const resolve = (key: StoryByTagParams): string => {
  const website = key?.['arc-site'] || 'Arc Site no está definido'
  const { name, feedOffset } = key

  const slugSearch = name ? `AND+taxonomy.tags.slug:${name.toLowerCase()}+` : ''
  const dateLimiter = slugSearch
    ? ''
    : '+AND+publish_date:%7Bnow-7d%20TO%20*%7D'

  const q = `canonical_website:${website}+${slugSearch}AND+type:story${dateLimiter}`

  const excludedFields =
    '&_sourceExclude=owner,address,workflow,label,content_elements,type,revision,language,source,distributor,planning,additional_properties,publishing,website'

  return `/content/v4/search/published?q=${q}&size=1&from=${
    feedOffset || 0
  }&sort=display_date:desc&website=${website}&single=true${excludedFields}`
}

const transform = (
  data: Story,
  { 'arc-site': arcSite, presets }: StoryByTagParams
): Story => getResizedImageData(data, presets, arcSite) as Story

const source = {
  resolve,
  transform,
  schemaName,
  params,
  ttl: 300,
}

export default source
