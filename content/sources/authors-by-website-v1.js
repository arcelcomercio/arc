// const schemaName = 'author'

const params = [
  {
    name: 'size',
    displayName: 'Cantidad de autores (opcional)',
    type: 'number',
  },
  {
    name: 'offset',
    displayName: 'Número de página (opcional)',
    type: 'number',
  },
]

const resolve = () => {
  return 'author/v1/author-service'
}

const transform = (data, { 'arc-site': website, size = 0, offset = 0 }) => {
  const { q_results: authors } = data
  const websiteAuthors =
    authors.filter(
      author => author.affiliations && author.affiliations.includes(website)
      // author.website && author.website.includes(website)
    ) || []

  websiteAuthors.sort((a, b) => {
    if (a.byline > b.byline) return 1
    if (b.byline > a.byline) return -1
    return 0
  })

  const fixedLimit = size + offset || 1

  return {
    authors:
      size || offset
        ? websiteAuthors.slice(offset || 0, fixedLimit)
        : websiteAuthors,
    total_count: websiteAuthors.length,
    next: fixedLimit > websiteAuthors.length ? null : fixedLimit,
    website,
  }
}

export default {
  resolve,
  transform,
  // schemaName,
  params,
  ttl: 600,
}
