import getDevice from './get-device'
import Domains from './domains'

/* eslint-disable class-methods-use-this */
class Services {
  reloginEcoID(username, password, action, site, window) {
    const details = {
      email: username, // -> email
      password, // -> pass
      method: 'formulario',
      device: getDevice(window), // -> desktop mobile tablet
      domain: window.location.hostname, // -> elcomercio.pe
      referer: window.location.href, // -> url actual
      action,
      site,
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
      fetch(`${Domains.getUrlECOID()}/api/v2/verify_credentials`, {
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
        `${Domains.getUrlECOID()}/get_ubigeo/${item}?v=${new Date().getTime()}`
      ).then(res => resolve(res.json()))
    })
    return response
  }

  getEntitlement(jwt, site) {
    const response = new Promise(resolve => {
      fetch(`${Domains.getOriginAPI(site)}/sales/public/v1/entitlements`, {
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

  sendNewsLettersUser(uuid, email, site, token, data) {
    const response = new Promise(resolve => {
      fetch(
        `${Domains.getUrlNewsLetters()}/newsletter/events?v=${new Date().getTime()}`,
        {
          method: 'POST',
          cache: 'no-cache',
          body: JSON.stringify({
            type: 'newsletter',
            eventName: 'build_preference',
            uuid,
            email,
            attributes: {
              preferences: data,
              first_name: '',
              last_name: '',
            },
            brand: site,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token} ${site}`,
          },
        }
      ).then(res => resolve(res.json()))
    })
    return response
  }

  getNewsLettersUser(uuid, site) {
    const response = new Promise(resolve => {
      fetch(
        `${Domains.getUrlNewsLetters()}/newsletter/?brand=${site}&type=newsletter&uuid=${uuid}&v=${new Date().getTime()}`,
        {
          cache: 'no-cache',
        }
      ).then(res => resolve(res.json()))
    })
    return response
  }

  getNewsLetters() {
    const response = new Promise(resolve => {
      fetch(
        `${Domains.getUrlNewsLetters()}/newsletter/list?v=${new Date().getTime()}`,
        {
          cache: 'no-cache',
        }
      ).then(res => resolve(res.json()))
    })
    return response
  }

  checkStudents(email, date, grade, site, jwt) {
    const response = new Promise(resolve => {
      fetch(`${Domains.getUrlComercioSubs()}/validate_user_academic/`, {
        method: 'POST',
        body: JSON.stringify({
          correo: email,
          date_birth: date,
          degree: grade,
        }),
        headers: {
          'Content-Type': 'application/json',
          site,
          'user-token': jwt,
        },
      }).then(res => resolve(res.json()))
    })
    return response
  }

  checkCodeStudents(hash, email, site, jwt) {
    const response = new Promise(resolve => {
      fetch(`${Domains.getUrlComercioSubs()}/activate_promotion/`, {
        method: 'POST',
        body: JSON.stringify({
          hash_user: hash,
          email,
        }),
        headers: {
          'Content-Type': 'application/json',
          site,
          'user-token': jwt,
        },
      }).then(res => resolve(res.json()))
    })
    return response
  }

  initPaymentUpdate(id, pid, site, jwt) {
    const response = new Promise(resolve => {
      fetch(
        `${Domains.getOriginAPI(
          site
        )}/sales/public/v1/paymentmethod/${id}/provider/${pid}`,
        {
          method: 'PUT',
          headers: {
            Authorization: jwt,
          },
        }
      ).then(res => resolve(res.json()))
    })
    return response
  }

  finalizePaymentUpdate(id, pid, site, jwt, token, email, dni, phone) {
    const response = new Promise(resolve => {
      fetch(
        `${Domains.getOriginAPI(
          site
        )}/sales/public/v1/paymentmethod/${id}/provider/${pid}/finalize`,
        {
          method: 'PUT',
          body: JSON.stringify({
            token,
            email,
            address: {
              line1: dni,
              locality: 'Lima',
              country: 'PE',
            },
            phone,
          }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: jwt,
          },
        }
      ).then(res => resolve(res.json()))
    })
    return response
  }

  getProfilePayu(jwt, idsubs, site) {
    const response = new Promise(resolve => {
      fetch(`${Domains.getUrlComercioSubs()}/user/payment-profile/${idsubs}/`, {
        method: 'GET',
        headers: {
          site,
          'user-token': jwt,
        },
      }).then(res => resolve(res.json()))
    })
    return response
  }
}

export default new Services()
