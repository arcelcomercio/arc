import addScriptAsync from '../../../utilities/script-async'
import Domains from './domains'

const addPayU = () => {
  const originPayuSdk = Domains.getPayuSDK()
  return Promise.all([
    addScriptAsync({
      name: 'sdkPayU',
      url: originPayuSdk,
    }),
  ]).then(() => window.payU)
}

export default addPayU
