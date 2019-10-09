import getProperties from 'fusion:properties'
import { interpolateUrl } from '../../components/features/paywall/_dependencies/domains'

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
  resolve(key = {}) {
    const { documentType = 'DNI', documentNumber, attemptToken } = key
    const website = key['arc-site']
    this.document = {
      documentType,
      documentNumber,
    }
    const {
      paywall: { urls },
    } = getProperties(website)
    return interpolateUrl(
      urls.originSubscriptions,
      attemptToken ? { documentType, documentNumber, attemptToken } : undefined
    )
  },
  params: {
    documentNumber: 'text',
    documentType: 'text',
    attemptToken: 'text',
  },
  ttl: 20,
  transform(data) {
    const [{ sku, attributes, pricingStrategies }] = data.products
    const {
      campaign: { name: campaignCode },
      subscriber = {},
      error,
    } = data
    const { printed = undefined } = subscriber;

    const plans = pricingStrategies.map(
      ({ pricingStrategyId, priceCode, description = '', rates }) => {
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
      (prev, { name: _name, value = '' }) => {
        const prez = prev
        const _value = value.replace(/<p>|<\/p>/g, '')
        switch(_name){
          case 'feature': 
          prez[_name].push(_value)
          break;
          case 'title':
            prez[_name] = _value
          break;
        default :
        prez[_name] = _value
        break;
        }
        return prez
      },
      { feature: [] }
    )

    const { title: name = 'Plan Digital' } = summary

    return Object.assign(
      {
        name,
        summary,
        plans,
        printedSubscriber: printed ? this.document : undefined,
      },
      error ? { error } : {}
    )
  },
}
