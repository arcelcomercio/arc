declare module 'fusion:content' {
  type AnyObject = Record<string, unknown>

  export interface UseContentConfig<Query = AnyObject> {
    source: string
    query: Query
    filter?: string
    transform?: (data: AnyObject) => any
  }

  export function useContent<Query = AnyObject, Response = any>(
    config: UseContentConfig<Query>
  ): Response

  // `Content` default export en progreso
  // pero parece que es mejor, por establecer
  // un estandar, usar `useContent` en lugar de `Content`

  export interface ContentConfig<Values = AnyObject> {
    contentService: string
    contentConfigValues?: Values
    inherit?: boolean
  }

  // interface ContentProps<V = AnyObject> extends ContentConfig<V> {
  //   children: (response: AnyObject) => React.FC<AnyObject>
  // }

  // function Content(props: ContentProps): JSX.Element
  // export default Content
}
