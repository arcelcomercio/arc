/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import { ENVIRONMENT, CONTEXT_PATH } from 'fusion:environment'
import templayed from 'templayed'

// prettier-ignore
export function interpolateUrl (template, context) {
  if(!template) {
    throw new Error(`La plantilla de url no es valida. (${template})`)
  }
  const isProd = ENVIRONMENT === 'elcomercio'
  const implicitContext = {
    isProd,
    contextPath: isProd ? '' : CONTEXT_PATH,
    hasParams: !!context
  }
  return templayed(template)({ ...implicitContext, ...(context||{}) })
}
