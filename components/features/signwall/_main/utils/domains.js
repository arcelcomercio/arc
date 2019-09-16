import ENV from 'fusion:environment'

class Domains {
  getOriginAPI = site => {
    switch (site) {
      case 'peru21':
        return ENV.ENVIRONMENT === 'elcomercio'
          ? `https://api.${site}.pe`
          : `https://api-elcomercio-peru21-sandbox.cdn.arcpublishing.com`
      default:
        return ENV.ENVIRONMENT === 'elcomercio'
          ? `https://api.${site}.pe`
          : `https://api-sandbox.${site}.pe`
    }
  }

  getUrlPaywall = () => {
    return ENV.ENVIRONMENT === 'elcomercio'
      ? '/suscripcionesdigitales/'
      : '/suscripcionesdigitales/?_website=gestion&outputType=paywall#step1'
  }

  getUrlECOID = () => {
    return ENV.ENVIRONMENT === 'elcomercio'
      ? 'https://ecoid.pe'
      : 'https://pre.ecoid.pe'
  }

  getPoliticsTerms = (type, site) => {
    const hashSite = {
      elcomercio: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
      gestion: '108f85a3d8e750a325ced951af6cd758a90e73a34',
      peru21: 'f7bd562ca9912019255511635185bf2b',
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
}

export default new Domains()
