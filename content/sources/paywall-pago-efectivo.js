/* eslint-disable import/no-extraneous-dependencies */
import sha256 from 'crypto-js/sha256'
import {
  PAGO_EFECTIVO_ACCESS_ELCOMERCIO,
  PAGO_EFECTIVO_ACCESS_GESTION,
  PAGO_EFECTIVO_ID_ELCOMERCIO,
  PAGO_EFECTIVO_ID_GESTION,
  PAGO_EFECTIVO_SECRET_ELCOMERCIO,
  PAGO_EFECTIVO_SECRET_GESTION,
} from 'fusion:environment'
import request from 'request-promise-native'

import { PropertiesCommon } from '../../components/features/subscriptions/_dependencies/Properties'

const tokens = {
  elcomercio: {
    access: PAGO_EFECTIVO_ACCESS_ELCOMERCIO,
    secret: PAGO_EFECTIVO_SECRET_ELCOMERCIO,
    id: PAGO_EFECTIVO_ID_ELCOMERCIO,
  },
  gestion: {
    access: PAGO_EFECTIVO_ACCESS_GESTION,
    secret: PAGO_EFECTIVO_SECRET_GESTION,
    id: PAGO_EFECTIVO_ID_GESTION,
  },
}

const fetch = (key) => {
  const { clientTime, 'arc-site': arcSite } = key || {}
  const { urls: urlCommon } = PropertiesCommon
  if (clientTime) {
    const siteTokens = tokens[arcSite]
    const parameters = `${siteTokens.id}.${siteTokens.access}.${siteTokens.secret}.${clientTime}-05:00`
    const hashPayEfectivo = sha256(parameters)

    return request({
      method: 'POST',
      uri: urlCommon.tokenPayEfectivo,
      body: {
        accessKey: siteTokens.access,
        idService: siteTokens.id,
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
