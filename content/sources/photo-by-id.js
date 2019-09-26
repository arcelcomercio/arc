import { resizerSecret } from 'fusion:environment'
import { createUrlResizer } from '@arc-core-components/content-source_content-api-v4'
import getProperties from 'fusion:properties'
import { sizeImg } from '../../components/utilities/config-params'

const schemaName = 'photo'

const params = [
  {
    name: '_id',
    displayName: 'ID de Photo Center',
    type: 'text',
  },
]

const resolve = ({ _id: id }) => {
  if (!id) throw new Error('Esta fuente de contenido requiere un id')
  const requestUri = `/photo/api/v2/photos/${id}`
  return requestUri
}

const transform = (data, key) => {
  const website = key['arc-site']
  if (!website) return data

  let photoData = {}

  if (data) {
    photoData = data
    const { url } = photoData
    const { resizerUrl } = getProperties(website)

    const resizedUrls = createUrlResizer(resizerSecret, resizerUrl, {
      /**
       * TODO: Agregar tambien la capacidad para custom-presets.
       * Si se hace, tambien es necesario hacer cambios en el Schema.
       */
      presets: sizeImg(),
    })({
      url,
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
