const resolve = () => {
  return `http://jab.pe/f/arc/api-blogs/get_post_data_by_blog_and_post_name.json`
}

export default {
  resolve,
  params: {
    website: 'text',
  },
}
