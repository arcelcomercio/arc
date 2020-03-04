const params = [
  {
    name: 'idLeague',
    displayName: 'Id de la liga',
    type: 'text',
  },
]
const resolve = (key = {}) => {
  let urlResult = ''
  if (key && key.idLeague && key.idLeague !== '') {
    urlResult = `https://devresultadosopta.elcomercio.pe/api/v2/competitioncomponent/?format=json&uuid=${key.idLeague}`
  }

  return urlResult
}

const transform = data => {
  const { items: result = {} } = data

  return result
}

export default {
  resolve,
  transform,
  params,
}
