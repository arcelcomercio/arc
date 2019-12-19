/* eslint-disable import/prefer-default-export */
export const clean = obj => {
  const objParams = obj
  const objKeys = Object.keys(objParams)
  objKeys.forEach(
    key =>
      (objParams[key] === null ||
        objParams[key] === undefined ||
        objParams[key] === '') &&
      delete objParams[key]
  )
  return objParams
}
