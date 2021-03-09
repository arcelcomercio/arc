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

export const getIsStory = (): boolean => {
  const { requestUri, metaValue } = useAppContext()
  return (
    metaValue('id') === 'meta_story' ||
    /^\/preview\/([A-Z0-9]{26})\/?/.test(requestUri)
  )
}
