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
  if (window.dataLayer) {
    window.dataLayer.push({
      event: action,
      ...payload,
    })
  }
}
