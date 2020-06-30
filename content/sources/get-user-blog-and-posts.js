import { BLOG_TOKEN } from 'fusion:environment'
import getProperties from 'fusion:properties'
import { getResizedUrl } from '../../components/utilities/resizer'
import RedirectError from '../../components/utilities/redirect-error'

const params = [
  {
    name: 'blog_limit',
    displayName: 'Limite de Blog',
    type: 'number',
  },
  {
    name: 'blog_offset',
    displayName: 'A partir de que Blog',
    type: 'number',
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

  const blogs = data

  Object.keys(data).forEach(blog => {
    const { user: { user_avatarb: { guid: avatar } = {} } = {}, posts = [] } =
      data[blog] || {}

    if (avatar) {
      const resizedUrls = getResizedUrl({
        url: avatar,
        presets: 'author_sm:125x125',
        arcSite,
      })
      blogs[blog].user.user_avatarb.resized_urls = resizedUrls
    }

    posts.forEach((post, i) => {
      const { post_thumbnail: { guid } = {} } = post || {}

      if (guid) {
        const resizedUrls = getResizedUrl({
          url: guid,
          presets:
            'thumbnail_lg:480x248,thumbnail_md:290x150,thumbnail_sm:111x72',
          arcSite,
        })
        blogs[blog].posts[i].post_thumbnail.resized_urls = resizedUrls
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
