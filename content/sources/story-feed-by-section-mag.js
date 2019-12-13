import { CONTENT_BASE } from 'fusion:environment'

const resolve = () => {
  const requestUri = `${CONTENT_BASE}/content/v4/search/published?q=canonical_website:elcomerciomag+AND+publish_date:%7Bnow-7d%20TO%20*%7D+AND+type:story+AND+revision.published:true&sort=publish_date:desc&from=0&size=50&website=elcomerciomag`

  return requestUri
}

export default {
  resolve,
  ttl: 300,
}
