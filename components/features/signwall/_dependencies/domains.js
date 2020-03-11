import ENV from 'fusion:environment'

class Domains {
  getOriginAPI = site => {
    const _env_ = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'

    switch (site) {
      case 'depor':
        return _env_ === 'prod'
          ? `https://api.${site}.com`
          : `https://api-elcomercio-${site}-sandbox.cdn.arcpublishing.com`
      case 'peru21':
      case 'elbocon':
      case 'trome':
      case 'ojo':
      case 'diariocorreo':
        return _env_ === 'prod'
          ? `https://api.${site}.pe`
          : `https://api-elcomercio-${site}-sandbox.cdn.arcpublishing.com`
      case 'peru21g21':
        return _env_ === 'prod'
          ? `https://api.peru21.pe`
          : `https://api-elcomercio-peru21-sandbox.cdn.arcpublishing.com`
      case 'elcomerciomag':
        return _env_ === 'prod'
          ? `https://api.elcomercio.pe`
          : `https://api-sandbox.elcomercio.pe`
      default:
        return _env_ === 'prod'
          ? `https://api.${site}.pe`
          : `https://api-sandbox.${site}.pe`
    }
  }

  getUrlPaywall = site => {
    return ENV.ENVIRONMENT === 'elcomercio'
      ? `/suscripcionesdigitales/`
      : `/suscripcionesdigitales/?_website=${site}&outputType=paywall#step1`
  }

  getUrlECOID = () => {
    const _env_ = ENV.ENVIRONMENT === 'elcomercio' ? '' : 'pre.'
    return `https://${_env_}ecoid.pe`
  }

  getPoliticsTerms = (type, site) => {
    const _env_ = ENV.ENVIRONMENT === 'elcomercio' ? '' : 'pre.'

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
      ? `https://${_env_}ecoid.pe/terminos_y_condiciones/${hashSite[site]}`
      : `https://${_env_}ecoid.pe/politica_privacidad/${hashSite[site]}`
  }

  getScriptSales = () => {
    const _env_ = ENV.ENVIRONMENT === 'elcomercio' ? 'prod' : 'sandbox'
    return `https://arc-subs-sdk.s3.amazonaws.com/${_env_}/sdk-sales.min.js`
  }

  getUrlNewsLetters = () => {
    return ENV.ENVIRONMENT === 'elcomercio'
      ? 'https://afv5trdj4i.execute-api.us-east-1.amazonaws.com/prod/userprofile/public/v1'
      : 'https://vq01ksb95d.execute-api.us-east-1.amazonaws.com/dev/userprofile/public/v1'
  }

  getListBundle = () => {
    return ['UJWWFG', '7NK9SV', 'DQZ00K', 'OKLLPH', 'NO07ET'] // price code bundle sandbox & prod
  }

  getPayuSDK = () => {
    return 'https://d2g037f9e082nm.cloudfront.net/creativos/payu-sdk/payu-sdk.js'
  }

  getPayuTags = () => {
    return 'https://maf.pagosonline.net/ws/fp/tags.js?id='
  }

  getUrlComercioSubs = () => {
    const _env_ = ENV.ENVIRONMENT === 'elcomercio' ? '' : 'dev'
    return `https://${_env_}paywall.comerciosuscripciones.pe/api`
  }

  getUrlProfile = () => {
    return '/mi-perfil/?outputType=signwall'
  }

  getUrlLandingAuth = arcSite => {
    return ENV.ENVIRONMENT === 'elcomercio'
      ? '/auth-fia/?outputType=signwall'
      : `/pf/auth-fia/?_website=${arcSite}&outputType=signwall`
  }

  getUrlPaywallFia = arcSite => {
    return ENV.ENVIRONMENT === 'elcomercio'
      ? `/suscripcionesdigitales/fia/planes/`
      : `/pf/suscripcionesdigitales/fia/planes/?_website=${arcSite}&outputType=paywall`
  }
}

export default new Domains()
