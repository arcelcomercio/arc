const resolve = () => {
  return `http://jab.pe/f/arc/api-blogs/get_post_data_by_blog_and_post_name.json`
}

const params = [
  {
    name: 'blog_path',
    displayName: 'Path de la publicación',
    type: 'text',
  },
  {
    name: 'month',
    displayName: 'Mes de la publicación',
    type: 'text',
  },
  {
    name: 'year',
    displayName: 'Año de la publicación',
    type: 'text',
  },
  {
    name: 'post_name',
    displayName: 'Nombre de la publicación',
    type: 'text',
  },
  {
    name: 'posts_limit',
    displayName: 'Limite de publicación relacionados',
    type: 'text',
  },
  {
    name: 'posts_offset',
    displayName: 'Offset de la publicación',
    type: 'text',
  },
  {
    name: 'token',
    displayName: 'Token para la solicitud de la API',
    type: 'text',
  },
  {
    name: 'website',
    displayName: 'Website',
    type: 'text',
  },
]

export default {
  resolve,
  params,
}
