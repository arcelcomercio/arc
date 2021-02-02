import { FusionContext } from 'fusion:context'

export interface OutputProps extends FusionContext {
  children: React.ReactNode
  Resource: any
  Fusion: any
  Libs: any
}

export interface OutputComponent<P> extends React.FC<P> {
  fallback?: boolean
  contentType?: string
}
