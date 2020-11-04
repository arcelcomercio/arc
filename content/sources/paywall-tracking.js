/* eslint-disable import/no-extraneous-dependencies */
import request from 'request-promise-native'
import { PropertiesCommon } from '../../components/features/subscriptions/_dependencies/Properties'

const { urls, tokens } = PropertiesCommon

const fetch = (key = {}) => {
  const website = key['arc-site']
  const {
    userId,
    orderNumber,
    referrerUser,
    confirmUser,
    originUser,
    isPwaUser,
    userAgentClient,
  } = key
  return request({
    method: 'POST',
    uri: `${urls.paymentTracker}/service/arc/paywall/tracking`,
    headers: {
      Authorization: tokens.paymentTracker,
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
    json: true,
  })
}

export default { fetch }
