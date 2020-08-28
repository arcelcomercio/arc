import addScriptAsync from './Async'
import PropertiesSite from './Properties'

const addPayU = deviceSessionId => {
  if (typeof window !== 'undefined') {
    const { links } = PropertiesSite.common
    const originPayuTags = links.payuTags
    return Promise.all([
      addScriptAsync({
        name: 'payuTags',
        url: `${originPayuTags}${deviceSessionId}80200`,
        includeNoScript: true,
      }),
    ]).then(() => {
      return window.payU
    })
  }
  return ''
}

export default addPayU
