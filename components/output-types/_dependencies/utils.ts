import { useFusionContext } from 'fusion:context'

import { SITE_DEPOR } from '../../utilities/constants/sitenames'

const { requestUri, arcSite } = useFusionContext()

export const getLang = (): string => {
  let lang = 'es'

  if (arcSite === SITE_DEPOR) {
    if (requestUri.match('^/usa')) {
      lang = 'es-us'
    } else if (/^\/mexico/.test(requestUri)) {
      lang = 'es-mx'
    }
  }

  return lang
}

export const getIframeStory = (): boolean =>
  requestUri.includes('/carga-continua')
