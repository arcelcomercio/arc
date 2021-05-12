export type ANSBase = {
  _id: string
  version: string
}

export type ANSDates = {
  created_date: string
  last_updated_date: string
  publish_date: string
  first_publish_date: string
  display_date: string
}

export type AdditionalPropertiesBase = {
  owner: string
  published: boolean
  restricted: boolean
  version: number
}

export type Owner = {
  sponsored: boolean
  id: string
}
