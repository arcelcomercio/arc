import ENV from 'fusion:environment'

class Domains {
  getOriginAPI = site => {
    switch (site) {
      case 'peru21':
      case 'depor':
      case 'elbocon':
        return ENV.ENVIRONMENT === 'elcomercio'
          ? `https://api.${site}.pe`
          : `https://api-elcomercio-${site}-sandbox.cdn.arcpublishing.com`
      case 'peru21g21':
        return ENV.ENVIRONMENT === 'elcomercio'
          ? `https://api.peru21.pe`
          : `https://api-elcomercio-peru21-sandbox.cdn.arcpublishing.com`
      case 'elcomerciomag':
        return ENV.ENVIRONMENT === 'elcomercio'
          ? `https://api.elcomercio.pe`
          : `https://api-sandbox.elcomercio.pe`
      default:
        return ENV.ENVIRONMENT === 'elcomercio'
          ? `https://api.${site}.pe`
          : `https://api-sandbox.${site}.pe`
    }
  }

  getUrlPaywall = site => {
    // eslint-disable-next-line no-nested-ternary
    return ENV.ENVIRONMENT === 'elcomercio'
      ? `/suscripcionesdigitales/`
      : site === 'elcomercio'
      ? `/suscripcionesdigitales/?_website=elcomercio&outputType=paywall#step1`
      : `/suscripcionesdigitales/?_website=gestion&outputType=paywall#step1`
  }

  getUrlECOID = () => {
    return ENV.ENVIRONMENT === 'elcomercio'
      ? 'https://ecoid.pe'
      : 'https://pre.ecoid.pe'
  }

  getPoliticsTerms = (type, site) => {
    const hashSite = {
      elcomerciomag: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
      elcomercio: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
      gestion: '108f85a3d8e750a325ced951af6cd758a90e73a34',
      peru21: 'f7bd562ca9912019255511635185bf2b',
      peru21g21: 'f7bd562ca9912019255511635185bf2b',
      elbocon: 'dcd90a2190d1682f39d41a4889a1cc57',
      depor: '6d83b35ec628d33d0606bcd9083dc2a6',
    }

    switch (type) {
      case 'terms':
        return ENV.ENVIRONMENT === 'elcomercio'
          ? `https://ecoid.pe/terminos_y_condiciones/${hashSite[site]}`
          : `https://pre.ecoid.pe/terminos_y_condiciones/${hashSite[site]}`
      case 'politics':
        return ENV.ENVIRONMENT === 'elcomercio'
          ? `https://ecoid.pe/politica_privacidad/${hashSite[site]}`
          : `https://pre.ecoid.pe/politica_privacidad/${hashSite[site]}`
      default:
        return `not link, not site`
    }
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
    return ['UJWWFG', '7NK9SV', 'DQZ00K'] // price code bundle sandbox & prod
  }

  getPayuSDK = () => {
    return 'https://d2g037f9e082nm.cloudfront.net/creativos/payu-sdk/payu-sdk.js'
  }

  getPayuTags = () => {
    return 'https://maf.pagosonline.net/ws/fp/tags.js?id='
  }
}

export default new Domains()
