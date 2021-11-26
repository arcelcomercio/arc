export interface ComposedUserProfile extends Partial<UserProfile> {
  [key: LocationAttributes | PersonalAttributes | string]: any
}

export interface BaseUserProfile {
  displayName?: string
  firstName?: string
  lastName?: string
  secondLastName?: string
  gender?: string
  email?: string
  emailVerified: boolean
  picture?: string
  birthYear?: string
  birthDay?: string
  birthMonth?: string
  contacts?: Array<Contact>
  addresses?: Array<Address>
  attributes?: Array<Attribute>
}
export interface UserIdentity {
  uuid?: string
  accessToken?: string
  refreshToken?: string
  impersonator?: string
  disqus?: {
    enabled: boolean
    publicKey: string
    ssoKey?: string
  }
}
export interface UserProfile extends BaseUserProfile {
  uuid: string
  identities: Array<ProfileIdentity>
}

export interface Contact {
  phone: string
  type: ContactType
}
export declare type ContactType = 'WORK' | 'HOME' | 'PRIMARY' | 'OTHER'
export interface Attribute {
  name: string
  value: string
}
export interface Address {
  line1: string
  line2?: string
  locality: string
  region?: string
  postal?: string
  country?: string
  type: ContactType
}
export interface ProfileIdentity {
  createdOn: string
  createdBy: string
  modifiedOn: string
  modifiedBy: string
  deletedOn: string
  id: number
  userName: string
  passwordReset: boolean
  type: 'Identity' | 'Facebook' | 'Google'
  lastLoginDate: string
  locked: boolean
}

export type LocationAttributes =
  | 'country'
  | 'province'
  | 'department'
  | 'district'
export type PersonalAttributes =
  | 'phone'
  | 'civilStatus'
  | 'documentNumber'
  | 'documentType'
