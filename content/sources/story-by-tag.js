const schemaName = 'story'

const params = [
  {
    name: 'name',
    displayName: 'Slug de la etiqueta',
    type: 'text',
  },
  {
    name: 'feedOffset',
    displayName: 'Número de la noticia',
    type: 'number',
  },
]

const pattern = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const { name, feedOffset } = key

  const slugSearch = name ? `AND+taxonomy.tags.slug:${name}+` : ''

  const q = `canonical_website:${website}+${slugSearch}AND+type:story+AND+revision.published:true`

  const requestUri = `/content/v4/search/published?q=${q}&size=1&from=${feedOffset ||
    0}&sort=publish_date:desc&website=${website}&single=true`

  return requestUri
}

const resolve = key => pattern(key)

const source = {
  resolve,
  schemaName,
  params,
}

export default source
