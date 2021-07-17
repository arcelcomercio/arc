/* eslint-disable import/no-extraneous-dependencies */
import sha256 from 'crypto-js/sha256'
import {
  PAGO_EFECTIVO_ACCESS,
  PAGO_EFECTIVO_SECRET,
  PAGO_EFECTIVO_SERVICE,
} from 'fusion:environment'
import request from 'request-promise-native'

import { PropertiesCommon } from '../../components/features/subscriptions/_dependencies/Properties'

const fetch = (key = {}) => {
  const { clientTime } = key
  const { urls: urlCommon } = PropertiesCommon
  if (clientTime) {
    const parameters = `${PAGO_EFECTIVO_SERVICE}.${PAGO_EFECTIVO_ACCESS}.${PAGO_EFECTIVO_SECRET}.${clientTime}-05:00`
    const hashPayEfectivo = sha256(parameters)

    return request({
      method: 'POST',
      uri: urlCommon.tokenPayEfectivo,
      body: {
        accessKey: PAGO_EFECTIVO_ACCESS,
        idService: PAGO_EFECTIVO_SERVICE,
        dateRequest: `${clientTime}-05:00`,
        hashString: hashPayEfectivo.toString(),
      },
      json: true,
    }).catch(() => ({ error: 'Solicitud inválida', date: clientTime }))
  }
  return { error: 'Solicitud inválida - No se recibió fecha del cliente' }
}

export default {
  fetch,
  ttl: 20,
}
