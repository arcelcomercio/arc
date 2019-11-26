import { BLOG_TOKEN } from 'fusion:environment'
import getProperties from 'fusion:properties'

const resolve = (key = {}) => {
  const hasBlogPath = Object.prototype.hasOwnProperty.call(key, 'blog_path')
  if (!hasBlogPath)
    throw new Error('Esta fuente de contenido requiere un blog path')
  const hasYear = Object.prototype.hasOwnProperty.call(key, 'year')
  if (!hasYear) throw new Error('Esta fuente de contenido requiere un año')
  const hasMonth = Object.prototype.hasOwnProperty.call(key, 'month')
  if (!hasMonth) throw new Error('Esta fuente de contenido requiere un mes')
  const hasPostName = Object.prototype.hasOwnProperty.call(key, 'post_name')
  if (!hasPostName)
    throw new Error('Esta fuente de contenido requiere un post name')
  const {
    blog_path: blogPath,
    year,
    month,
    post_name: postName,
    posts_limit: postsLimit = 6,
    posts_offset: postsOffset = 0,
  } = key
  const json = 'get_post_data_by_blog_and_post_name'
  const token = BLOG_TOKEN
  const website = key['arc-site']
  const {
    api: { blog: urlApiblog = '' },
  } = getProperties(website)
  const url = `${urlApiblog}?json=${json}&blog_path=${blogPath}&year=${year}&month=${month}&post_name=${postName}&posts_limit=${postsLimit}&posts_offset=${postsOffset}&token=${token}`
  return url
}

const params = [
  {
    name: 'blog_path',
    displayName: 'Path de la publicación',
    type: 'text',
  },
  {
    name: 'year',
    displayName: 'Año de la publicación',
    type: 'text',
  },
  {
    name: 'month',
    displayName: 'Mes de la publicación',
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
    type: 'number',
  },
  {
    name: 'posts_offset',
    displayName: 'Offset de la publicación',
    type: 'number',
  },
]

export default {
  resolve,
  params,
}
