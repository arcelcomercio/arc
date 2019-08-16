import getDomain from './domains'
import addScriptAsync from '../../../utilities/script-async'

const addPayU = () => {
  

  return addScriptAsync({
    name: 'sdkPayU',
    url: getDomain('ORIGIN_PAYU_SDK'),
  }).then(added => {
    return payU
  })
}

export { addPayU }
