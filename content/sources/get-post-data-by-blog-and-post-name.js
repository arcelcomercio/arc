import { BLOG_TOKEN } from 'fusion:environment'
import getProperties from 'fusion:properties'
import RedirectError from '../../components/utilities/redirect-error'
import { createResizedParams } from '../../components/utilities/resizer/resizer'

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

  return `${urlApiblog}?json=${json}&blog_path=${blogPath}&year=${year}&month=${month}&post_name=${postName}&posts_limit=${postsLimit}&posts_offset=${postsOffset}&token=${token}`
}

const transform = (data, { 'arc-site': arcSite }) => {
  if (!data || (data && data.status !== 'ok' && data.status !== 200)) {
    const { siteUrl } = getProperties(arcSite)
    throw new RedirectError(`${siteUrl}/blog/`, 301)
  }

  const newData = data
  const { user: { user_avatarb: { guid } = {} } = {} } = data || {}

  if (guid) {
    const resizedUrls = createResizedParams({
      url: guid,
      presets: {
        author_sm: {
          width: 125,
          height: 125,
        },
      },
      arcSite,
    })
    newData.user.user_avatarb.resized_urls = resizedUrls
  }

  return newData
}

export default {
  resolve,
  transform,
  params,
}
