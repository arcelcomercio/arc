const params = [
  {
    name: 'slug',
    displayName: 'Slug del autor',
    type: 'text',
  },
]
const resolve = ({ slug }) => {
  const requestUri = `author/v2/author-service?slug=${slug}`
  return requestUri
}

const transform = data => {
  const author = data.authors[0]
  return { author }
}

export default {
  resolve,
  transform,
  params,
  ttl: 600,
}
