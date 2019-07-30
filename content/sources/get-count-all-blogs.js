import { BLOG_URL_API } from 'fusion:environment'

const resolve = () => {
  const urlApiblog = BLOG_URL_API
  return `${urlApiblog}?json=get_count_all_blogs&blog&token=xcvbn$987HUNJ$765`
}

export default {
  resolve,
  params: {
    website: 'text',
  },
}
