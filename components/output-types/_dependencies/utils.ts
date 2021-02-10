import { useAppContext } from 'fusion:context'

import { SITE_DEPOR } from '../../utilities/constants/sitenames'

export const getLang = (): string => {
  const { requestUri, arcSite } = useAppContext()
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

export const getIframeStory = (): boolean => {
  const { requestUri } = useAppContext()
  return requestUri.includes('/carga-continua')
}
