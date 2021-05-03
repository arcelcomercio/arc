import { ConentSourceBase } from 'types/content-source'
import { Story } from 'types/story'

import { getResizedImageData } from '../../components/utilities/resizer/resizer'

export type StoryByIdQuery = {
  _id: string
  published?: string
  presets?: string
}

type StoryByIdParams = StoryByIdQuery & ConentSourceBase

const schemaName = 'story'

const params = [
  {
    name: '_id',
    displayName: 'ID de la nota',
    type: 'text',
  },
  {
    name: 'published',
    displayName: 'Publicada (por defecto: true)',
    type: 'text',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes (opcional)',
    type: 'text',
  },
]

const resolve = (key: StoryByIdParams): string => {
  const website = key?.['arc-site'] || 'Arc Site no está definido'

  const hasWebsiteId = Object.prototype.hasOwnProperty.call(key, '_id')
  if (!hasWebsiteId)
    throw new Error('Esta fuente de contenido requiere un id y un sitio web')

  const { _id: id, published } = key

  return `/content/v4/stories?_id=${id}&website=${website}&published=${
    published || 'true'
  }`
}

const transform = (
  data: Story,
  { 'arc-site': arcSite, presets }: StoryByIdParams
): Story => getResizedImageData(data, presets, arcSite) as Story

export default {
  resolve,
  transform,
  schemaName,
  params,
}
