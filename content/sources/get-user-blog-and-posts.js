import { BLOG_TOKEN, resizerSecret } from 'fusion:environment'
import getProperties from 'fusion:properties'
import { createResizedUrl } from '../../components/utilities/resizer'
import RedirectError from '../../components/utilities/redirect-error'

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

const resolve = key => {
  const website = key['arc-site'] || 'Arc Site no está definido'

  const {
    api: { blog: urlApiblog = '' },
  } = getProperties(website)

  const blogLimit = key.blog_limit || 16
  const blogOffset = key.blog_offset || 0 // pagina
  const pagination = blogOffset > 0 ? blogLimit * (blogOffset - 1) : 0
  const postsLimit = key.posts_limit || 1
  const postsOffset = key.posts_offset || 0

  return `${urlApiblog}?json=get_user_blog_and_posts&blog_limit=${blogLimit}&blog_offset=${pagination}&posts_limit=${postsLimit}&posts_offset=${postsOffset}&token=${process
    .env.TOKEN_BLOG || BLOG_TOKEN}`
}

const transform = (data, { 'arc-site': arcSite, blog_offset: blogOffset }) => {
  if (
    (blogOffset === 0 || blogOffset === 1) &&
    (!data || (data && data.status !== 'ok' && data.status !== 200))
  ) {
    throw new RedirectError(`/404`, 404)
  } else if (!data || (data && data.status !== 'ok' && data.status !== 200)) {
    const { siteUrl } = getProperties(arcSite)
    throw new RedirectError(`${siteUrl}/blog/`, 301)
  }

  const { resizerUrl } = getProperties(arcSite)
  const blogs = data

  Object.keys(data).forEach(blog => {
    const { user: { user_avatarb: { guid: avatar } = {} } = {}, posts = [] } =
      data[blog] || {}

    if (avatar) {
      const resizedUrls = createResizedUrl({
        url: avatar,
        presets: 'author_sm:125x125',
        resizerUrl,
        resizerSecret,
      })
      blogs[blog].user.user_avatarb.resized_urls = resizedUrls
    }

    posts.forEach(post => {
      const { post_thumbnail: { guid: thumbnail } = {} } = post || {}

      if (thumbnail) {
        const resizedUrls = createResizedUrl({
          url: thumbnail,
          presets:
            'thumbnail_lg:480x248,thumbnail_md:290x150,thumbnail_sm:111x72',
          resizerUrl,
          resizerSecret,
        })
        blogs[blog].posts[post].post_thumbnail.resized_urls = resizedUrls
      }
    })
  })

  return blogs
}

export default {
  resolve,
  transform,
  params,
}
