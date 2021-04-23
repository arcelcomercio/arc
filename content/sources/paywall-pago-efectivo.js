/* eslint-disable import/no-extraneous-dependencies */
import request from 'request-promise-native'
import sha256 from 'crypto-js/sha256'

import { PropertiesCommon } from '../../components/features/subscriptions/_dependencies/Properties'
const { urls: urlCommon, tokens } = PropertiesCommon

const {
  payEfectivoService: idService,
  payEfectivoAccessKey: accessKey,
  payEfectivoSecretKey: secretKey,
} = tokens || {}

const nowDate = new Date()
const getUtcDate = new Date(
  nowDate.toLocaleString('es-PE', { timeZone: 'America/Lima' })
).toISOString()
const dateCurrent = getUtcDate.split('.')[0]
const parameters = `${idService}.${accessKey}.${secretKey}.${dateCurrent}-05:00`
const hashPayEfectivo = sha256(parameters)

const fetch = () => {
  return request({
    method: 'POST',
    uri: urlCommon.tokenPayEfectivo,
    body: {
      accessKey,
      idService,
      dateRequest: `${dateCurrent}-05:00`,
      hashString: hashPayEfectivo.toString(),
    },
    json: true,
  })
}

export default { fetch }
