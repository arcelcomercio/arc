import { AnyObject } from '../utils'

declare module 'fusion:properties' {
  export interface SiteProperties {
    siteProperties: AnyObject
  }
  export function getProperties(arcSite: string): SiteProperties
}
