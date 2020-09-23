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
]

const fetch = ({ url, 'arc-site': website, presets }) => {
  if (!url && !presets)
    throw new Error(
      'Esta fuente de contenido requiere la URL de una imagen y presets'
    )

  const resizedUrls = createResizedParams({
    url,
    presets,
    arcSite: website,
  })

  return { resized_urls: resizedUrls }
}

export default {
  fetch,
  params,
}
