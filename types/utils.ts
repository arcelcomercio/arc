export type AnyObject = Record<string, unknown>
export type ValuesOf<T> = { [P in keyof T]: T[P] }
export type Domain = `${string}.${'com' | 'pe'}`

export interface CommonProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}
