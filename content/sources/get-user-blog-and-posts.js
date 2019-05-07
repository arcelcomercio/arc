import { BLOG_TOKEN } from 'fusion:environment'

const resolve = key => {
  const blogLimit = key.blog_limit || 5
  const blogOffset = key.blog_offset || 0
  const postsLimit = key.posts_limit || 1
  const postsOffset = key.posts_offset || 0

  const url = `https://dev-svc-blogs.gestion.pe/service/apiblogs.php?json=get_user_blog_and_posts&blog_limit=${blogLimit}&blog_offset=${blogOffset}&posts_limit=${postsLimit}&posts_offset=${postsOffset}&token=${process
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

export default {
  resolve,
  params,
}
