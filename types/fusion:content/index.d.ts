import { AnyObject } from '../utils'

declare module 'fusion:content' {
  export interface UseContentConfig<Query = AnyObject> {
    source: string
    query: Query
    filter?: string
    transform?: (data: AnyObject) => any
  }

  export function useContent<Query = AnyObject>(
    config: UseContentConfig<Query>
  ): any
}
