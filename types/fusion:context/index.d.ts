declare module 'fusion:context' {
  import type {
    ComponentContext,
    AppContext,
    FusionContext,
  } from 'types/fusion'

  type AnyObject = Record<string, unknown>

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
