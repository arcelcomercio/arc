/* eslint-disable import/no-extraneous-dependencies */
// import { CALLIN_URL_API } from 'fusion:environment'
import request from 'request-promise-native'

const fetch = (key) => {
  const { name, phone } = key || {}
  const data = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\r\n   <soapenv:Header/>\r\n   <soapenv:Body>\r\n      <tem:ws_EC_Suscripcion>\r\n         <tem:user>3C05U5</tem:user>\r\n         <tem:Datos>{"Telefono":"${phone}","Nombre":"${name}"}</tem:Datos>\r\n      </tem:ws_EC_Suscripcion>\r\n   </soapenv:Body>\r\n</soapenv:Envelope>\r\n`

  return request({
    method: 'POST',
    uri: `https://pe-eca.grupodigitex.com/ws_EC/ServiceEC.svc`, // enviar a environment con PROD
    headers: {
      'Content-Type': 'text/xml',
      SOAPAction: 'http://tempuri.org/IServiceEC/ws_EC_Suscripcion',
    },
    body: data,
    json: false,
  })
    .then((res) => ({ success: res }))
    .catch(() => ({ error: 'Solicitud inválida' }))
}

export default {
  fetch,
  params: {
    name: 'text',
    phone: 'text',
  },
  ttl: 20,
}
