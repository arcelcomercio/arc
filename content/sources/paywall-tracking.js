/* eslint-disable import/no-extraneous-dependencies */
import { PAYMENT_TRACKER_TOKEN } from 'fusion:environment'
import request from 'request-promise-native'

import { PropertiesCommon } from '../../components/features/subscriptions/_dependencies/Properties'

const fetch = (key) => {
  const website = key?.['arc-site']
  const data = key || {}
  const { urls: urlCommon } = PropertiesCommon

  return request({
    method: 'POST',
    uri: `${urlCommon.paymentTracker}/service/arc/paywall/tracking`,
    headers: {
      Authorization: PAYMENT_TRACKER_TOKEN,
      'X-arc-site': website,
    },
    body: data,
    gzip: true,
    json: true,
  })
}

export default {
  fetch,
}
