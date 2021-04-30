import { ConentSourceBase } from 'types/content-source'
import { Gallery } from 'types/photo'

import { createResizedParams } from '../../components/utilities/resizer/resizer'

export type GalleryByIdQuery = {
  _id: string
  presets?: string
}

type GalleryByIdParams = GalleryByIdQuery & ConentSourceBase

const schemaName = 'photo'

const params = [
  {
    name: '_id',
    displayName: 'ID de la galería en Photo Center',
    type: 'text',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes (opcional)',
    type: 'text',
  },
]

const resolve = ({ _id: id }: GalleryByIdParams): string | never => {
  if (!id) throw new Error('Esta fuente de contenido requiere un id')
  return `/photo/api/v2/galleries/${id}`
}

const transform = (
  data: Gallery,
  { 'arc-site': website, presets }: GalleryByIdParams
): Gallery => {
  if (!website) return data

  const dataWithResizer = data || {}

  dataWithResizer.content_elements = data?.content_elements?.map((item) => {
    const resizedUrls = createResizedParams({
      url: item?.url,
      presets,
      arcSite: website,
    })

    return { ...item, resized_urls: resizedUrls }
  })

  return dataWithResizer
}

export default {
  resolve,
  transform,
  schemaName,
  params,
}
