export type SubsArcSite = 'elcomercio' | 'gestion'

export type DialogType = 'login' | 'registro' | 'payment' | 'landing' | 'pages'

type Attributes = {
  name: string
  value: string
}

export type UserDocumentType = 'DNI' | 'CDI' | 'CEX'

export type SubscriberDocument = {
  documentType: UserDocumentType
  documentNumber: number
}

export type SubscriberName = {
  firstName: string
  lastName: string
  secondLastName: string
}

export type Subscriber = SubscriberName & SubscriberDocument

export type PaywallCampaign = {
  name: string
  plans: any[]
  printAttributes: Attributes[]
  printedSubscriber: boolean
  event?: string
  fromFia: boolean
  freeAccess: boolean
  subscriber: Subscriber
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
