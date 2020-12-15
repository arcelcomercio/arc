// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { CONTENT_BASE, ARC_ACCESS_TOKEN, ENV } from 'fusion:environment'

const flagDev = !(ENV === 'elcomercio')

const getUriMostRead = (site, isPremium = false, isDev = false) => {
  const endpoint = isDev ? `d3ocw6unvuy6ob` : `do5ggs99ulqpl`
  const type = isPremium ? `premium` : `normal`
  
  return `https://${endpoint}.cloudfront.net/${site}/${type}/top.json`
}

const options = {
  gzip: true,
  json: true,
  auth: {
    bearer: ARC_ACCESS_TOKEN,
  },
}

const setPageViewsUrls = (arrUrl, arrUrlRes) => {
  return arrUrlRes.map(row => {
    const item = arrUrl.find(el => {
      // return el.path === (row.website_url || row.canonical_url)
      return el.dimension8 === row._id 
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

const uriAPI = (id, site) => {
  const filter = `&included_fields=type,websites,website,website_url,headlines,promo_items,_id`
  // return `${CONTENT_BASE}/content/v4/stories/?website_url=${url}&website=${site}&published=true${filter}`
  return `${CONTENT_BASE}/content/v4/stories/?_id=${id}&website=${site}&published=true${filter}`
}

const fetch = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const { amountStories, isPremium = false } = key

  const pattern = /((.*)-noticia(.*)\/)(.*)/

  return request({
    uri: getUriMostRead(website, !!+isPremium, flagDev),
    ...options,
  })
    .then(resp => {
      const arrVerify = []
      const arrResponse = resp.filter(obj => {
        let ret = false
        if (pattern.test(obj.path) && !arrVerify.includes(obj.path)) {
          arrVerify.push(obj.path)
          ret = true
        }
        return ret
      })

      const arrURL = arrResponse.slice(0, amountStories)
      // .filter(url => /((.*)-noticia(.*)\/)(.*)/.test(url.path))

      const promiseArray = arrURL.map(url =>
        request({
          // uri: uriAPI(url.path, website),
          uri: uriAPI(url.dimension8, website),
          ...options,
        }).catch(err => console.log(`URL Promise error: ${err}`))
      )

      return Promise.all(promiseArray)
        .then(res => {
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
