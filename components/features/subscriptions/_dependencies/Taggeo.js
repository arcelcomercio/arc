// import ENV from 'fusion:environment'

const titleCase = string => {
  const wordsArray = string.toLowerCase().split(/_/)
  const upperCased = wordsArray.map(word => {
    return word.charAt(0).toUpperCase() + word.substr(1)
  })
  return upperCased.join('_')
}

export const Taggeo = (cat, acc) => {
  const TRIGGER = 'tag_signwall'
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    const dataPush = {
      event: TRIGGER,
      eventCategory: titleCase(cat),
      eventAction: acc,
    }
    window.dataLayer.push(dataPush)
    // if (ENV.ENVIRONMENT !== 'elcomercio') {
    //   window.console.log(dataPush) // Only sandbox ;)
    // }
  }
}

export const PixelActions = {
  PAYMENT_PLAN: 'paywall_planes',
  PAYMENT_PROFILE: 'paywall_datos',
  PAYMENT_CARD_INFO: 'paywall_pago',
  PAYMENT_CONFIRMATION: 'paywall_confirmacion',
  PRODUCT_IMPRESSION: 'productImpression',
  PRODUCT_CLICK: 'productClick',
  CHECK_SUBSCRIPTOR_OPEN: 'web_paywall_dni_open',
  CHECK_SUBSCRIPTOR_CLOSE: 'web_paywall_dni_close',
  CHECK_SUBSCRIPTOR_SUBMIT: 'web_paywall_dni_continuar',
}

export function sendAction(action, payload = {}) {
  if (window.dataLayer && typeof window !== 'undefined') {
    window.dataLayer.push({
      event: action,
      ...payload,
    })
  }
}

export const pushCxense = codeCxense => {
  if (window.cX && typeof window !== 'undefined') {
    window.cX.CCE.callQueue.push([
      'sendConversionEvent',
      {
        productId: codeCxense,
        funnelStep: 'convertProduct',
      },
    ])
  }
}
