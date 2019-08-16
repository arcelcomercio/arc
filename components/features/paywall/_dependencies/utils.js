import deepMap from 'deep-map-object'

export const deepMapValues = (obj, modifier) => deepMap(modifier)(obj)
