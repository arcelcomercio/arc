import { ArcSite } from 'fusion:context'
import { ENVIRONMENT } from 'fusion:environment'
import getProperties from 'fusion:properties'

import { ORGANIZATION, PROD, SANDBOX } from '../constants/environment'

export const env = ENVIRONMENT === ORGANIZATION ? PROD : SANDBOX

export const originByEnv = (arcSite: ArcSite): string => {
  const { siteUrl } = getProperties(arcSite)
  return env === PROD
    ? siteUrl
    : `https://${ORGANIZATION}-${arcSite}-sandbox.cdn.arcpublishing.com`
}
