/* eslint-disable import/no-extraneous-dependencies */
import request from 'request-promise-native'

import { PropertiesSite } from '../../components/features/subscriptions/_dependencies/Properties'

const fetch = (key = {}) => {
  const site = key['arc-site']

  const { urls } = PropertiesSite[site]

  return request({
    uri: urls.subsBundle,
    gzip: true,
    json: true,
  })
}

export default { fetch }
