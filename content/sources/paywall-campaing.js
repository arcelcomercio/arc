/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import request from 'request-promise-native'
import getProperties from 'fusion:properties'
import { interpolateUrl } from '../../components/features/paywall/_dependencies/domains'

const fetch = (key = {}) => {
  const site = key['arc-site']
  const {
    documentType = 'DNI',
    documentNumber,
    attemptToken,
    event,
    fromFia,
  } = key
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
    ...(fromFia ? { fromFia: true } : {}),
  }

  const url = interpolateUrl(urls.originSubscriptions, params)
  return request({
    uri: url,
    json: true,
  }).then(data => {
    const validCampaing = data.campaign || data.campaigns[0]
    const campaignCode = (validCampaing && validCampaing.name) || ''
    const {
      subscriber = {},
      error,
      attributes: printAttributes,
      products: [
        {
          sku,
          name: productName,
          description: productDescription,
          attributes,
          pricingStrategies,
        },
      ],
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
          case 'plan_title':
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
        const parsedDescription = parseJSON(description)
        return {
          sku,
          name,
          productName,
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
        fromFia: !!fromFia,
        summary,
        plans,
        description: parseJSON(productDescription),
        freeAccess: freeAccess ? { firstName, lastName, secondLastName } : undefined,
        printedSubscriber: printed ? { documentType, documentNumber } : undefined,
        printAttributes,
        msgs: printAttributes.reduce((prev, it) => ({...prev, [it.name]: it.value}), {})
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
    fromFia: 'text',
    documentNumber: 'text',
    documentType: 'text',
    attemptToken: 'text',
    // event: 'text',
  },
  ttl: 20,
}

function parseJSON(str) {
  const noParagraphStr = (str || '').replace(/<p>|<\/p>/g, '')
  try {
    return JSON.parse(noParagraphStr)
  } catch (err) {
    return { err: 'is not a object' }
  }
}
