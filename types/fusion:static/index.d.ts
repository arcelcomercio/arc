declare module 'fusion:static' {
  type AnyObject = Record<string, unknown>

  type StaticProps = {
    children: React.ReactNode
    id?: string
    htmlOnly?: boolean
  }

  function Static(props: StaticProps): JSX.Element
  export default Static
}
