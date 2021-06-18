import addScriptAsync from '../../../utilities/script-async'
import { getPayuSDK } from './domains'

const addPayU = () =>
  Promise.all([
    addScriptAsync({
      name: 'sdkPayU',
      url: getPayuSDK,
    }),
  ]).then(() => window.payU)

export default addPayU
