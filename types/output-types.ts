import { FusionContext, OutputType } from 'types/fusion'

import { AnyObject } from './utils'

type FusionProps = { hydrateOnly: boolean }
type ResourceProps = {
  children: ({ data }: { data: string }) => Element | null
  path: string
}

export interface OutputProps extends FusionContext {
  children: React.ReactNode
  Fusion: React.FC<FusionProps>
  Resource: React.FC<ResourceProps>
  Libs: React.FC
}

export interface OutputComponent<P = AnyObject> extends React.FC<P> {
  fallback?: boolean | OutputType
  contentType?: string
}

export type OT<P = AnyObject> = OutputComponent<P>
