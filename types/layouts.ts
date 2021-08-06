import { AnyObject } from './utils'

export interface LayoutComponent<P = AnyObject> extends React.FC<P> {
  sections?: string[]
}

export type LC<P = AnyObject> = LayoutComponent<P>
