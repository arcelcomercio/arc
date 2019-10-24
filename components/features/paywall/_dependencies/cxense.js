import { ENVIRONMENT } from 'fusion:environment'

const isProd = ENVIRONMENT === 'elcomercio'
// eslint-disable-next-line import/prefer-default-export
export const pushCxense = productId => {
  if (window.cX) {
    window.cX.CCE.callQueue.push([
      'sendConversionEvent',
      {
        productId: isProd ? '8n3linhnzos6' : '8msif5r9dikx',
        funnelStep: 'convertProduct',
      },
    ])
  }
}
