import { BLOG_TOKEN } from 'fusion:environment'
import getProperties from 'fusion:properties'

import RedirectError from '../../components/utilities/redirect-error'
import { createResizedParams } from '../../components/utilities/resizer/resizer'

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

const resolve = (key) => {
  const blogPath = key.blog_path
  const postsLimit = key.posts_limit || 16
  const postsOffset = key.posts_offset || 0
  const pagination =
    postsOffset > 0 ? postsLimit * (postsOffset - 1) : postsOffset

  if (!blogPath) throw new 'El Blog esta vacio, o no existe'()

  const website = key['arc-site']
  const {
    siteUrl,
    api: { blog: urlApiblog = '' },
  } = getProperties(website)

  if (key.posts_offset <= 0)
    throw new RedirectError(`${siteUrl}/blog/${blogPath}/`, 301)

  const isResultadosOnpe = /^lavidaquequiero/.test(blogPath) || false
  if (isResultadosOnpe) {
    throw new RedirectError(`${siteUrl}/blog/emprendedor/`, 301)
  }

  return `${urlApiblog}?json=get_user_and_posts_by_blog_path&blog_path=${blogPath}&posts_limit=${postsLimit}&posts_offset=${pagination}&token=${
    process.env.TOKEN_BLOG || BLOG_TOKEN
  }`
}

const transform = (data, { 'arc-site': arcSite }) => {
  if (
    !data ||
    (data && data.status !== 'ok' && data.status !== 200) ||
    (data && data.posts && !data.posts.length > 0)
  ) {
    const { siteUrl } = getProperties(arcSite)
    throw new RedirectError(`${siteUrl}/blog/`, 301)
  }
  const blog = data

  const {
    user: { user_avatarb: { guid: avatar } = {} } = {},
    posts = [],
  } = data

  if (avatar) {
    const resizedUrls = createResizedParams({
      url: avatar,
      presets: 'author_sm:125x125',
      arcSite,
    })
    blog.user.user_avatarb.resized_urls = resizedUrls
  }

  posts.forEach((post, i) => {
    const { post_thumbnail: { guid } = {} } = post || {}

    if (guid) {
      const resizedUrls = createResizedParams({
        url: guid,
        presets:
          'thumbnail_lg:480x248,thumbnail_md:290x150,thumbnail_sm:111x72',
        arcSite,
      })
      blog.posts[i].post_thumbnail.resized_urls = resizedUrls
    }
  })

  return blog
}

export default {
  resolve,
  transform,
  params,
}
