import { ENVIRONMENT } from 'fusion:environment'
import getProperties from 'fusion:properties'
import { ORGANIZATION, PROD, SANDBOX } from '../constants/environment'

/**
 * @type {(PROD | SANDBOX)} Env
 * @returns {Env}
 */
export const env = ENVIRONMENT === ORGANIZATION ? PROD : SANDBOX

/**
 * @param {string} arcSite
 * @returns {string} URL del sitio según entorno
 */
export const originByEnv = arcSite => {
  const { siteUrl } = getProperties(arcSite)
  return env === PROD
    ? siteUrl
    : `https://${ORGANIZATION}-${arcSite}-sandbox.cdn.arcpublishing.com`
}
