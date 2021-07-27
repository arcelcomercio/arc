/* eslint-disable import/no-extraneous-dependencies */
import { PAYMENT_TRACKER_TOKEN } from 'fusion:environment'
import request from 'request-promise-native'

import { PropertiesCommon } from '../../components/features/subscriptions/_dependencies/Properties'

const { urls: urlCommon } = PropertiesCommon

const fetch = (key) => {
  const website = key?.['arc-site']
  const {
    userId,
    orderNumber,
    referrerUser,
    confirmUser,
    originUser,
    isPwaUser,
    userAgentClient,
  } = key || {}

  return request({
    method: 'POST',
    uri: `${urlCommon.paymentTracker}/service/arc/paywall/tracking`,
    headers: {
      Authorization: PAYMENT_TRACKER_TOKEN,
      'X-arc-site': website,
    },
    body: {
      url_referer: referrerUser,
      medium: originUser,
      user_agent: userAgentClient,
      arc_order: orderNumber,
      confirm_subscription: confirmUser,
      is_pwa: isPwaUser,
      uuid: userId,
    },
    gzip: true,
    json: true,
  })
}

export default {
  fetch,
  params: {
    userId: 'text',
    orderNumber: 'text',
    referrerUser: 'text',
    confirmUser: 'text',
    originUser: 'text',
    isPwaUser: 'text',
    userAgentClient: 'text',
  },
}
