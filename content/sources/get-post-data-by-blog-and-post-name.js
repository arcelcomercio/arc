const resolve = () => {
  return `http://jab.pe/f/arc/api-blogs/get_post_data_by_blog_and_post_name.json`
}

export default {
  resolve,
  params: {
    blog_path: 'text',
    month: 'text',
    post_name: 'text',
    posts_limit: 'text',
    posts_offset: 'text',
    token: 'text',
    website: 'text',
    year: 'text',
  },
}
