// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { BLOG_TOKEN } from 'fusion:environment'
import getProperties from 'fusion:properties'
import RedirectError from '../../components/utilities/redirect-error'

const options = {
  gzip: true,
  json: true,
}

const fetch = key => {
  const blogPath = key.blog_path
  const postsLimit = key.posts_limit || 16
  const postsOffset = key.posts_offset || 0
  const pagination = postsOffset > 0 ? postsLimit * (postsOffset - 1) : 0

  if (!blogPath) throw new ('El Blog esta vacio, o no existe')

  const website = key['arc-site']
  const {
    siteUrl,
    api: { blog: urlApiblog = '' },
  } = getProperties(website)

  const uri = `${urlApiblog}?json=get_user_and_posts_by_blog_path&blog_path=${blogPath}&posts_limit=${postsLimit}&posts_offset=${pagination}&token=${process.env.TOKEN_BLOG || BLOG_TOKEN}`

  return request({
    uri,
    ...options
  }).then(data => {
    if (!data || data && data.status !== 'ok' && data.status !== 200)
      throw new RedirectError(`${siteUrl}/blog/`, 301)
    return data
  })
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
  fetch,
  params,
}
