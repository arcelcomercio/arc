import { resizerSecret } from 'fusion:environment'
import getProperties from 'fusion:properties'
import { createResizedUrl } from '../../components/utilities/resizer'

const params = [
  {
    name: 'url',
    displayName: 'URL de la imagen',
    type: 'text',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes (opcional)',
    type: 'text',
  },
]

const fetch = ({ url, 'arc-site': website, presets }) => {
  if (!url && !presets)
    throw new Error(
      'Esta fuente de contenido requiere la URL de una imagen y presets'
    )

  const { resizerUrl } = getProperties(website)

  const resizedUrls = createResizedUrl({
    url,
    presets,
    resizerUrl,
    resizerSecret,
  })

  return { resized_urls: resizedUrls }
}

export default {
  fetch,
  params,
}
