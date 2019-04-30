const resolve = () => {
  return `http://jab.pe/f/arc/api-blogs/get_user_blog_and_posts.json`
}

export default {
  resolve,
  params: {
    website: 'text',
  },
}
