import { createResizedParams } from '../../components/utilities/resizer/resizer'

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
  {
    name: 'quality',
    displayName: 'Calidad de las imágenes (0 - 100)',
    type: 'number',
  },
]

const fetch = ({ url, 'arc-site': website, presets, quality }) => {
  if (!url && !presets)
    throw new Error(
      'Esta fuente de contenido requiere la URL de una imagen y presets'
    )

  const resizedUrls = createResizedParams({
    url,
    presets,
    arcSite: website,
    filterQuality: quality,
  })

  return { resized_urls: resizedUrls }
}

export default {
  fetch,
  params,
}
