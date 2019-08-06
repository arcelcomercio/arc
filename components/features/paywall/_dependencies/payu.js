import ENV from 'fusion:environment'
import addScriptAsync from '../../../utilities/script-async'

const addPayU = ({ services }) => {
  const { getService } = services.setEnv(ENV)

  return addScriptAsync({
    name: 'sdkPayU',
    url: getService('ORIGIN_PAYU_SDK'),
  }).then(added => {
    return payU
  })
}

export { addPayU }
