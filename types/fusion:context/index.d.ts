declare module 'fusion:context' {
  export interface FusionContext {
    requestUri: string
    arcSite: string
    contextPath: string
    deployment: (resource: string) => string
    metaValue: (key: string) => string
    globalContent: any
    siteProperties: any
  }
  export function useFusionContext(): FusionContext
}
