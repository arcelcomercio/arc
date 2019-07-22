const resolve = ({ campaing }) => {
  return `https://api-sandbox.gestion.pe/retail/public/v1/offer/preview/${campaing}`
}

//https://api-sandbox.gestion.pe
//paywall-gestion-sandbox

export default {
  resolve,
  params: {
    campaing: 'text',
  },
  transform(data) {
    const { sku, name, attributes, pricingStrategies } = data.products[0]
    const {
      campaign: { name: campaignCode },
    } = data

    const plans = pricingStrategies.map(
      ({ pricingStrategyId, priceCode, description, rates }) => {
        const [price] = rates
        const { amount, billingFrequency } = price
        return {
          sku,
          priceCode,
          pricingStrategyId,
          campaignCode,
          description: JSON.parse(description),
          amount: parseInt(amount, 10),
          billingFrequency,
        }
      }
    )

    const summary = attributes.reduce(
      (prev, { name: _name, value }) => {
        const prez = prev
        const _value = value.replace(/<p>|<\/p>/g, '')
        if (_name === 'feature') {
          prez[_name].push(_value)
        } else {
          prez[_name] = _value
        }
        return prez
      },
      { feature: [] }
    )

    return { name, summary, plans }
  },
}
