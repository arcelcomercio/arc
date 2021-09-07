import getProperties from 'fusion:properties'
import { ArcSite } from 'types/fusion'

import { isProd } from '../arc/env'

const getApiOrigin = (arcSite: ArcSite): string => {
  const { siteDomain } = getProperties(arcSite)
  return `https://api${isProd ? '' : '-sandbox'}.${siteDomain}`
}

export { getApiOrigin }
