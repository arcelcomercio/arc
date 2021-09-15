export type SubsArcSite = 'elcomercio' | 'gestion'
export type CardsProviders = 'VISA' | 'MASTERCARD' | 'AMEX' | 'DINERS'
export type DialogType =
  | 'login'
  | 'registro'
  | 'payment'
  | 'landing'
  | 'pages'
  | 'students'
  | 'authfia'

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
  description: PaywallCampaignDescription
  plans: SubscriptionPlan[]
  printAttributes: Attributes[]
  printedSubscriber: boolean
  event?: string
  fromFia: boolean
  freeAccess: boolean
  subscriber: Subscriber
}

export type PaywallCampaignDescription = {
  name: string
  code: string
  detail: string
  mainBanner: string
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

export type SubscriptionPlanDescription = {
  title: string
  description: string
  cart: string
  price_origin: string
  frecuencia_plan?: 'semester'
  checked?: string
  recommended?: string
  popup_active?: string
}

export interface SubscriptionPlanDetails {
  priceCode: string
  sku: string
  quantity: number
}

export interface SubscriptionPlan
  extends SubscriptionPlanDetails,
    SubscriptionPlanBill {
  name: string
  productName: string
  pricingStrategyId: number
  description: SubscriptionPlanDescription
}

export type BillingFrequency = 'Month' | 'Year' | 'OneTime'
export interface SubscriptionPlanBill {
  amount: number
  billingFrequency: BillingFrequency
}

export type PaymentMethod = 'payEfectivo' | 'cardCreDeb'
export type PagoEfectivoMethod = 'Banca por Internet' | 'Agencia'
