declare module 'fusion:properties' {
  import type { ArcSite } from 'types/fusion'
  import type { SiteProperties } from 'types/properties'

  export default function getProperties(arcSite: ArcSite): SiteProperties
}
