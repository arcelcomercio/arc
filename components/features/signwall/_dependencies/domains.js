import { env } from '../../../utilities/arc/env'

class Domains {
  getOriginAPI = (site) => {
    switch (site) {
      case 'depor':
        return env === 'prod'
          ? `https://api.${site}.com`
          : `https://api-elcomercio-${site}-sandbox.cdn.arcpublishing.com`
      case 'peru21':
      case 'elbocon':
      case 'trome':
      case 'ojo':
      case 'diariocorreo':
        return env === 'prod'
          ? `https://api.${site}.pe`
          : `https://api-elcomercio-${site}-sandbox.cdn.arcpublishing.com`
      case 'peru21g21':
        return env === 'prod'
          ? `https://api.peru21.pe`
          : `https://api-elcomercio-peru21-sandbox.cdn.arcpublishing.com`
      case 'elcomerciomag':
        return env === 'prod'
          ? `https://api.elcomercio.pe`
          : `https://api-sandbox.elcomercio.pe`
      default:
        return env === 'prod'
          ? `https://api.${site}.pe`
          : `https://api-sandbox.${site}.pe`
    }
  }

  getUrlPaywall = (site) =>
    env === 'prod'
      ? `/suscripcionesdigitales/`
      : `/suscripcionesdigitales/?_website=${site}&outputType=subscriptions`

  getUrlECOID = () => {
    const arcEnv = env === 'prod' ? '' : 'pre.'
    return `https://${arcEnv}ecoid.pe`
  }

  getPoliticsTerms = (type, site) => {
    const arcEnv = env === 'prod' ? '' : 'pre.'

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

    return type === 'terms'
      ? `https://${arcEnv}ecoid.pe/terminos_y_condiciones/${hashSite[site]}`
      : `https://${arcEnv}ecoid.pe/politica_privacidad/${hashSite[site]}`
  }

  getScriptSales = () =>
    `https://arc-subs-sdk.s3.amazonaws.com/${env}/sdk-sales.min.js`

  getUrlNewsLetters = () =>
    env === 'prod'
      ? 'https://afv5trdj4i.execute-api.us-east-1.amazonaws.com/prod/userprofile/public/v1'
      : 'https://vq01ksb95d.execute-api.us-east-1.amazonaws.com/dev/userprofile/public/v1'

  getListBundle = () => ['UJWWFG', '7NK9SV', 'DQZ00K', 'OKLLPH', 'NO07ET'] // price code bundle sandbox & prod

  getPayuSDK = () =>
    env === 'prod'
      ? 'https://d2g037f9e082nm.cloudfront.net/creativos/payu-sdk/payu-sdk.js'
      : 'https://signwall-test.e3.pe/static/payu-sdk.js'

  getPayuTags = () => 'https://maf.pagosonline.net/ws/fp/tags.js?id='

  getUrlComercioSubs = () => {
    const arcEnv = env === 'prod' ? '' : 'dev'
    return `https://${arcEnv}paywall.comerciosuscripciones.pe/api`
  }

  getUrlProfile = (arcSite) =>
    env === 'prod'
      ? '/mi-perfil/?outputType=subscriptions'
      : `/mi-perfil/?_website=${arcSite}&outputType=subscriptions`

  getUrlLandingAuth = (arcSite) =>
    env === 'prod'
      ? '/auth-fia/?outputType=subscriptions'
      : `/auth-fia/?_website=${arcSite}&outputType=subscriptions`

  getUrlPaywallFia = (arcSite) =>
    env === 'prod'
      ? `/suscripcionesdigitales/fia/?ref=auth-fia`
      : `/suscripcionesdigitales/fia/?_website=${arcSite}&outputType=subscriptions`

  getUrlSignwall = (arcSite, typeDialog, hash) =>
    env === 'prod'
      ? `/signwall/?outputType=subscriptions&${typeDialog}=${hash}`
      : `/signwall/?_website=${arcSite}&outputType=subscriptions&${typeDialog}=${hash}`

  getGoogleID = () =>
    env === 'prod'
      ? '519633312892-3kpve55sqi0k1nq2n4f9suag9sji41jh.apps.googleusercontent.com'
      : '519633312892-3kpve55sqi0k1nq2n4f9suag9sji41jh.apps.googleusercontent.com'
}

export default new Domains()
