// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { CONTENT_BASE } from 'fusion:environment'

const flagDev = true

/*
const uriPostProd = site =>
  site === 'gestion'
    ? 'https://do5ggs99ulqpl.cloudfront.net/gestion/9043312/top_premium.json'
    : 'https://do5ggs99ulqpl.cloudfront.net/elcomercio/21928896/top_premium.json'

const uriPostDev = site =>
  site === 'gestion'
    ? 'https://d3ocw6unvuy6ob.cloudfront.net/gestion/9043312/top_premium.json'
    : 'https://d3ocw6unvuy6ob.cloudfront.net/elcomercio/21928896/top_premium.json'
*/
/*
const codPremiumSite = {
  elcomercio: '21928896',
  gestion: '9043312',
}

const codSite = {
  depor: '16646171',
  peru21: '9849434',
  ojo: '31245754',
  elbocon: '31246731',
}
*/
const getUriMostRead = (site, isPremium = false, isDev = false) => {
  //let uriMostReadGeneral = `https://cde.gestion2.e3.pe/doc/0/0/2/7/9/279593.txt`
  //let uriMostReadGeneral = `https://cde.gestion2.e3.pe/doc/0/0/2/7/9/279593-error.txt`
  let uriMostReadGeneral = `https://d3ocw6unvuy6ob.cloudfront.net/${site}/normal/top.json`
  if (isPremium) {
    uriMostReadGeneral = isDev
      ? `https://d3ocw6unvuy6ob.cloudfront.net/${site}/premium/top.json`
      : `https://do5ggs99ulqpl.cloudfront.net/${site}/premium/top.json`
  }

  //console.log('================1====================')
  //console.log(`URL de Servicio: ${uriMostReadGeneral}`)
  //console.log(`idPremium: ${isPremium}`)
  //console.log('================1====================')
  return uriMostReadGeneral
}

/* 
https://d3ocw6unvuy6ob.cloudfront.net/depor/16646171/normal/top.json
https://d3ocw6unvuy6ob.cloudfront.net/peru21/9849434/normal/top.json
https://d3ocw6unvuy6ob.cloudfront.net/ojo/31245754/normal/top.json
https://d3ocw6unvuy6ob.cloudfront.net/elbocon/31246731/normal/top.json
*/

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
      // eslint-disable-next-line no-param-reassign
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
    //console.log(`PromiseFetch error: ${err}`) 
    return { content_elements: [] }
  })
}

export default {
  fetch,
  schemaName: 'stories-dev',
  params,
}
