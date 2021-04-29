import { createResizedParams } from '../../components/utilities/resizer/resizer'

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

const resolve = ({ _id: id }) => {
  if (!id) throw new Error('Esta fuente de contenido requiere un id')
  return `/photo/api/v2/galleries/${id}`
}

const transform = (data, { 'arc-site': website, presets }) => {
  if (!website) return data

  const dataWithResizer = data || {}

  dataWithResizer.content_elements = data?.content_elements?.map(
    (item = {}) => {
      const resizedUrls = createResizedParams({
        url: item?.url,
        presets,
        arcSite: website,
      })

      return { ...item, resized_urls: resizedUrls }
    }
  )

  return dataWithResizer
}

export default {
  resolve,
  transform,
  schemaName,
  params,
}
