import addScriptAsync from './script-async'
import Domains from './domains'

const addPayU = (site, deviceSessionId) => {
  const originPayuSdk = Domains.getPayuSDK()
  const originPayuTags = Domains.getPayuTags()
  return Promise.all([
    addScriptAsync({
      name: 'sdkPayU',
      url: originPayuSdk,
    }),
    addScriptAsync({
      name: 'payuTags',
      url: `${originPayuTags}${deviceSessionId}80200`,
      includeNoScript: true,
    }),
  ]).then(() => {
    return window.payU
  })
}

export default addPayU
