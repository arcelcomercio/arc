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

export const createContentSource = site => {
  const resolve = (key = {}) => {
    const serviceSite = key['arc-site'] || site
    const endpoint = `/site/v3/navigation/${serviceSite}/?hierarchy=${key.hierarchy ||
      'default'}`

    // return key.section ? `${endpoint}&_id=${key.section}` : endpoint;

    return endpoint
  }
  return {
    resolve,
    params,
    schemaName,
  }
}

export default createContentSource('Arc Site Is Not Defined')