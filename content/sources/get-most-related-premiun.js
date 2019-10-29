// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { CONTENT_BASE } from 'fusion:environment'

const URI_POST =
  'https://d3ocw6unvuy6ob.cloudfront.net/gestion/9043312/top_premium.json'

const options = {
  gzip: true,
  json: true,
}

const clearURL = (arr = [], site = 'gestion') => {
  return arr.map(url => {
    return url.replace(`https://${site}.pe/`, '/')
  })
}

const setPageViewsUrls = (arrUrl, arrUrlRes) => {
  return arrUrlRes.map(row => {
    const item = arrUrl.find(el => {
      return el.path === row.website_url
    })
    return { ...row, page_views: item.pageviews || 0 }
  })
}

const params = [
  {
    name: 'amountStories',
    displayName: 'Número de historias',
    type: 'number',
  },
]

const uriAPI = (url, site) => {
  const filter = `&included_fields=type,created_date,revision,last_updated_date,canonical_url,headlines,owner,content_restrictions,subheadlines,
taxonomy,promo_items,display_date,credits,first_publish_date,websites,publish_date,website,website_url,redirect_url`
  return `${CONTENT_BASE}/content/v4/stories/?website_url=${url}&website=${site}&published=true${filter}`
}

const fetch = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const { amountStories } = key

  return request({
    uri: URI_POST,
    ...options,
  }).then(resp => {
    const arrURL = resp.slice(0, amountStories)
    arrURL.forEach(el => {
      // eslint-disable-next-line no-param-reassign
      el.path = el.path.match(/((.*)-noticia(.*)\/)(.*)/)[1] || ''
    })
    const promiseArray = arrURL.map(url =>
      request({
        uri: uriAPI(url.path, website),
        ...options,
      })
    )

    return Promise.all(promiseArray).then(res => {
      const newRes = setPageViewsUrls(arrURL, res) || res
      newRes.sort((a, b) => {
        return b.page_views - a.page_views
      })
      return { content_elements: newRes }
    })
  })
}

export default {
  fetch,
  schemaName: 'stories-dev',
  params,
}
