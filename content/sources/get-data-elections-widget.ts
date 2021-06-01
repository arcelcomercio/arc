import { ConentSourceBase } from 'types/content-source'

const resolve = (key: ConentSourceBase): string => {
  const website = key?.['arc-site'] || 'Arc Site no está definido'
  console.log('============== key ==============', key)
  return `http://jab.pe/eco/api.json`
}

export default {
  resolve,
  params: {
    website: 'text',
  },
}
