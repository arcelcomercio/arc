export type AnyObject = Record<string, unknown>
export type ValuesOf<T> = { [P in keyof T]: T[P] }
export type PromiseType<T extends Promise<any>> = T extends Promise<infer U>
  ? U
  : never
export type Domain = `${string}.${'com' | 'pe'}`
export type Nullable<T> = { [P in keyof T]: T[P] | null }

export interface CommonProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}
