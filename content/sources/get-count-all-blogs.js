import { BLOG_TOKEN } from 'fusion:environment'
import getProperties from 'fusion:properties'

const resolve = key => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const {
    api: { blog: urlApiblog = '' },
  } = getProperties(website)
  return `${urlApiblog}?json=get_count_all_blogs&blog&token=${process.env
    .TOKEN_BLOG || BLOG_TOKEN}`
}

export default {
  resolve,
  params: {
    website: 'text',
  },
}
