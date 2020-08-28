import { getResizedUrl } from '../../components/utilities/resizer'

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
  if (slug) {
    requestUri = `author/v2/author-service?slug=${slug}`
  } else if (id) {
    requestUri = `author/v1/author-service?_id=${id}`
  }
  return requestUri
}

const transform = (data, { slug, from, size, 'arc-site': arcSite }) => {
  const author = data.authors[0]
  const { image = '' } = author
  if (image !== '') {
    const resizedUrls = getResizedUrl({
      url: image,
      presets: {
        image_xs: {
          width: 59,
          height: 59,
        },
      },
      arcSite,
    })
    author.resized_urls = resizedUrls
  }
  return { author, slug, from, size }
}

export default {
  resolve,
  transform,
  params,
  ttl: 600,
}
