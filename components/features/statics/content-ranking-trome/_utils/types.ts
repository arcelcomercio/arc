export interface Profile {
  createdOn: number
  modifiedOn: number
  deletedOn: any
  firstName: string
  lastName: string
  secondLastName: string
  displayName: string
  gender: any
  email: string
  unverifiedEmail: string
  picture: any
  birthYear: any
  birthMonth: any
  birthDay: any
  emailVerified: boolean
  contacts: Contact[]
  addresses: any
  attributes: Attribute[]
  identities: Identity[]
  legacyId: any
  status: string
  deletionRule: any
  uuid: string
}

export interface Contact {
  phone: string
  type: string
}

export interface Attribute {
  name: string
  value: string
  type: string
}

export interface Identity {
  userName: string
  passwordReset: boolean
  type: string
  lastLoginDate: number
  locked: boolean
}
