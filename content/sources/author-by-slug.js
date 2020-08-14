const params = [
  {
    name: 'slug',
    displayName: 'Slug del autor',
    type: 'text',
  },
  {
    name: 'id',
    displayName: 'ID del autor',
    type: 'text',
  },
  {
    name: 'from',
    displayName: 'Página de inicio',
    type: 'number',
  },
  {
    name: 'size',
    displayName: 'Cantidad a mostrar',
    type: 'number',
  },
]
const resolve = ({ slug, id }) => {
  let requestUri = false
  if(slug){
    requestUri = `author/v2/author-service?slug=${slug}`
  }else if(id){
    requestUri = `author/v1/author-service?_id=${id}`
  }
  return requestUri
}

const transform = (data, {slug, from, size}) => {
  const author = data.authors[0]
  return { author, slug, from, size }
}

export default {
  resolve,
  transform,
  params,
  ttl: 600,
}
