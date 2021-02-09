import { ENVIRONMENT } from 'fusion:environment'
import getProperties from 'fusion:properties'
import ORGANIZATION from '../constants/organization'

/**
 * @type {('prod' | 'sandbox')} Env
 * @returns {Env}
 */
export const env = () => (ENVIRONMENT === ORGANIZATION ? 'prod' : 'sandbox')

/**
 * @param {string} arcSite
 * @returns {string} URL del sitio según entorno
 */
export const urlByEnv = arcSite => {
  const { siteUrl } = getProperties(arcSite)
  return env() === 'prod'
    ? siteUrl
    : `https://${ORGANIZATION}-${arcSite}-sandbox.cdn.arcpublishing.com`
}
