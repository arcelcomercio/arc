import {environment} from 'fusion:environment'

const services = {
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
    getService: function getService(service){
        return this[service](environment)
    }
  }

  export default services.getService.bind(services);