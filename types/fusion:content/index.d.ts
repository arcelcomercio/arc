import { AnyObject, Obj } from '../utils'

declare module 'fusion:content' {
  export interface UseContentConfig<Query = AnyObject> {
    source: string
    query: Query
    filter?: string
    transform?: (data: Obj) => any
  }

  export function useContent<Query = AnyObject>(
    config: UseContentConfig<Query>
  ): any
}
