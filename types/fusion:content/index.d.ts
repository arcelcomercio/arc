declare module 'fusion:content' {
  import type { UseContentConfig } from 'types/fusion'

  type AnyObject = Record<string, unknown>

  export function useContent<Query = AnyObject, Response = any>(
    config: UseContentConfig<Query>
  ): Response

  export function useEditableContent(): any
}
