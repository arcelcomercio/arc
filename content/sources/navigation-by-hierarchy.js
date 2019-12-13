const schemaName = 'navigation'
const params = [{
    name: 'hierarchy',
    displayName: 'Jerarquía',
    type: 'text',
  },
  /*  {
     name: 'section',
     displayName: 'Sección',
     type: 'text',
   } */
]

const pattern = key => {
  const website = key['arc-site'] || 'Arc Site no está definido'
  const requestUri = `/site/v3/navigation/${website}/?hierarchy=${key.hierarchy ||
      'default'}`

  // return key.section ? `${endpoint}&_id=${key.section}` : endpoint;

  return requestUri
}

const resolve = key => pattern(key)

const source = {
  resolve,
  params,
  schemaName,
  ttl: 600
}

export default source