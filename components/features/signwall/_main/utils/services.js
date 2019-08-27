/* eslint-disable class-methods-use-this */
import ENV from 'fusion:environment'
import getDevice from './get-device'

const ORIGIN_ECOID =
  ENV.ENVIRONMENT === 'elcomercio' ? 'https://ecoid.pe' : 'https://pre.ecoid.pe'

const API_ORIGIN =
  ENV.ENVIRONMENT === 'elcomercio'
    ? 'https://api.gestion.pe'
    : 'https://api-sandbox.gestion.pe'

// const API_CAMPAING =
//   ENV.ENVIRONMENT === 'elcomercio'
//     ? 'https://paywall.comerciosuscripciones.pe/api/subscriber/validation/gestion/'
//     : 'https://devpaywall.comerciosuscripciones.pe/api/subscriber/validation/gestion/'

export default class Services {
  reloginEcoID(username, password, action, window) {
    const details = {
      email: username, // -> email
      password, // -> pass
      method: 'formulario',
      device: getDevice(window), // -> desktop mobile tablet
      domain: window.location.hostname, // -> elcomercio.pe
      referer: window.location.href, // -> url actual
      action,
    }

    let formBody = []
    // eslint-disable-next-line no-restricted-syntax
    for (const property in details) {
      if (Object.prototype.hasOwnProperty.call(details, property)) {
        const encodedKey = encodeURIComponent(property)
        const encodedValue = encodeURIComponent(details[property])
        formBody.push(`${encodedKey}=${encodedValue}`)
      }
    }
    formBody = formBody.join('&')
    const response = new Promise(resolve => {
      fetch(`${ORIGIN_ECOID}/api/v2/verify_credentials`, {
        method: 'POST',
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(res => resolve(res.json()))
    })
    return response
  }

  loginFBeco(URL, username, accessToken, type) {
    const response = new Promise(resolve => {
      fetch(`${URL}/identity/public/v1/auth/token`, {
        method: 'POST',
        body: JSON.stringify({
          userName: username,
          credentials: accessToken,
          grantType: type,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => resolve(res.json()))
    })
    return response
  }

  getUbigeo(item) {
    const response = new Promise(resolve => {
      fetch(
        `${ORIGIN_ECOID}/get_ubigeo/${item}?v=${new Date().getTime()}`
      ).then(res => resolve(res.json()))
    })
    return response
  }

  getEntitlement(jwt) {
    const response = new Promise(resolve => {
      fetch(`${API_ORIGIN}/sales/public/v1/entitlements`, {
        method: 'GET',
        headers: {
          Authorization: jwt,
        },
      }).then(res => resolve(res.json()))
    })
    return response
  }

  getIpEco() {
    const response = new Promise(resolve => {
      fetch(`https://geoapi.eclabs.io/location`, {
        method: 'GET',
      }).then(res => resolve(res.json()))
    })
    return response
  }

  // getCampaing() {
  //   const response = new Promise(resolve => {
  //     fetch(`${API_CAMPAING}`, { method: 'GET' }).then(res =>
  //       resolve(res.json())
  //     )
  //   })
  //   return response
  // }
}
