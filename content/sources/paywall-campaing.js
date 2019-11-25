/* eslint-disable import/no-extraneous-dependencies */
import request from 'request-promise-native'
import getProperties from 'fusion:properties'
import { interpolateUrl } from '../../components/features/paywall/_dependencies/domains'

const fetch = (key = {}) => {
  const site = key['arc-site']
  const { documentType = 'DNI', documentNumber, attemptToken, event } = key
  const {
    paywall: { urls },
  } = getProperties(site)

  const isCheckingSubscriptor = !!attemptToken
  const isEvent = !!event
  const params = {
    ...(isCheckingSubscriptor
      ? {
          isCheckingSubscriptor,
          documentType,
          documentNumber,
          attemptToken,
        }
      : {}),
    ...(isEvent ? { isEvent, event } : {}),
  }

  const url = interpolateUrl(urls.originSubscriptions, params)
  return request({
    uri: url,
    json: true,
  }).then(data => {
    const {
      campaign: { name: campaignCode },
      subscriber = {},
      error,
      products: [{ sku, attributes, pricingStrategies }],
    } = data
    const {
      printed,
      freeAccess,
      firstName = '',
      lastName = '',
      secondLastName = '',
    } = subscriber

    const summary = attributes.reduce(
      (prev, { name: _name, value }) => {
        const prez = prev
        const _value = (value || '').replace(/<p>|<\/p>/g, '')
        switch (_name) {
          case 'feature':
            prez[_name].push(_value)
            break
          case 'title':
            prez[_name] = _value
            break
          default:
            prez[_name] = _value
            break
        }
        return prez
      },
      { feature: [] }
    )

    const { title: name = 'Plan Digital' } = summary

    const plans = pricingStrategies.map(
      ({ pricingStrategyId, priceCode, description, rates }) => {
        const [price] = rates
        const { amount, billingFrequency } = price
        let parsedDescription = (description || '').replace(/<p>|<\/p>/g, '')
        try {
          parsedDescription = JSON.parse(parsedDescription)
        } catch (err) {
          parsedDescription = { err: 'is not a object' }
        }
        return {
          sku,
          name,
          priceCode,
          pricingStrategyId,
          campaignCode,
          description: parsedDescription,
          amount: parseInt(amount, 10),
          billingFrequency,
        }
      }
    )

    // prettier-ignore
    return Object.assign(
      {
        name,
        event,
        summary,
        plans,
        freeAccess: freeAccess ? { firstName, lastName, secondLastName } : undefined,
        printedSubscriber: printed ? { documentType, documentNumber } : undefined,
      },
      error ? { error } : {}
    )
  })
}

// https://api-sandbox.gestion.pe
// paywall-gestion-sandbox
// gprint-july-19
export default {
  fetch,
  params: {
    documentNumber: 'text',
    documentType: 'text',
    attemptToken: 'text',
    event: 'text',
  },
  ttl: 20,
}
