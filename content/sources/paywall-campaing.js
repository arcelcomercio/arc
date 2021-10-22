/* eslint-disable import/no-extraneous-dependencies */
import request from 'request-promise-native'

import { PropertiesSite } from '../../components/features/subscriptions/_dependencies/Properties'

function parseJSON(str) {
  const noParagraphStr = (str || '').replace(/<p>|<\/p>/g, '')
  try {
    return JSON.parse(noParagraphStr)
  } catch (err) {
    return { err: 'is not a object' }
  }
}

const fetch = (key = {}) => {
  const site = key['arc-site']
  const {
    documentType = 'DNI',
    documentNumber,
    attemptToken,
    event,
    fromFia,
    winback,
  } = key

  const isCheckingSubscriptor = !!attemptToken
  const isDniEvent = !!winback
  const isEvent = !!event
  const params = {
    ...(isCheckingSubscriptor
      ? {
          isCheckingSubscriptor,
          documentType,
          documentNumber,
          attemptToken,
          isDniEvent,
        }
      : {}),
    ...(isEvent ? { isEvent, event } : {}),
    ...(fromFia ? { fromFia: true } : {}),
  }

  const { urls } = PropertiesSite[site]
  // prettier-ignore
  const url = `${urls.subsDigitales}${params ? '?' : ''}${isCheckingSubscriptor ? `doctype=${documentType}&docnumber=${documentNumber}&token=${attemptToken}${isDniEvent ? `&subscriptor_event=suscripitor_winback&event=winback` : ''}` : ''}${isEvent ? `${isCheckingSubscriptor ? '&' : ''}event=${event}` : ''}${fromFia ? 'from_fia=true' : ''}`

  return request({
    uri: url,
    gzip: true,
    json: true,
  }).then((data) => {
    const validCampaing = data.campaign || data.campaigns[0]
    const campaignCode = (validCampaing && validCampaing.name) || ''
    const {
      subscriber = {},
      error,
      event: eventWinback,
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
        const val = (value || '').replace(/<p>|<\/p>/g, '')
        switch (_name) {
          case 'feature':
            prez[_name].push(val)
            break
          case 'title':
            prez[_name] = val
            break
          case 'plan_title':
            prez[_name] = val
            break
          default:
            prez[_name] = val
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
    return {
      name,
        // event,
        fromFia: !!fromFia,
        summary,
        plans,
        description: parseJSON(productDescription),
        freeAccess,
        // eslint-disable-next-line no-nested-ternary
        subscriber: freeAccess ? { firstName, lastName, secondLastName } : printed ? {documentType, documentNumber} : undefined,
        printedSubscriber: printed,
        printAttributes,
        msgs: printAttributes.reduce((prev, it) => ({...prev, [it.name]: it.value}), {}),
      // eslint-disable-next-line no-nested-ternary
      ...(event ? {event} : eventWinback ? { "event": eventWinback} : {}),
      ...(error ? { error } : {})
    }
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
    event: 'text',
    winback: 'text',
  },
  ttl: 20,
}
