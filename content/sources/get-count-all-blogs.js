import { BLOG_URL_API } from 'fusion:environment'
import getProperties from 'fusion:properties'

const resolve = key => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const {
    api: { blog: urlApiblog = '' },
  } = getProperties(website)
  // const urlApiblog = BLOG_URL_API
  return `${urlApiblog}?json=get_count_all_blogs&blog&token=xcvbn$987HUNJ$765`
}

export default {
  resolve,
  params: {
    website: 'text',
  },
}
