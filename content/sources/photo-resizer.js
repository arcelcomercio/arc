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
  {
    name: 'format',
    displayName: 'Formato de la imagen (jpeg, png, etc.)',
    type: 'text',
  },
]

const fetch = ({ url, 'arc-site': website, presets, quality, format }) => {
  if (!url && !presets)
    throw new Error(
      'Esta fuente de contenido requiere la URL de una imagen y presets'
    )

  const resizedUrls = createResizedParams({
    url,
    presets,
    arcSite: website,
    filterQuality: quality,
    format: !format || format === undefined || format === null ? '' : format,
  })

  return { resized_urls: resizedUrls }
}

export default {
  fetch,
  params,
}
