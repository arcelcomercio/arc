import {  CONTENT_BASE } from 'fusion:environment'


const resolve = () => {

const requestUri = `${CONTENT_BASE}/content/v4/search/published?sort=publish_date:desc&from=0&size=50&website=elcomerciomag&q`

  return requestUri
}

export default {
  resolve,
}
