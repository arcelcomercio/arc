import { ConentSourceBase } from 'types/content-source'

export type StoryFeedWithoutPremiumQuery = {
  size: number
}

type StoryFeedWithoutPremiumParams = StoryFeedWithoutPremiumQuery &
  ConentSourceBase

const schemaName = 'stories'

const params = [
  {
    name: 'size',
    displayName: 'Cantidad a mostrar',
    type: 'number',
  },
]

const pattern = (key: StoryFeedWithoutPremiumParams): string => {
  const website = key?.['arc-site']

  const { size: rawSize = 10 } = key || {}

  const size = rawSize === undefined || rawSize === null ? '10' : rawSize

  return `/content/v4/search/published?website=${website}&q=type:story+AND+content_restrictions.content_code:(!premium)+AND+publish_date:%7Bnow-7d%20TO%20*%7D&sort=display_date:desc&size=${size}&from=0}`
}

const resolve = (key: StoryFeedWithoutPremiumParams): string => pattern(key)

const source = {
  resolve,
  schemaName,
  params,
  ttl: 120,
}

export default source
