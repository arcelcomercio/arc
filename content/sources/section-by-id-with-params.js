import { removeLastSlash } from '../../components/utilities/helpers'

const schemaName = 'section'

const params = [
  {
    name: '_id',
    displayName: 'ID de la sección',
    type: 'text',
  },
  {
    name: 'date',
    displayName: 'fecha',
    type: 'text',
  },
]

const resolve = (key = {}) => {
  const website = key['arc-site'] || 'Arc Site no está definido'

  const { _id: auxId = '/' } = key
  const id = auxId === null || auxId === '/todas' ? '/' : auxId

  const clearSlug = removeLastSlash(id)

  return `/site/v3/website/${website}/section${
    id === null || !id ? '' : `?_id=${clearSlug}`
  }`
}

const transform = (data, key) => {
  // Destructuración del key para prevenir que no devuelva null
  const { date: auxDate = '' } = key
  const date = auxDate === null ? '' : auxDate

  return { ...data, ...{ params: { date } } }
}

export default {
  resolve,
  transform,
  schemaName,
  params,
}
