const resolve = ({ campaing = 'paywall-gestion-sandbox' }) => {
  return `https://api-sandbox.gestion.pe/retail/public/v1/offer/preview/${campaing}`
}

const parse = string => {
  try {
    return JSON.parse(string)
  } catch (error) {
    return { err: 'is not a object' }
  }
}

// https://api-sandbox.gestion.pe
// paywall-gestion-sandbox
// gprint-july-19

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
        const _description = description.replace(/<p>|<\/p>/g, '')
        return {
          sku,
          name,
          priceCode,
          pricingStrategyId,
          campaignCode,
          description: parse(_description),
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
