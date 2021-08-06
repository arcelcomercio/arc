import { OutputType } from './fusion'
import { AnyObject } from './utils'

export interface FeatureComponent<P = AnyObject> extends React.FC<P> {
  static?: boolean
  label?: string
  lazy?: boolean | OutputType[]
}

export type FC<P = AnyObject> = FeatureComponent<P>
