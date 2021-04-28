import { ConentSourceBase } from 'types/content-source'
import { AnyObject } from 'types/utils'

import { ResizedUrls } from '../../components/utilities/resizer/format-presets'
import { createResizedParams } from '../../components/utilities/resizer/resizer'

export type PhotoByIdQuery = {
  _id: string
  presets: string
}

type PhotoByIdParams = PhotoByIdQuery & ConentSourceBase

const schemaName = 'photo'

const params = [
  {
    name: '_id',
    displayName: 'ID de Photo Center',
    type: 'text',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes (opcional)',
    type: 'text',
  },
]

const resolve = ({ _id: id }: PhotoByIdParams): string => {
  if (!id) throw new Error('Esta fuente de contenido requiere un id')
  return `/photo/api/v2/photos/${id}`
}

type PhotoData = AnyObject & {
  url: string
}

const transform = (
  data: PhotoData,
  { 'arc-site': website, presets }: PhotoByIdParams
): PhotoData & { resized_urls?: ResizedUrls } => {
  if (!website) return data

  let photoData: PhotoData = {
    url: '',
  }

  if (data) {
    photoData = data
    const { url } = photoData || {}
    const resizedUrls = createResizedParams({
      url,
      presets,
      arcSite: website,
    })
    photoData.resized_urls = resizedUrls
  }
  return { ...photoData }
}

export default {
  resolve,
  transform,
  schemaName,
  params,
}
