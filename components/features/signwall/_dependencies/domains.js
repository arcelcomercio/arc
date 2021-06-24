import getProperties from 'fusion:properties'

import { env, isProd } from '../../../utilities/arc/env'

const getOriginAPI = (site) => {
  const { siteDomain } = getProperties(site)
  return `https://api${isProd ? '' : '-sandbox'}.${siteDomain}`
}

const getUrlPaywall = (site) =>
  isProd
    ? `/suscripcionesdigitales/`
    : `/suscripcionesdigitales/?_website=${site}&outputType=subscriptions`

const getUrlECOID = `https://${isProd ? '' : 'pre.'}ecoid.pe`

const getScriptSales = `https://arc-subs-sdk.s3.amazonaws.com/${env}/sdk-sales.min.js`

const getUrlNewsLetters = `https://${
  isProd ? 'afv5trdj4i' : 'vq01ksb95d'
}.execute-api.us-east-1.amazonaws.com/${
  isProd ? 'prod' : 'dev'
}/userprofile/public/v1`

const getListBundle = ['UJWWFG', '7NK9SV', 'DQZ00K', 'OKLLPH', 'NO07ET'] // price code bundle sandbox & prod

const getUrlMiddleWare = `https://${
  isProd ? '' : 'dev'
}paywall.comerciosuscripciones.pe/api`

const getUrlProfile = (arcSite) =>
  isProd
    ? '/mi-perfil/?outputType=subscriptions'
    : `/mi-perfil/?outputType=subscriptions&_website=${arcSite}`

const getUrlLandingAuth = (arcSite) =>
  isProd
    ? '/auth-fia/?outputType=subscriptions'
    : `/auth-fia/?outputType=subscriptions&_website=${arcSite}`

const getUrlSignwall = (arcSite, typeDialog, hash) =>
  isProd
    ? `/signwall/?outputType=subscriptions&${typeDialog}=${hash}`
    : `/signwall/?outputType=subscriptions&_website=${arcSite}&${typeDialog}=${hash}`

export {
  getListBundle,
  getOriginAPI,
  getScriptSales,
  getUrlECOID,
  getUrlLandingAuth,
  getUrlMiddleWare,
  getUrlNewsLetters,
  getUrlPaywall,
  getUrlProfile,
  getUrlSignwall,
}
