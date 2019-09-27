import getProperties from 'fusion:properties'
import { interpolateUrl } from './domains'
import addScriptAsync from '../../../utilities/script-async'

const addSales = arcSite => {
  const {
    paywall: { urls },
  } = getProperties(arcSite)
  const originSalesSdk = interpolateUrl(urls.originSalesSdk)
  const originApi = interpolateUrl(urls.originApi)
  return addScriptAsync({
    name: 'sdkSalesARC',
    url: originSalesSdk,
  }).then(added => {
    if (added) {
      window.Sales.apiOrigin = originApi
    }
    return window.Sales
  })
}

export default addSales
