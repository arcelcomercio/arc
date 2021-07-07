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

/** Paywall Home Campaign */
export type PaywallCampaignPrice = {
  amount: number
  currency: string
  currencyCode: string
}

export type PaywallCampaignDetail = {
  frequency: string
  duration: string
  aditional: string
}

export type PaywallHomeCampaign = {
  title: string
  subtitle: string | null
  url: string
  sku: string
  price: PaywallCampaignPrice
  detail: PaywallCampaignDetail
  features: string[]
  recommended: boolean
}
