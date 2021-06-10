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

const getPoliticsTerms = (type, site) => {
  const hashSite = {
    elcomerciomag: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
    elcomercio: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
    gestion: '108f85a3d8e750a325ced951af6cd758a90e73a34',
    peru21: 'f7bd562ca9912019255511635185bf2b',
    peru21g21: 'f7bd562ca9912019255511635185bf2b',
    elbocon: 'dcd90a2190d1682f39d41a4889a1cc57',
    depor: '6d83b35ec628d33d0606bcd9083dc2a6',
    trome: '4895ff32853e4dd68b5bd63c6437d17c',
    ojo: 'r2tbzg902jxaq6c0tmc2zr6txgzfzmiy',
    diariocorreo: '547a1802dfdcaa443d08c92c8dac62e9',
  }
  return `https://${isProd ? '' : 'pre.'}ecoid.pe/${
    type === 'terms' ? 'terminos_y_condiciones' : 'politica_privacidad'
  }/${hashSite[site]}`
}

const getScriptSales = `https://arc-subs-sdk.s3.amazonaws.com/${env}/sdk-sales.min.js`

const getUrlNewsLetters = `https://${
  isProd ? 'afv5trdj4i' : 'vq01ksb95d'
}.execute-api.us-east-1.amazonaws.com/${
  isProd ? 'prod' : 'dev'
}/userprofile/public/v1`

const getListBundle = ['UJWWFG', '7NK9SV', 'DQZ00K', 'OKLLPH', 'NO07ET'] // price code bundle sandbox & prod

const getPayuSDK = isProd
  ? 'https://d2g037f9e082nm.cloudfront.net/creativos/payu-sdk/payu-sdk.js'
  : 'https://signwall-test.e3.pe/static/payu-sdk.js'

const getUrlComercioSubs = `https://${
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
  getPayuSDK,
  getPoliticsTerms,
  getScriptSales,
  getUrlComercioSubs,
  getUrlECOID,
  getUrlLandingAuth,
  getUrlNewsLetters,
  getUrlPaywall,
  getUrlProfile,
  getUrlSignwall,
}
