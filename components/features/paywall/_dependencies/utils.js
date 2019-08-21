import deepMap from 'deep-map-object'

export const deepMapValues = (obj, modifier) => deepMap(modifier)(obj)

export const getArcErrorMessage = errCode => {
  switch (errCode) {
    //case '300170': ''
    default:
      return 'Disculpe, ha ocurrido un error durante el pago'
  }
}
