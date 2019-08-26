import { ENVIRONMENT, CONTEXT_PATH } from 'fusion:environment'

const isProd = ENVIRONMENT === 'elcomercio'
const queryString = isProd ? '' : '?_website=gestion&outputType=paywall'
const context = isProd ? '' : CONTEXT_PATH

const domains = {
  URL_CORPORATE: () =>
    `${context}/suscripcionesdigitales/empresa/${queryString}`,
  URL_FAQ: () => `${context}/suscripcionesdigitales/faq/${queryString}`,
  URL_DIGITAL: () => `${context}/suscripcionesdigitales${queryString}`,
  VALIDATE_SUSCRIPTOR: (ENV, documentType, documentNumber, attemptToken) => {
    return `${context}/suscripcionesdigitales/${documentType}/${documentNumber}/${attemptToken}${queryString}`
  },
  PWA_DOMAIN: (ENV, opts) => {
    const _env_ = ENV === 'elcomercio' ? '' : '.dev'
    return `https://pwa${_env_}.gestion.pe`
  },
  ORIGIN_API: (ENV, opts) => {
    const _env_ = ENV === 'elcomercio' ? '' : '-sandbox'
    return `https://api${_env_}.gestion.pe`
  },
  ORIGIN_IDENTITY_SDK: (ENV, opts) => {
    const _env_ = ENV === 'elcomercio' ? 'prod' : 'sandbox'
    return `https://arc-subs-sdk.s3.amazonaws.com/${_env_}/sdk-identity.min.js`
  },
  ORIGIN_SALES_SDK: (ENV, opts) => {
    const _env_ = ENV === 'elcomercio' ? 'prod' : 'sandbox'
    return `https://arc-subs-sdk.s3.amazonaws.com/${_env_}/sdk-sales.min.js`
  },
  ORIGIN_PAYU_SDK: (ENV, opts) => {
    return `https://d2g037f9e082nm.cloudfront.net/creativos/payu-sdk/payu-sdk.js`
  },
  ORIGIN_PAYU_TAGS: (ENV, { deviceSessionId }) => {
    if (!deviceSessionId)
      throw new Error(
        'deviceSessionId es necesario para formar la url para el tag de seguridad de PayU'
      )
    return `https://maf.pagosonline.net/ws/fp/tags.js?id=${deviceSessionId}80200`
  },
  ORIGIN_SUBSCRIPTION_CORP_API: (ENV, opts) => {
    const _env_ = ENV === 'elcomercio' ? '' : 'dev'
    return `https://${_env_}paywall.comerciosuscripciones.pe/api/subs-corporativa/`
  },
  ORIGIN_SUBSCRIPTION_ONLINE_TOKEN: (ENV, opts) => {
    const _env_ = ENV === 'elcomercio' ? '' : 'dev'
    return `https://${_env_}paywall.comerciosuscripciones.pe/api/subscription-online/token/`
  },
  ORIGIN_SUSCRIPCIONES: (ENV, opts) => {
    const _env_ = ENV === 'elcomercio' ? '' : 'dev'
    return `https://${_env_}paywall.comerciosuscripciones.pe`
  },

  get: function getService(...params) {
    const [service, ...rest] = params
    return this[service](ENVIRONMENT, ...rest)
  },
}

export default domains.get.bind(domains)
