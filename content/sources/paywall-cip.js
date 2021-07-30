/* eslint-disable import/no-extraneous-dependencies */
import { PAYMENT_TRACKER_TOKEN } from 'fusion:environment'
import request from 'request-promise-native'

import { PropertiesCommon } from '../../components/features/subscriptions/_dependencies/Properties'

const fetch = (key = {}) => {
  const { data } = key
  const { urls: urlCommon } = PropertiesCommon

  return request({
    method: 'POST',
    uri: urlCommon.cipPayEfectivo,
    headers: {
      Authorization: `Token ${PAYMENT_TRACKER_TOKEN}`,
    },
    body: data,
    json: true,
  }).catch((err) => err)
}

export default {
  fetch,
  ttl: 20,
}
