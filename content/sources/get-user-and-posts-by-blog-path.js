import { BLOG_TOKEN } from 'fusion:environment'
import getProperties from 'fusion:properties'
import RedirectError from '../../components/utilities/redirect-error'

const params = [
  {
    name: 'blog_path',
    displayName: 'URL del Blog',
    type: 'text',
  },
  {
    name: 'posts_limit',
    displayName: 'Limite de Post',
    type: 'number',
  },
  {
    name: 'posts_offset',
    displayName: 'A partir de que Post',
    type: 'number',
  },
]

const resolve = key => {
  const blogPath = key.blog_path
  const postsLimit = key.posts_limit || 16
  const postsOffset = key.posts_offset || 0
  const pagination = postsOffset > 0 ? postsLimit * (postsOffset - 1) : 0

  if (!blogPath) throw new 'El Blog esta vacio, o no existe'()

  const website = key['arc-site']
  const {
    api: { blog: urlApiblog = '' },
  } = getProperties(website)

  return `${urlApiblog}?json=get_user_and_posts_by_blog_path&blog_path=${blogPath}&posts_limit=${postsLimit}&posts_offset=${pagination}&token=${process
    .env.TOKEN_BLOG || BLOG_TOKEN}`
}

const transform = (data, { 'arc-site': arcSite }) => {
  if (!data || (data && data.status !== 'ok' && data.status !== 200)) {
    const { siteUrl } = getProperties(arcSite)
    throw new RedirectError(`${siteUrl}/blog/`, 301)
  }
  return data
}

export default {
  resolve,
  transform,
  params,
}
