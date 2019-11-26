import { BLOG_TOKEN, resizerSecret } from 'fusion:environment'

import getProperties from 'fusion:properties'
import { createUrlResizer } from '@arc-core-components/content-source_content-api-v4'

let website = ''

const resolve = key => {
  website = key['arc-site'] || 'Arc Site no está definido'

  const {
    api: { blog: urlApiblog = '' },
  } = getProperties(website)

  const blogLimit = key.blog_limit || 16
  const blogOffset = key.blog_offset || 0 // pagina
  const pagination = blogOffset > 0 ? blogLimit * (blogOffset - 1) : 0
  const postsLimit = key.posts_limit || 1
  const postsOffset = key.posts_offset || 0
  const url = `${urlApiblog}?json=get_user_blog_and_posts&blog_limit=${blogLimit}&blog_offset=${pagination}&posts_limit=${postsLimit}&posts_offset=${postsOffset}&token=${process
    .env.TOKEN_BLOG || BLOG_TOKEN}`

  return url
}

const params = [
  {
    name: 'blog_limit',
    displayName: 'Limite de Blog',
    type: 'text',
  },
  {
    name: 'blog_offset',
    displayName: 'A partir de que Blog',
    type: 'text',
  },
  {
    name: 'posts_limit',
    displayName: 'Limite de Post',
    type: 'text',
  },
  {
    name: 'posts_offset',
    displayName: 'A partir de que Post',
    type: 'text',
  },
]

const transform = data => {
  const { resizerUrl } = getProperties(website)
  const newData = data
  Object.keys(data).forEach(item => {
    const { user: { user_avatarb: { guid } = {} } = {} } = data[item] || {}

    if (guid) {
      const resizedUrls = createUrlResizer(resizerSecret, resizerUrl, {
        presets: {
          lazy_default: {
            width: 5,
            height: 5,
          },
          author_sm: {
            width: 125,
            height: 125,
          },
        },
      })({
        url: guid,
      })
      newData[item].user.user_avatarb.resized_urls = resizedUrls
    }
  })

  return newData
}

export default {
  resolve,
  transform,
  params,
}
