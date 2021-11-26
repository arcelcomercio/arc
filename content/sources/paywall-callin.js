/* eslint-disable import/no-extraneous-dependencies */
// import { CALLIN_URL_API } from 'fusion:environment'
import request from 'request-promise-native'

const fetch = (key) => {
  const { name, phone } = key || {}

  const CALLIN_USER_KEY = '3C05U5' // enviar a environment con PROD
  const CALLIN_URL_API = 'https://pe-eca.grupodigitex.com/ws_EC/ServiceEC.svc' // enviar a environment con PROD
  const dataXML = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <tem:ws_EC_Suscripcion>\r\n         <tem:user>${CALLIN_USER_KEY}</tem:user>\r\n         <tem:Datos>{"Telefono":"${phone}","Nombre":"${name}"}</tem:Datos>\r\n      </tem:ws_EC_Suscripcion>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>\r\n`
  const msgError =
    'Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.'

  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      uri: CALLIN_URL_API,
      headers: {
        'Content-Type': 'text/xml',
        SOAPAction: 'http://tempuri.org/IServiceEC/ws_EC_Suscripcion',
      },
      body: dataXML,
      json: false,
    })
      .then((res) => resolve(res))
      .catch(() => reject(msgError))
  })
    .then((success) => ({ success }))
    .catch((error) => ({ error }))
}

export default {
  fetch,
  params: {
    name: 'text',
    phone: 'text',
  },
  cache: false,
  ttl: 20,
}
