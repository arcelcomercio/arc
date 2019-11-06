import { BLOG_URL_API } from 'fusion:environment'
import getProperties from 'fusion:properties'

const resolve = key => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const {
    api: { blog: urlApiblog = '' },
  } = getProperties(website)
  // const urlApiblog = BLOG_URL_API
  return `https://jsonplaceholder.typicode.com/todos/2`
}

export default {
  resolve,
  params: {
    website: 'text',
  },
}
