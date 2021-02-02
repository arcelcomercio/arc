export interface FeatureComponent<P> extends React.FC<P> {
  static?: boolean
  label?: string
}
