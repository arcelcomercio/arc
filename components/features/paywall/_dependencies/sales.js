import addScriptAsync from '../../../utilities/script-async'

const addSales = siteProperties => {
  const {
    signwall: { ORIGIN_SALES_SDK, ORIGIN_API },
  } = siteProperties

  return addScriptAsync({
    name: 'sdkSalesARC',
    url: ORIGIN_SALES_SDK,
  }).then(added => {
    if (added) {
      window.Sales.apiOrigin = ORIGIN_API
    }
    return window.Sales
  })
}

export { addSales }
