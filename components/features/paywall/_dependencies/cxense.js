// eslint-disable-next-line import/prefer-default-export
export const pushCxense = codeCxense => {
  if (window.cX) {
    window.cX.CCE.callQueue.push([
      'sendConversionEvent',
      {
        productId: codeCxense,
        funnelStep: 'convertProduct',
      },
    ])
  }
}
