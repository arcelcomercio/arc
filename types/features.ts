import { AnyObject } from './utils'

export interface FeatureComponent<P = AnyObject> extends React.FC<P> {
  static?: boolean
  label?: string
}

export type FC<P = AnyObject> = FeatureComponent<P>
