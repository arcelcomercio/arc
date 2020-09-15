import getProperties from 'fusion:properties'
import { getResizedImageData } from '../../components/utilities/resizer/resizer'

const schemaName = 'stories'

const params = [
  {
    name: 'id',
    displayName: 'ID de la colección',
    type: 'text',
  },
  {
    name: 'from',
    displayName: 'Noticia inicial',
    type: 'number',
  },
  {
    name: 'size',
    displayName: 'Cantidad a mostrar',
    type: 'number',
  },
  {
    name: 'website',
    displayName: 'ID del sitio (Opcional)',
    type: 'text',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes',
    type: 'text',
  },
]

const pattern = (key = {}) => {
  const {
    from: rawFrom = 0,
    size: rawSize = 20,
    website: rawWebsite = '',
  } = key

  const websiteField = rawWebsite === null ? '' : rawWebsite

  const website = websiteField || key['arc-site'] || 'Arc Site no está definido'

  const from = rawFrom === undefined || rawFrom === null ? '0' : rawFrom
  const size = rawSize === undefined || rawSize === null ? '20' : rawSize

  if (!key.id) {
    throw new Error('Esta fuente de contenido necesita el ID de la collección')
  }
  const requestUri = `/content/v4/collections?website=${website}&_id=${key.id}&size=${size}&from=${from}`

  return requestUri
}

const transform = (
  data,
  { 'arc-site': arcSite, website: websiteField, presets }
) => {
  const website = websiteField || arcSite || 'Arc Site no está definido'
  const { siteName } = getProperties(website)
  const dataStories = getResizedImageData(data, presets, website)
  dataStories.siteName = siteName

  return { ...dataStories }
}
const resolve = key => pattern(key)

const source = {
  resolve,
  transform,
  schemaName,
  params,
  // cache: false,
  ttl: 120,
}

export default source
