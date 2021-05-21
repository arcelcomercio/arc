export const loginSocialEco = (URL, username, accessToken, type) => {
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

export const sendNewsLettersUser = (URL, uuid, email, site, token, data) => {
  const response = new Promise((resolve) => {
    fetch(`${URL}/newsletter/events?v=${new Date().getTime()}`, {
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

export const getEntitlements = (URL, jwt) => {
  const response = new Promise((resolve) => {
    fetch(`${URL}/sales/public/v1/entitlements`, {
      method: 'GET',
      headers: {
        Authorization: jwt,
      },
    }).then((res) => resolve(res.json()))
  })
  return response
}

export const paymentTraker = (
  URL,
  jwt,
  site,
  referer,
  origin,
  order,
  confirm
) => {
  const response = new Promise((resolve) => {
    fetch(`${URL}/service/arc/paywall/tracking`, {
      method: 'POST',
      cache: 'no-cache',
      body: JSON.stringify({
        url_referer: referer || '',
        medium: origin || '',
        user_agent: window.navigator.userAgent || '',
        arc_order: order || '',
        confirm_subscription: confirm || '',
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
        'X-arc-site': site,
      },
    }).then((res) => resolve(res.json()))
  })
  return response
}

export const subDniToken = (URL, jwt) => {
  const response = new Promise((resolve) => {
    fetch(URL, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        'user-token': jwt,
      },
    }).then((res) => resolve(res.json()))
  })

  return response
}

export const pushCallOut = (name, phone) => {
  const response = new Promise((resolve) => {
    fetch('https://servicios.scc.pe/web_api_comercio/insertar_cliente/', {
      method: 'POST',
      body: JSON.stringify({
        nombre: name,
        telefono: phone,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Basic dXN1YXJpb19jb21lcmNpb19jMmM6YzBtM3JjMTAuQzJDLnczYi5AcGk=',
      },
    }).then((res) => resolve(res.json()))
  })

  return response
}

export const sendEmailCompany = (
  URL,
  arcSite,
  token,
  captcha,
  correo,
  nombre,
  apellido,
  organizacion,
  telefono,
  tipo_consulta,
  descripcion
) => {
  const response = new Promise((resolve) => {
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({
        'g-recaptcha-response': captcha,
        correo,
        nombre,
        apellido,
        organizacion,
        telefono,
        tipo_consulta,
        descripcion,
      }),
      headers: {
        'Content-Type': 'application/json',
        'user-token': token,
        site: arcSite,
      },
    }).then((res) => resolve(res.json()))
  })
  return response
}
