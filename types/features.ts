import { OutputType } from './fusion'
import { AnyObject } from './utils'

export interface FeatureComponent<P = AnyObject> extends React.FC<P> {
  /** sólo renderiza el Feature en servidor */
  static?: boolean
  /** Nombre del Feature en Page Builder Editor */
  label?: string
  /** Importar código del Feature en cliente de forma dinámica */
  lazy?: boolean | OutputType[]
}

export type FC<P = AnyObject> = FeatureComponent<P>
