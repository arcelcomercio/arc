declare module 'fusion:properties' {
  import { AnyObject } from '../utils'

  export interface SiteProperties {
    siteProperties: AnyObject
  }
  export function getProperties(arcSite: string): SiteProperties
}
