import getProperties from 'fusion:properties'

import { env, isProd } from '../../../utilities/arc/env'

export const getOriginAPI = (site) => {
  const { siteDomain } = getProperties(site)
  return `https://api${isProd ? '' : '-sandbox'}.${siteDomain}`
}

export const TermsConditions = (site) => {
  switch (site) {
    case 'depor': {
      return '/terminos-servicio/'
    }
    default: {
      return '/terminos-y-condiciones/'
    }
  }
}

export const PolicyPrivacy = (site) => {
  switch (site) {
    case 'elcomercio':
    case 'depor': {
      return '/politicas-privacidad/'
    }
    case 'peru21': {
      return '/politicas-de-privacidad/'
    }
    default: {
      return '/politica-de-privacidad/'
    }
  }
}

export const dataTreatment = '/tratamiento-de-datos/'

export const getUrlPaywall = (site) =>
  `/suscripcionesdigitales/${
    isProd ? '' : `?_website=${site}&outputType=subscriptions`
  }`

export const getUrlECOID = `https://${isProd ? '' : 'pre.'}ecoid.pe`

export const getScriptSales = `https://arc-subs-sdk.s3.amazonaws.com/${env}/sdk-sales.min.js`

export const getUrlNewsLetters = `https://${
  isProd ? 'afv5trdj4i' : 'vq01ksb95d'
}.execute-api.us-east-1.amazonaws.com/${
  isProd ? 'prod' : 'dev'
}/userprofile/public/v1`

export const getListBundle = ['UJWWFG', '7NK9SV', 'DQZ00K', 'OKLLPH', 'NO07ET']

export const getUrlMiddleWare = `https://${
  isProd ? '' : 'dev'
}paywall.comerciosuscripciones.pe/api`

export const getUrlProfile = (arcSite) =>
  `/mi-perfil/?outputType=subscriptions${isProd ? '' : `&_website=${arcSite}`}`

export const getUrlLandingAuth = (arcSite) =>
  `/auth-fia/?outputType=subscriptions${isProd ? '' : `&_website=${arcSite}`}`

export const getUrlSignwall = (arcSite, typeDialog, hash) =>
  `/signwall/?outputType=subscriptions${
    isProd
      ? `&${typeDialog}=${hash}`
      : `&_website=${arcSite}&${typeDialog}=${hash}`
  }`
