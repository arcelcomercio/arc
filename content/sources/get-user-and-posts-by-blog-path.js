import { BLOG_TOKEN, BLOG_URL_API } from 'fusion:environment'
import getProperties from 'fusion:properties'

const resolve = key => {
  const blogPath = key.blog_path
  const postsLimit = key.posts_limit || 16
  const postsOffset = key.posts_offset || 0
  const pagination = postsOffset > 0 ? postsLimit * (postsOffset - 1) : 0

  if (!blogPath) throw new Error('El Blog esta vacio, o no existe')

  const website = key['arc-site']
  const {
    api: { blog: urlApiblog = '' },
  } = getProperties(website)
  // const urlApiblog = BLOG_URL_API
  const url = `${urlApiblog}?json=get_user_and_posts_by_blog_path&blog_path=${blogPath}&posts_limit=${postsLimit}&posts_offset=${pagination}&token=${process
    .env.TOKEN_BLOG || BLOG_TOKEN}`

  return url
}

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

export default {
  resolve,
  params,
}
