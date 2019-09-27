import getProperties from 'fusion:properties'

import addScriptAsync from '../../../utilities/script-async'
import { interpolateUrl } from './domains'

const addPayU = (site, deviceSessionId) => {
  const {
    paywall: { urls },
  } = getProperties(site)
  const originPayuSdk = interpolateUrl(urls.originPayuSdk)
  const originPayuTags = interpolateUrl(urls.originPayuTags, {
    deviceSessionId,
  })
  return Promise.all([
    addScriptAsync({
      name: 'sdkPayU',
      url: originPayuSdk,
    }),
    addScriptAsync({
      name: 'payuTags',
      url: originPayuTags,
      includeNoScript: true,
    }),
  ]).then(() => {
    return payU
  })
}

export default addPayU
