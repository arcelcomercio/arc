import {
  getOriginAPI,
  getUrlECOID,
  getUrlMiddleWare,
  getUrlNewsLetters,
} from './domains'

export const loginFBeco = (URL, username, accessToken, type) => {
  const response = new Promise((resolve) => {
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
    }).then((res) => resolve(res.json()))
  })
  return response
}

export const getUbigeo = (item) => {
  const response = new Promise((resolve, reject) => {
    fetch(`${getUrlECOID}/get_ubigeo/${item}?v=${new Date().getTime()}`)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err))
  })
  return response
}

export const getEntitlement = (jwt, site) => {
  const response = new Promise((resolve) => {
    fetch(`${getOriginAPI(site)}/sales/public/v1/entitlements`, {
      method: 'GET',
      headers: {
        Authorization: jwt,
      },
    }).then((res) => resolve(res.json()))
  })
  return response
}

export const sendNewsLettersUser = (uuid, email, site, token, data) => {
  const response = new Promise((resolve) => {
    fetch(`${getUrlNewsLetters}/newsletter/events?v=${new Date().getTime()}`, {
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
    }).then((res) => resolve(res.json()))
  })
  return response
}

export const getNewsLettersUser = (uuid, site) => {
  const response = new Promise((resolve) => {
    fetch(
      `${getUrlNewsLetters}/newsletter/?brand=${site}&type=newsletter&uuid=${uuid}&v=${new Date().getTime()}`,
      {
        cache: 'no-cache',
      }
    ).then((res) => resolve(res.json()))
  })
  return response
}

export const getNewsLetters = () => {
  const response = new Promise((resolve) => {
    fetch(`${getUrlNewsLetters}/newsletter/list?v=${new Date().getTime()}`, {
      cache: 'no-cache',
    }).then((res) => resolve(res.json()))
  })
  return response
}

export const checkStudents = (email, date, grade, site, jwt) => {
  const response = new Promise((resolve) => {
    fetch(`${getUrlMiddleWare}/validate_user_academic/`, {
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
    }).then((res) => resolve(res.json()))
  })
  return response
}

export const checkCodeStudents = (hash, email, site, jwt) => {
  const response = new Promise((resolve) => {
    fetch(`${getUrlMiddleWare}/activate_promotion/`, {
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
    }).then((res) => resolve(res.json()))
  })
  return response
}

export const initPaymentUpdate = (id, pid, site, jwt) => {
  const response = new Promise((resolve) => {
    fetch(
      `${getOriginAPI(
        site
      )}/sales/public/v1/paymentmethod/${id}/provider/${pid}`,
      {
        method: 'PUT',
        headers: {
          Authorization: jwt,
        },
      }
    ).then((res) => resolve(res.json()))
  })
  return response
}

export const finalizePaymentUpdate = (
  id,
  pid,
  site,
  jwt,
  token,
  email,
  adress,
  phone
) => {
  const response = new Promise((resolve) => {
    fetch(
      `${getOriginAPI(
        site
      )}/sales/public/v1/paymentmethod/${id}/provider/${pid}/finalize`,
      {
        method: 'PUT',
        body: JSON.stringify({
          token,
          email,
          address: {
            line1: adress,
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
    ).then((res) => resolve(res.json()))
  })
  return response
}

export const getProfilePayu = (jwt, idsubs, site) => {
  const response = new Promise((resolve) => {
    fetch(`${getUrlMiddleWare}/user/payment-profile/${idsubs}/`, {
      method: 'GET',
      headers: {
        site,
        'user-token': jwt,
      },
    }).then((res) => resolve(res.json()))
  })
  return response
}

export const requestVerifyEmail = (email, site) => {
  const response = new Promise((resolve) => {
    fetch(`${getOriginAPI(site)}/identity/public/v1/email/verify`, {
      method: 'POST',
      body: JSON.stringify({
        email,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => resolve(res.json()))
  })
  return response
}
