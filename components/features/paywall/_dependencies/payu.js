import addScriptAsync from '../../../utilities/script-async'

const addPayU = siteProperties => {
  const {
    signwall: { ORIGIN_PAYU_SDK },
  } = siteProperties

  return addScriptAsync({
    name: 'sdkPayU',
    url: ORIGIN_PAYU_SDK,
  }).then(added => {
    return payU
  })
}

export { addPayU }
