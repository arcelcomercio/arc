import getService from './services'
import addScriptAsync from '../../../utilities/script-async'

const addSales = () => {
  return addScriptAsync({
    name: 'sdkSalesARC',
    url: getService('ORIGIN_SALES_SDK'),
  }).then(added => {
    if (added) {
      window.Sales.apiOrigin = getService('ORIGIN_API')
    }
    return window.Sales
  })
}

export { addSales }
