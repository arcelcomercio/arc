// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { CONTENT_BASE } from 'fusion:environment'

const flagDev = false

const getUriMostRead = (site, isPremium = false, isDev = false) => {
  let uriMostReadGeneral = `https://d3ocw6unvuy6ob.cloudfront.net/${site}/normal/top.json`
  if (isPremium) {
    uriMostReadGeneral = isDev
      ? `https://d3ocw6unvuy6ob.cloudfront.net/${site}/premium/top.json`
      : `https://do5ggs99ulqpl.cloudfront.net/${site}/premium/top.json`
  }
  return uriMostReadGeneral
}

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
      return el.path === (row.website_url || row.canonical_url)
    })
    return { ...row, page_views: (item && item.pageviews) || 0 }
  })
}

const params = [
  {
    name: 'amountStories',
    displayName: 'Número de historias',
    type: 'number',
  },
  {
    name: 'isPremium',
    displayName: '¿Es premium?',
    type: 'number',
  },
]

const uriAPI = (url, site) => {
  const filter = `&included_fields=type,created_date,revision,last_updated_date,canonical_url,headlines,owner,content_restrictions,subheadlines,
taxonomy,promo_items,display_date,credits,first_publish_date,websites,publish_date,website,website_url,redirect_url`
  const urlCheck = `${CONTENT_BASE}/content/v4/stories/?website_url=${url}&website=${site}&published=true${filter}`
  return urlCheck
}

const fetch = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const { amountStories, isPremium = false } = key

  return request({
    uri: getUriMostRead(website, !!+isPremium, flagDev), // flagDev ? uriPostDev(website) : uriPostProd(website),
    ...options,
  }).then(resp => {
    const arrURL = resp.slice(0, amountStories)
    arrURL.forEach(el => {
      el.path = el.path.match(/((.*)-noticia(.*)\/)(.*)/)[1] || ''
    })

    const promiseArray = arrURL.map(url =>
      request({
        uri: uriAPI(url.path, website),
        ...options,
      }).catch(err => console.log(`URL Promise error: ${err}`))
    )

    return Promise.all(promiseArray).then(res => {
      const newRes = setPageViewsUrls(arrURL, res) || res
      newRes.sort((a, b) => {
        return b.page_views - a.page_views
      })
      return { content_elements: newRes }
    })
    .catch(err => console.log(`PromiseAll error: ${err}`))
  })
  .catch(err => { 
    return { content_elements: [] }
  })
}

export default {
  fetch,
  schemaName: 'stories-dev',
  params,
}
