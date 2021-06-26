import { UserProfile } from '@arc-publishing/sdk-identity/lib/sdk/userProfile'
import { CreateOrderResponse } from '@arc-publishing/sdk-sales/lib/sdk/order'
import * as React from 'react'

import { isAuthenticated } from '../_dependencies/Session'
import { getLocaleStorage, getSessionStorage } from '../_dependencies/Utils'

export type AuthContextValue = {
  userLoaded: boolean
  userProfile: UserProfile
  userStep: number
  userPlan: UserPlan | undefined
  userDataPlan: UserDataPlan | undefined
  userPeriod: string | undefined
  userPurchase: CreateOrderResponse | undefined
  loadPage: boolean
  userLoading: boolean
  userErrorApi: string | null
  userMethodPay: PaymentMethod
  userPeOption: PagoEfectivoMethod
  updateUser: (profile: UserProfile) => void
  activateAuth: (authUser: UserProfile) => void
  updateStep: (currentStep: AuthContextValue['userStep']) => void
  userLogout: () => void
  updatePlan: (
    priceCode: UserPlan['priceCode'],
    sku: UserPlan['sku'],
    quantity: UserPlan['quantity']
  ) => void
  updateDataPlan: (
    amount: UserDataPlan['amount'],
    billingFrequency: UserDataPlan['billingFrequency']
  ) => void
  updatePeriod: (period: AuthContextValue['userPeriod']) => void
  updatePurchase: (purchaseInfo: CreateOrderResponse) => void
  updateLoadPage: (status: AuthContextValue['loadPage']) => void
  updateLoading: (status: AuthContextValue['userLoading']) => void
  updateErrorApi: (status: AuthContextValue['userErrorApi']) => void
  updateMethodPay: (name: PaymentMethod) => void
  updatePeOption: (name: PagoEfectivoMethod) => void
}

type AuthProviderProps = {
  children: React.ReactNode
}

type UserPlan = {
  priceCode: string
  sku: string
  quantity: number
}

type BillingFrequency = 'month' | 'year' | 'semester'
type UserDataPlan = { amount: number; billingFrequency: BillingFrequency }

type PaymentMethod = 'payEfectivo' | 'cardCreDeb'
type PagoEfectivoMethod = 'Banca por Internet' | 'Agencia'

export const AuthContext = React.createContext<AuthContextValue | undefined>(
  undefined
)

// retorna "value" o lo mismo que "AuthContext"
export const useAuthContext = (): AuthContextValue | undefined =>
  React.useContext(AuthContext)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const keyStorageStep = 'ArcId.USER_STEP'
  const keyStorageProfile = 'ArcId.USER_PROFILE'

  const [userLoaded, setUserLoaded] = React.useState<boolean>(() =>
    isAuthenticated()
  )
  const [userPlan, setUserPlan] = React.useState<UserPlan>()
  const [userDataPlan, setUserDataPlan] = React.useState<UserDataPlan>()
  const [userPeriod, setUserPeriod] = React.useState<string>()
  const [userPurchase, setUserPurchase] = React.useState<CreateOrderResponse>()
  const [loadPage, setLoadPage] = React.useState<boolean>(false)
  const [userLoading, setUserLoading] = React.useState<boolean>(true)
  const [userErrorApi, setUserErrorApi] = React.useState<string | null>(null)
  const [userProfile, setUser] = React.useState<UserProfile>(() =>
    getLocaleStorage(keyStorageProfile)
  )
  const [userStep, setUserStep] = React.useState(
    parseInt(getSessionStorage(keyStorageStep) || '2', 10)
  )

  const [userMethodPay, setUserMethodPay] = React.useState<PaymentMethod>(
    'cardCreDeb'
  )
  const [userPeOption, setUserPeOption] = React.useState<PagoEfectivoMethod>(
    'Agencia'
  )

  const value: AuthContextValue = {
    userLoaded,
    userProfile,
    userStep,
    userPlan,
    userDataPlan,
    userPeriod,
    userPurchase,
    loadPage,
    userLoading,
    userErrorApi,
    userMethodPay,
    userPeOption,
    updateUser: (profile) => {
      setUser(profile)
    },
    activateAuth: (authUser) => {
      setUserLoaded(true)
      setUser(authUser)
    },
    updateStep: (currentStep) => {
      window.sessionStorage.setItem(keyStorageStep, currentStep.toString())
      setUserStep(currentStep)
    },
    userLogout: () => {
      setUserLoaded(false)
      window.sessionStorage.setItem(keyStorageStep, '1')
      setUserStep(1)
    },
    updatePlan: (priceCode, sku, quantity) => {
      setUserPlan({ priceCode, sku, quantity })
    },
    updateDataPlan: (amount, billingFrequency) => {
      setUserDataPlan({ amount, billingFrequency })
    },
    updatePeriod: (period) => {
      setUserPeriod(period)
    },
    updatePurchase: (purchaseInfo) => {
      setUserPurchase(purchaseInfo)
      window.sessionStorage.setItem(keyStorageStep, '4')
      setUserStep(4)
    },
    updateLoadPage: (status) => {
      setLoadPage(status)
    },
    updateLoading: (status) => {
      setUserLoading(status)
    },
    updateErrorApi: (status) => {
      setUserErrorApi(status)
    },
    updateMethodPay: (name) => {
      setUserMethodPay(name)
    },
    updatePeOption: (name) => {
      setUserPeOption(name)
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
