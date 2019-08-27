import getDomain from './domains'
import addScriptAsync from '../../../utilities/script-async'

const addPayU = deviceSessionId => {
  return Promise.all([
    addScriptAsync({
      name: 'sdkPayU',
      url: getDomain('ORIGIN_PAYU_SDK'),
    }),
    addScriptAsync({
      name: 'payuTags',
      url: getDomain('ORIGIN_PAYU_TAGS', { deviceSessionId }),
      includeNoScript: true,
    }),
  ]).then(() => {
    return payU
  })
}

export { addPayU }
