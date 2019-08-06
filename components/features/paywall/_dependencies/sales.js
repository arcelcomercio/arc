import ENV from 'fusion:environment'
import addScriptAsync from '../../../utilities/script-async'

const addSales = ({ services }) => {
  window.ENV = ENV;
  const { getService } = services.setEnv(ENV)
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
