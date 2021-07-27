export type AnyObject = Record<string, unknown>
export type Domain = `${string}.${'com' | 'pe'}`
export interface CommonProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}
