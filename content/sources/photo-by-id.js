import { resizerSecret } from 'fusion:environment'
import getProperties from 'fusion:properties'
import { createResizedUrl } from '../../components/utilities/resizer'

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

const resolve = ({ _id: id }) => {
  if (!id) throw new Error('Esta fuente de contenido requiere un id')
  return `/photo/api/v2/photos/${id}`
}

const transform = (data, { 'arc-site': website, presets }) => {
  if (!website) return data

  let photoData = {}

  if (data) {
    photoData = data
    const { url } = photoData
    const { resizerUrl } = getProperties(website)

    const resizedUrls = createResizedUrl({
      url,
      presets,
      resizerUrl,
      resizerSecret,
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
