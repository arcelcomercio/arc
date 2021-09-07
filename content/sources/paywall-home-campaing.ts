/* eslint-disable import/no-extraneous-dependencies */
import request from 'request-promise-native'
import { ConentSourceBase } from 'types/content-source'
import { PaywallHomeCampaign, SubsArcSite } from 'types/subscriptions'

import { PropertiesSite } from '../../components/features/subscriptions/_dependencies/Properties'

const fetch = (
  key: ConentSourceBase
): request.RequestPromise<PaywallHomeCampaign[]> => {
  const site = key?.['arc-site'] || 'Arc Site no está definido'

  const { urls } = PropertiesSite[site as SubsArcSite]

  return request({
    uri: urls.subsBundle,
    gzip: true,
    json: true,
  })
}

export default { fetch }
