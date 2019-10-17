// eslint-disable-next-line import/prefer-default-export
export const pushCxense = productId => {
  if (window.cX) {
    window.cX.CCE.callQueue.push([
      'sendConversionEvent',
      {
        productId,
        funnelStep: 'convertProduct',
      },
    ])
  }
}
