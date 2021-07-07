/* eslint-disable import/no-extraneous-dependencies */
import sha256 from 'crypto-js/sha256'
import request from 'request-promise-native'

import { PropertiesCommon } from '../../components/features/subscriptions/_dependencies/Properties'

const { urls: urlCommon, tokens } = PropertiesCommon
const {
  payEfectivoService: idService,
  payEfectivoAccessKey: accessKey,
  payEfectivoSecretKey: secretKey,
} = tokens || {}

const nowDate = new Date()
const getUtcDate = new Date(nowDate.getTime() - 300 * 60000).toISOString()
const dateTimePeru = getUtcDate.split('.')[0]
const parameters = `${idService}.${accessKey}.${secretKey}.${dateTimePeru}-05:00`
const hashPayEfectivo = sha256(parameters)

const fetch = () =>
  request({
    method: 'POST',
    uri: urlCommon.tokenPayEfectivo,
    body: {
      accessKey,
      idService,
      dateRequest: `${dateTimePeru}-05:00`,
      hashString: hashPayEfectivo.toString(),
    },
    json: true,
  }).catch(() => ({ error: 'Solicitud inválida' }))

export default {
  fetch,
}
