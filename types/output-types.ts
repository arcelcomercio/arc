import { FusionContext } from 'fusion:context'

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

export interface OutputComponent<P> extends React.FC<P> {
  fallback?: boolean
  contentType?: string
}
