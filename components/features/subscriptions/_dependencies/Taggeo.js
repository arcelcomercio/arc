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

export const TaggeoJoao = (obj, path) => {
  window.dataLayer.push(obj)
  if (!IsPROD) {
    window.console.groupCollapsed(
      `%c 🔔 Taggeo Joao - Categoria: ${obj.category} | Ruta: ${path}`,
      'color:  purple; font-size: 12px'
    )
    window.console.table(obj)
    window.console.groupEnd()
  }
}

export const TagsAdsMurai = (obj, path) => {
  window.dataLayer.push(obj)
  if (!IsPROD) {
    window.console.groupCollapsed(
      `%c 🔔 Taggeo AdsMurai - Data: ${obj} | Ruta: ${path}`,
      'color:  blue; font-size: 12px'
    )
    window.console.table(obj)
    window.console.groupEnd()
  }
}

/**
 * @typedef {object} EventCategoryOpts
 * @property {(1|2|3)} step
 * @property {"winback"} [event]
 * @property {boolean} [hasPrint] - Indica si el usuario tiene suscripción impresa
 * @property {string} plan - Plan por defecto
 * @property {boolean} [cancel] - Plan por defecto
 */

/**
 * @param {EventCategoryOpts}
 * @returns {string}
 */
export const eventCategory = ({ step, event, hasPrint, plan, cancel }) => {
  let planName = plan ? plan.replace(' ', '_') : ''
  if (event && event === 'winback') {
    planName = 'Plan_Winback'
  } else if (hasPrint) {
    planName = 'Plan_Suscriptor'
  }
  return `P${step}_${planName}${cancel ? '_Cancelado' : ''}`
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

export const pushCxense = (codeCxense) => {
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
