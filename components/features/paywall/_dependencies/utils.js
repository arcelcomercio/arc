import deepMap from 'map-values-deep'

export const deepMapValues = (obj, modifier) => deepMap(obj, modifier)

export const getArcErrorMessage = errCode => {
  switch (errCode) {
    //case '300170': ''
    default:
      return 'Disculpe, ha ocurrido un error durante el pago'
  }
}
