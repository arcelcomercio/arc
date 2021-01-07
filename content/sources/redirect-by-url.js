/* eslint-disable no-param-reassign */
// eslint-disable-next-line import/no-extraneous-dependencies
import RedirectError from '../../components/utilities/redirect-error'
import { SITE_DEPOR, SITE_ELCOMERCIO } from '../../components/utilities/constants/sitenames'

const params = [
  {
    name: 'website_url',
    displayName: 'URL',
    type: 'text',
  },
]

const redirectRules = (websiteUrl, arcSite) => {
  if(arcSite === SITE_DEPOR) {
    return `${websiteUrl.replace('/amp/depor/', '/amp/')}`
  } 
  if(arcSite === SITE_ELCOMERCIO) {
    let url = websiteUrl
    if(url.indexOf('/redaccion-dt/') >= 4){
      url = '/autor/redaccion-dt/'
    }
    return `${url.replace('%E2%80%8E', '')}`
  }
  return websiteUrl
}

const redirect = ({
  website_url: websiteUrl,
  'arc-site': website,
} = {}) => {
  if (!websiteUrl) {
    throw new Error('Esta fuente de contenido requiere una URI y un sitio web')
  }
  if (!website) {
    throw new Error('Arc Site no está definido')
  }
  const urlRedirect = redirectRules(websiteUrl, website)

  throw new RedirectError(urlRedirect, 301)
}

const resolve = key => redirect(key)

export default {
  resolve,
  params,
  ttl: 300,
}
