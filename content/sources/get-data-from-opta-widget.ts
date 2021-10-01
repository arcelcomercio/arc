import {
  OPTA_SCRAPING_API_DEV,
  OPTA_SCRAPING_TOKEN_DEV,
} from 'fusion:environment'
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'

export type ContentSourceQuery = {
  url?: string
}

const params = [
  {
    name: 'url',
    displayName: 'Url del widget',
    type: 'text',
  },
]

const fetch = async (key: ContentSourceQuery) => {
  const { url = '' } = key

  if (!url) {
    throw new Error('Url es required')
  }

  const data = await request(
    `${OPTA_SCRAPING_API_DEV}?url=${encodeURIComponent(url)}`,
    {
      gzip: true,
      json: true,
      auth: {
        bearer: OPTA_SCRAPING_TOKEN_DEV,
      },
    }
  )

  return data
}

export default {
  fetch,
  params,
}
