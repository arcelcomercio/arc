import getService from './services'
import addScriptAsync from '../../../utilities/script-async'

const addPayU = () => {
  

  return addScriptAsync({
    name: 'sdkPayU',
    url: getService('ORIGIN_PAYU_SDK'),
  }).then(added => {
    return payU
  })
}

export { addPayU }
