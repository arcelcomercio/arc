// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { CONTENT_BASE } from 'fusion:environment'

// const params = [
//   {
//     name: 'quantity',
//     displayName: 'Cantidad de noticias',
//     type: 'number',
//   },
// ]

const options = {
  gzip: true,
  json: true,
}

const clearURL = (arr = [], site = 'gestion') => {
  return arr.map(url => {
    return url.replace(`https://${site}.pe/`, '/')
  })
}

const uriAPI = (url, site) => {
  const filter = `&included_fields=type,created_date,revision,last_updated_date,canonical_url,headlines,owner,content_restrictions,subheadlines,
taxonomy,promo_items,display_date,credits,first_publish_date,websites,publish_date,website,website_url,redirect_url`
  return `${CONTENT_BASE}/content/v4/stories/?website_url=${url}&website=${site}&published=true${filter}`
}

const fetch = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  // const { quantity = 3 } = key
  const URI_POST = 'http://d3lvnkg4ntwke5.cloudfront.net/toppages-gestion.json'
  return request({
    uri: URI_POST,
    ...options,
  }).then(resp => {
    const arrURL = resp.slice(0, 10)
    const URLs = clearURL(arrURL, website)

    const promiseArray = URLs.map(url =>
      request({
        uri: uriAPI(url, website),
        ...options,
      })
    )

    return Promise.all(promiseArray).then(res => res)
  })
}

// const transform = data => {
// 	return data
// }

export default {
  fetch,
  schemaName: 'story-dev',
  // params,
}
