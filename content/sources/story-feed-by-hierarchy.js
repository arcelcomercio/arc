// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'request-promise-native'
import { resizerSecret, CONTENT_BASE } from 'fusion:environment'

const options = {
  gzip: true,
  json: true,
}

const params = [
  {
    name: 'hierarchy',
    displayName: 'Jerarquía',
    type: 'text',
  },
  {
    name: 'size',
    displayName: 'Cantidad de noticias por jerarquía',
    type: 'text',
  },
]

const fetch = ({ 'arc-site': website, hierarchy, size }) => {
  return request({
    uri: `${CONTENT_BASE}/site/v3/navigation/${website}/?hierarchy=${hierarchy ||
      'default'}`,
    ...options,
  }).then(sections => {
    return sections
  })
}

export default {
  fetch,
  schemaName: 'navigation',
  params,
}
