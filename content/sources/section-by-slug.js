const schemaName = 'section'

const params = [
  {
    name: '_id',
    displayName: 'Slug de la sección',
    type: 'text',
  },
]

const resolve = (key = {}) => {
  // const hasSlug = Object.prototype.hasOwnProperty.call(key, '_id')
  // if (!hasSlug)
  //   throw new Error(
  //     'Esta fuente de contenido requiere de un Slug y un sitio web'
  //   )
  const website = key['arc-site'] || 'Arc Site no está definido'
  const { _id: slug = '' } = key

  const requestUri =
    slug === '' || slug === null
      ? `/site/v3/website/${website}/section`
      : `/site/v3/website/${website}/section?_id=${slug}`

  return requestUri
}

export default {
  resolve,
  schemaName,
  params,
}
