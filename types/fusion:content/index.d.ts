declare module 'fusion:content' {
  import { ContentConfig } from '../fusion:context'
  import { AnyObject } from '../utils'

  export interface UseContentConfig<Query = AnyObject> {
    source: string
    query: Query
    filter?: string
    transform?: (data: AnyObject) => any
  }

  export function useContent<Query = AnyObject>(
    config: UseContentConfig<Query>
  ): any

  // export function Content(props: ContentConfig): void
}
