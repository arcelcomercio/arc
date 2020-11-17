/* eslint-disable import/no-extraneous-dependencies */
import request from 'request-promise-native'
import * as Sentry from '@sentry/browser'
import {
  PropertiesSite,
  PropertiesCommon,
} from '../../components/features/subscriptions/_dependencies/Properties'

const { urls: urlCommon, tokens } = PropertiesCommon

const fetch = (key = {}) => {
  const website = key['arc-site']
  const { urls: urlsSite } = PropertiesSite[website]
  const {
    refreshTokenUser,
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
    uri: `${urlsSite.arcOrigin}/identity/public/v1/auth/token`,
    body: {
      token: refreshTokenUser,
      grantType: 'refresh-token',
    },
    json: true,
  })
    .then(resExtSess => {
      if (!resExtSess.accessToken) {
        Sentry.captureEvent({
          message: 'Error Tracking Fallido',
          level: 'error',
          extra: resExtSess,
        })
        return 'Operación Inválida: No retornó AccessToken'
      }
      return request({
        method: 'POST',
        uri: `${urlCommon.paymentTracker}/service/arc/paywall/tracking`,
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
    })
    .catch(errExtSess => {
      Sentry.captureEvent({
        message: 'Error Tracking Fallido',
        level: 'error',
        extra: errExtSess.message,
      })
      return `Operación Inválida: ${errExtSess.message}`
    })
}

export default { fetch }
