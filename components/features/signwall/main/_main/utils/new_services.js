import Domains from './domains'

/* eslint-disable class-methods-use-this */
class Services {
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
