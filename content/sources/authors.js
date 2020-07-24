/* import { resizerSecret } from 'fusion:environment'
import getProperties from 'fusion:properties'
import { createResizedUrl } from '../../components/utilities/resizer' */

// const schemaName = 'author'

const params = [
  {
    name: 'id',
    displayName: 'Id del autor',
    type: 'text',
  },
  {
    name: 'size',
    displayName: 'Cantidad de autores',
    type: 'number',
  },
  {
    name: 'from',
    displayName: 'Página de inicio',
    type: 'number',
  },
]

const resolve = ({ 'arc-site': website, id, size, from }) => {
  const validateFrom = () => {
    if (from !== '1' && from) {
      return (from - 1) * size
    }
    return '0'
  }
  console.log(website)
  /**
   * El problema usando esta API es que no me devuelve los autores ordenados en cada
   * consulta, eso lo vuelve problematico.
   * El beneficio es que me da mas flexibilidad para poder hacer la paginacion.
   *
   */

  const queryId = id ? `&_id=${id}` : ''
  const offset = id ? '' : `&offset=${validateFrom()}`
  const requestUri = `author/v1/author-service?limit=${size ||
    1}${queryId}${offset}`
  return requestUri
}

/* const transform = (data, { 'arc-site': website }) => {
  const { resizerUrl } = getProperties(website)
  const { site_topper: { site_logo_image: siteLogoImage = '' } = {} } =
    data || {}
  const sectionData = data
  if (siteLogoImage) {
    const resizedUrls = createResizedUrl({
      url: siteLogoImage,
      presets: 'landscape_xl:1354x220,landscape_s:304x90',
      resizerUrl,
      resizerSecret,
    })
    sectionData.site_topper.resized_urls = resizedUrls
  }
  return sectionData
} */

export default {
  resolve,
  // transform,
  // schemaName,
  params,
  ttl: 600,
}
