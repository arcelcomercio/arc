/* eslint-disable import/no-extraneous-dependencies */
import getProperties from 'fusion:properties'
import request from 'request-promise-native'

import { interpolateUrl } from '../../components/features/paywall/_dependencies/domains'

const fetch = (key = {}) => {
  const site = key['arc-site']
  const {
    paywall: { urls },
  } = getProperties(site)

  return request({
    uri: interpolateUrl(urls.originSubscriptionsBundles),
    gzip: true,
    json: true,
  })
}

export default { fetch }
