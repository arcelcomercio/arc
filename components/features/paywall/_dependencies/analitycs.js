export const PixelActions = {
  PAYMENT_PLAN: 'paywall_planes',
  PAYMENT_PROFILE: 'paywall_datos',
  PAYMENT_CARD_INFO: 'paywall_pago',
  PAYMENT_CONFIRMATION: 'paywall_confirmacion',
}
export function sendAction(action, payload = {}) {
  if (window.dataLayer) {
    window.dataLayer.push({
      event: action,
      ...payload,
    })
  }
}
