import getDomain from './domains'
import addScriptAsync from '../../../utilities/script-async'

const addSales = () => {
  return addScriptAsync({
    name: 'sdkSalesARC',
    url: getDomain('ORIGIN_SALES_SDK'),
  }).then(added => {
    if (added) {
      window.Identity.options({apiOrigin: getDomain('ORIGIN_API')})
      window.Sales.options({apiOrigin: getDomain('ORIGIN_API')})
    }
    return window.Sales
  })
}

export { addSales }
