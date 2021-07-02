export type SubsArcSite = 'elcomercio' | 'gestion'

type Attributes = {
  name: string
  value: string
}

export type UserDocumentType = 'DNI' | 'CDI' | 'CEX'

export type PrintedSubscriber = {
  documentType: UserDocumentType
  documentNumber: number
}

export type PaywallCampaign = {
  name: string
  printAttributes: Attributes[]
  printedSubscriber?: PrintedSubscriber
  event?: string
}
