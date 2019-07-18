import { CONTENT_BASE } from 'fusion:environment'

const params = [
  {
    name: 'campaign',
    displayName: 'Nombre de la campaña',
    type: 'text',
  },
]

const resolve = query => {
  const requestUri = `${CONTENT_BASE}/retail/public/v1/offer/preview/${campaign}`
  if (query.hasOwnProperty('campaign')) return `${requestUri}/${query.campaign}`
  throw new Error('sales-campaigns content source requires a campaign name')
}

export default {
  resolve,
  params,
}
