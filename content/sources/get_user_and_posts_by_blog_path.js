const resolve = () => {
  return `http://jab.pe/f/arc/api-blogs/get_user_and_posts_by_blog_path.json`
}

export default {
  resolve,
  params: {
    website: 'text',
    bloguero: 'text',
  },
}
