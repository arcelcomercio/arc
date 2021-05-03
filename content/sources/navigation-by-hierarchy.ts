import { ConentSourceBase } from 'types/content-source'

export type NavigationByHierarchyQuery = {
  hierarchy?: string
}

type NavigationByHierarchyParams = NavigationByHierarchyQuery & ConentSourceBase

const schemaName = 'navigation'
const params = [
  {
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

const pattern = (key: NavigationByHierarchyParams): string => {
  const website = key?.['arc-site'] || 'Arc Site no está definido'
  const requestUri = `/site/v3/navigation/${website}/?hierarchy=${
    key.hierarchy || 'default'
  }`

  // return key.section ? `${endpoint}&_id=${key.section}` : endpoint;

  return requestUri
}

const resolve = (key: NavigationByHierarchyParams): string => pattern(key)

const source = {
  resolve,
  params,
  schemaName,
  ttl: 600,
}

export default source
