import {ENVIRONMENT, CONTEXT_PATH} from 'fusion:environment'

const isProd = ENVIRONMENT === 'elcomercio';
const queryString = isProd ? '' : '?_website=gestion&outputType=paywall'
const context = isProd ? '' : CONTEXT_PATH;

const domains = {
  URL_CORPORATE : () => `${context}/suscripcionesdigitales/empresa/${queryString}`,
  URL_FAQ : () => `${context}/suscripcionesdigitales/faq/${queryString}`,
  PWA_DOMAIN : ENV => {
    const _env_ = ENV === 'elcomercio' ? '' : '.dev'
    return `https://pwa${_env_}.gestion.pe`;
  },
  ORIGIN_API: ENV => {
    const _env_ = ENV === 'elcomercio' ? '' : '-sandbox'
    return `https://api${_env_}.gestion.pe`
  },
  ORIGIN_IDENTITY_SDK: ENV => {
    const _env_ = ENV === 'elcomercio' ? 'prod' : 'sandbox' // included localhost
    return `https://arc-subs-sdk.s3.amazonaws.com/${_env_}/sdk-identity.min.js`
  },
  ORIGIN_SALES_SDK: ENV => {
    const _env_ = ENV === 'elcomercio' ? 'prod' : 'sandbox' // included localhost
    return `https://arc-subs-sdk.s3.amazonaws.com/${_env_}/sdk-sales.min.js`
  },
  ORIGIN_PAYU_SDK: ENV => {
    return `https://d2g037f9e082nm.cloudfront.net/creativos/payu-sdk/payu-sdk.js`
  },
  ORIGIN_SUBSCRIPTION_CORP_API: ENV => {
    return `http://devpaywall.comerciosuscripciones.pe/api/subs-corporativa/`
  },

  get: function getService(service){
        return this[service](ENVIRONMENT)
    }
  }

  export default domains.get.bind(domains);