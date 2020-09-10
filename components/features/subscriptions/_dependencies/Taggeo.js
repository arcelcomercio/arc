import { titleCase } from './Utils'
import { IsPROD } from './Properties'

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
    if (!IsPROD) {
      window.console.groupCollapsed(
        `%c 🔔 Taggeo Detectado - Evento: ${dataPush.event}`,
        'color:  dodgerblue; font-size: 12px'
      )
      window.console.table(dataPush)
      window.console.groupEnd()
    }
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
