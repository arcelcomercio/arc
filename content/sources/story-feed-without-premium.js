const schemaName = 'stories'

const params = [
  {
    name: 'size',
    displayName: 'Cantidad a mostrar',
    type: 'number',
  },
]

const pattern = (key = {}) => {
  const website = key['arc-site']

  const { size: rawSize = 10 } = key

  const size = rawSize === undefined || rawSize === null ? '10' : rawSize

  return `/content/v4/search/published?website=${website}&q=type:story&sort=display_date:desc&size=${size}&from=0}`
}

const resolve = key => pattern(key)

const source = {
  resolve,
  schemaName,
  params,
  ttl: 120,
}

export default source
