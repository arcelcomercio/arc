import { includePromoItems } from '../../components/utilities/included-fields'

const schemaName = 'stories-dev'

const params = [
  {
    name: '_id',
    displayName: 'ID de la nota',
    type: 'text',
  },
  {
    name: 'published',
    displayName: 'Publicada (por defecto: true)',
    type: 'text',
  },
  {
    name: 'presets',
    displayName: 'Tamaño de las imágenes (opcional)',
    type: 'text',
  },
  {
    name: 'includedFields',
    displayName: 'Campos incluidos (opcional)',
    type: 'text',
  },
]

const resolve = ({
  'arc-site': website,
  _id: id,
  published,
  includedFields,
}) => {
  if (!id || !website)
    throw new Error('Esta fuente de contenido requiere un id y un sitio web')

  const sourceInclude = includedFields
    ? `&included_fields=${includedFields}`
    : `&included_fields=_id,canonical_url,content_restrictions,headlines.basic,credits.by,${includePromoItems},type,website_url,websites}`

  return `/content/v4/related-content/stories/?_id=${id}&website=${website}&published=${published ||
    'true'}${sourceInclude}`
}

export default {
  resolve,
  schemaName,
  params,
  ttl: 300,
}
