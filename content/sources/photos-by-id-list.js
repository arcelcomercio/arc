/* eslint-disable import/no-extraneous-dependencies */
import request from 'request-promise-native'
import { CONTENT_BASE, ARC_ACCESS_TOKEN } from 'fusion:environment'

const params = [
  {
    name: 'idList',
    displayName: 'Listado de IDs separados por comas',
    type: 'text',
  },
]

const fetch = ({ idList = '' }) => {
  return request({
    method: 'POST',
    uri: `${CONTENT_BASE}/photo/api/v2/photos/photos`,
    body: idList.split(','),
    json: true,
    gzip: true,
    auth: {
      bearer: ARC_ACCESS_TOKEN,
    },
  })
}

export default { fetch, params }
