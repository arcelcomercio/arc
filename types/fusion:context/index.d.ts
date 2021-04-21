declare module 'fusion:context' {
  import type { SiteProperties } from 'fusion:properties'

  type AnyObject = Record<string, unknown>
  export interface ContentConfig<Values = AnyObject> {
    contentService: string
    contentConfigValues?: Values
    inherit?: boolean
  }

  export interface GlobalContentConfig<Query = AnyObject> {
    source?: string
    query?: Query
  }

  export type OutputType =
    | 'default'
    | 'lite'
    | 'amp'
    | 'paywall'
    | 'signwall'
    | 'subscriptions'
    | 'text'
    | 'xml'

  export type ArcSite =
    | 'elcomercio'
    | 'depor'
    | 'diariocorreo'
    | 'elbocon'
    | 'elcomerciomag'
    | 'gestion'
    | 'ojo'
    | 'peru21'
    | 'peru21g21'
    | 'trome'
  export interface ComponentContext<
    GlobalContent = AnyObject,
    CustomFields = AnyObject,
    ContentConfigValues = AnyObject,
    DisplayProperties = AnyObject
  > {
    key: number
    collection: string
    type: string
    id: string
    name?: string | null
    contentConfig: ContentConfig<ContentConfigValues>
    customFields?: CustomFields
    displayProperties?: DisplayProperties
    globalContent?: GlobalContent
    registerSuccessEvent?: (e) => void
  }
  export interface AppContext<
    GlobalContent = AnyObject,
    GlobalContentConfigQuery = AnyObject
  > {
    arcSite: ArcSite
    contextPath: string
    requestUri: string
    isAdmin: boolean
    outputType: OutputType
    template: string
    layout?: string | null
    deployment: ((resource: string) => string) | string
    metaValue: (key: string) => string
    globalContent?: GlobalContent
    globalContentConfig?: GlobalContentConfigQuery
    siteProperties: SiteProperties
    tree?: AnyObject
    renderables?: AnyObject[]
  }
  export interface FusionContext<
    GlobalContent = AnyObject,
    CustomFields = AnyObject,
    ContentConfigValues = AnyObject,
    DisplayProperties = AnyObject,
    GlobalContentConfigQuery = AnyObject
  > extends ComponentContext<
        GlobalContent,
        CustomFields,
        ContentConfigValues,
        DisplayProperties
      >,
      AppContext<GlobalContent, GlobalContentConfigQuery> {}

  export function useComponentContext<
    GlobalContent = AnyObject,
    CustomFields = AnyObject,
    ContentConfigValues = AnyObject,
    DisplayProperties = AnyObject
  >(): ComponentContext<
    GlobalContent,
    CustomFields,
    ContentConfigValues,
    DisplayProperties
  >
  export function useAppContext<
    GlobalContent = AnyObject,
    GlobalContentConfigQuery = AnyObject
  >(): AppContext<GlobalContent, GlobalContentConfigQuery>

  export function useFusionContext<
    GlobalContent = AnyObject,
    CustomFields = AnyObject,
    ContentConfigValues = AnyObject,
    DisplayProperties = AnyObject,
    GlobalContentConfigQuery = AnyObject
  >(): FusionContext<
    GlobalContent,
    CustomFields,
    ContentConfigValues,
    DisplayProperties,
    GlobalContentConfigQuery
  >
}
