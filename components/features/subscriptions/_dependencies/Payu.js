import addScriptAsync from './Async'
import { PropertiesCommon } from './Properties'

const addPayU = deviceSessionId => {
  if (typeof window !== 'undefined') {
    const { links } = PropertiesCommon
    return Promise.all([
      addScriptAsync({
        name: 'payuTags',
        url: `${links.payuTags}${deviceSessionId}80200`,
        includeNoScript: true,
      }),
    ]).then(() => {
      return window.payU
    })
  }
  return ''
}

export default addPayU
