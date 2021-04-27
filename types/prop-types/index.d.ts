// Sacado de https://ideas.arcpublishing.com/ideas/PEN-I-42
declare module 'prop-types' {
  export type ReactComponentLike =
    | string
    | ((props: any, context?: any) => any)
    | (new (props: any, context?: any) => any)

  export interface ReactElementLike {
    type: ReactComponentLike
    props: any
    key: string | number | null
  }

  export type ReactNodeArray = Array<ReactNodeLike>

  export type ReactNodeLike =
    | any
    | ReactElementLike
    | ReactNodeArray
    | string
    | number
    | boolean
    | null
    | undefined

  export const nominalTypeHack: unique symbol

  export type IsOptional<T> = undefined extends T ? true : false

  export type RequiredKeys<V> = {
    [K in keyof V]-?: Exclude<V[K], undefined> extends Validator<infer T>
      ? IsOptional<T> extends true
        ? never
        : K
      : never
  }[keyof V]
  export type OptionalKeys<V> = Exclude<keyof V, RequiredKeys<V>>
  export type InferPropsInner<V> = { [K in keyof V]-?: InferType<V[K]> }

  export interface Validator<T> {
    (
      props: { [key: string]: any },
      propName: string,
      componentName: string,
      location: string,
      propFullName: string
    ): Error | null
    [nominalTypeHack]?: {
      type: T
    }
  }

  export interface Requireable<T> extends Validator<T | undefined | null> {
    isRequired: Validator<NonNullable<T>>
  }

  export type ValidationMap<T> = { [K in keyof T]?: Validator<T[K]> }

  export type InferType<V> = V extends Validator<infer T> ? T : any
  export type InferProps<V> = InferPropsInner<Pick<V, RequiredKeys<V>>> &
    Partial<InferPropsInner<Pick<V, OptionalKeys<V>>>>

  export const any: Requireable<any>
  export const array: Requireable<any[]>
  export const bool: Taggable<boolean> // Taggable
  export const func: Requireable<(...args: any[]) => any>
  export const number: Taggable<number> // Taggable
  export const object: Requireable<any>
  export const string: Taggable<string> // Taggable
  export const node: Requireable<ReactNodeLike>
  export const element: Requireable<ReactElementLike>
  export const symbol: Requireable<symbol>
  export const elementType: Requireable<ReactComponentLike>
  export function instanceOf<T>(
    expectedClass: new (...args: any[]) => T
  ): Requireable<T>
  export function oneOf<T>(types: ReadonlyArray<T>): Taggable<T> // Taggable
  export function oneOfType<T extends Validator<any>>(
    types: T[]
  ): Requireable<NonNullable<InferType<T>>>
  export function arrayOf<T>(type: Validator<T>): Requireable<T[]>
  export function objectOf<T>(
    type: Validator<T>
  ): Requireable<{ [K in keyof any]: T }>
  export function shape<P extends ValidationMap<any>>(
    type: P
  ): Requireable<InferProps<P>>
  export function exact<P extends ValidationMap<any>>(
    type: P
  ): Requireable<Required<InferProps<P>>>

  /**
   * Assert that the values match with the type specs.
   * Error messages are memorized and will only be shown once.
   *
   * @param typeSpecs Map of name to a ReactPropType
   * @param values Runtime values that need to be type-checked
   * @param location e.g. "prop", "context", "child context"
   * @param componentName Name of the component for error messages
   * @param getStack Returns the component stack
   */
  export function checkPropTypes(
    typeSpecs: any,
    values: any,
    location: string,
    componentName: string,
    getStack?: () => any
  ): void

  /**
   * Only available if NODE_ENV=production
   */
  export function resetWarningCache(): void

  // Above are regular slightly modified `PropTypes`, see the "Taggable" code comments.
  // - https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/prop-types/index.d.ts

  // @arc-fusion/prop-types
  // Below are extended Arc Fusion PropTypes. See these references:
  // - https://secure.tgam.arcpublishing.com/alc/arc-products/pagebuilder/fusion/documentation/api/feature-pack/components/custom-fields.md
  export interface Tag {
    defaultValue?: any // The default value this custom field should take.
    description?: string // A text description about the purpose of this custom field for users to better understand it.
    group?: string // The name of a group of common custom fields. PageBuilder will aggregate custom fields with the same group name into a common UI interface element.
    formPlugin?: string // The name of a plugin used by this custom field. See the Plugin API for more info.
    format?: string // An ISO 8601 compliant date format string, for datepicker custom fields.
    hidden?: boolean // Whether to show or hide the custom field.
    label?: string | StringDictionary // An object mapping an i18n locale short code to a translated string. Optionally, a String can be provided to always use the same human-readable label regardless of locale.
    labels?: StringDictionary // An object mapping a value listed in the array of a oneOf custom field to a more human-readable string
    max?: number // Maximum number allowed for a number type custom field.
    min?: number // Minimum number allowed for a number type custom field.
    name?: string // Name of the feature itself, for display.
    step?: number // Interval to increase or decrease by for every change to a number type custom field.
  }

  // Simple string dictionary, no numbers allowed.
  interface StringDictionary {
    [index: string]: string
  }

  // This allows a prop-type to allow ".tag" or ".isRequired"
  // e.g. `count: PropTypes.number.tag({ ... }).isRequired`
  export interface Taggable<T> extends Requireable<T> {
    tag(type: Tag)
  }

  // See this file for commented items.
  // - /node_modules/@arc-fusion/prop-types/custom-types/index.js

  // For - boolean: taggable(PropTypes.bool, 'boolean'),
  export const boolean: Taggable<boolean> // alias: bool

  // For - contentConfig: require('./content-config'),
  export function contentConfig<T>(type: string): Taggable<T>

  // For - date: taggable(PropTypes.string, 'date'),
  export const date: Taggable<string>

  // For - dateTime: taggable(PropTypes.string, 'dateTime'),
  export const dateTime: Taggable<string>

  // For - disabled: taggable(PropTypes.string, 'disabled'),
  export const disabled: string // not Taggable or Requireable

  // For - email: taggable(PropTypes.string, 'email'),
  export const email: Taggable<string>

  // For - json: require('./json'), // taggable(PropTypes.string, 'json'),
  export const json: Taggable<string>

  // For - kvp: taggable(PropTypes.object, 'kvp'),
  export const kvp: Taggable<any>

  // For - label: taggable(PropTypes.string, 'label'),
  export const label: Taggable<string>

  // For - list: taggable(PropTypes.arrayOf(PropTypes.string), 'list'),
  export const list: Taggable<string[]>

  // For - richtext: taggable(PropTypes.string, 'richtext'),
  export const richtext: Taggable<string>

  // For - select: taggable(PropTypes.oneOf, 'select'),
  export function select<T>(types: ReadonlyArray<T>): Taggable<T> // alias: oneOf

  // For - text: taggable(PropTypes.string, 'text'),
  export const text: Taggable<string>

  // For - url: taggable(PropTypes.string, 'url')
  export const url: Taggable<string>
}
