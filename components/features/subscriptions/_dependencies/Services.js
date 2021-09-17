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
  const data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <tem:ws_EC_Suscripcion>\r\n         <tem:user>3C05U5</tem:user>\r\n         <tem:Datos>{"Telefono":"${phone}","Nombre":"${name}"}</tem:Datos>\r\n      </tem:ws_EC_Suscripcion>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>\r\n`
  const response = new Promise((resolve) => {
    fetch('https://pe-eca.grupodigitex.com/ws_EC/ServiceEC.svc', {
      method: 'POST',
      body: data,
      // mode: 'no-cors',
      // credentials: 'omit',
      // referrerPolicy: 'no-referrer',
      headers: {
        'Content-Type': 'text/xml',
        SOAPAction: 'http://tempuri.org/IServiceEC/ws_EC_Suscripcion',
        // 'Access-Control-Allow-Origin': '*',
      },
    }).then((res) => {
      console.log('========>', res)
      resolve(res.text())
    })
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
