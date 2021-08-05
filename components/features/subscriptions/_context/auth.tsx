import { UserProfile } from '@arc-publishing/sdk-identity/lib/sdk/userProfile'
import { CreateOrderResponse } from '@arc-publishing/sdk-sales/lib/sdk/order'
import * as React from 'react'
import {
  PagoEfectivoMethod,
  PaymentMethod,
  SubscriptionPlanBill,
  SubscriptionPlanDescription,
  SubscriptionPlanDetails,
} from 'types/subscriptions'

import { isAuthenticated } from '../_dependencies/Session'
import { getLocaleStorage, getSessionStorage } from '../_dependencies/Utils'

interface PlanBilling extends Omit<SubscriptionPlanBill, 'billingFrequency'> {
  billingFrequency:
    | SubscriptionPlanBill['billingFrequency']
    | SubscriptionPlanDescription['frecuencia_plan']
}

type AuthContextValue = {
  userLoaded: boolean
  userProfile: UserProfile | null
  userStep: number
  userPlan: SubscriptionPlanDetails | undefined
  userDataPlan: PlanBilling | undefined
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
    priceCode: SubscriptionPlanDetails['priceCode'],
    sku: SubscriptionPlanDetails['sku'],
    quantity: SubscriptionPlanDetails['quantity']
  ) => void
  updateDataPlan: (
    amount: PlanBilling['amount'],
    billingFrequency: PlanBilling['billingFrequency']
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

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

const useAuthContext = (): AuthContextValue => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext debe ser usado dentro de un AuthProvider')
  }
  return context
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const keyStorageStep = 'ArcId.USER_STEP'
  const keyStorageProfile = 'ArcId.USER_PROFILE'

  const [userLoaded, setUserLoaded] = React.useState<boolean>(() =>
    isAuthenticated()
  )
  const [userPlan, setUserPlan] = React.useState<SubscriptionPlanDetails>()
  const [userDataPlan, setUserDataPlan] = React.useState<PlanBilling>()
  const [userPeriod, setUserPeriod] = React.useState<string>()
  const [userPurchase, setUserPurchase] = React.useState<CreateOrderResponse>()
  const [loadPage, setLoadPage] = React.useState(false)
  const [userLoading, setUserLoading] = React.useState(true)
  const [userErrorApi, setUserErrorApi] = React.useState<string | null>(null)
  const [userProfile, setUser] = React.useState<UserProfile | null>(
    () => getLocaleStorage(keyStorageProfile) as UserProfile | null
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

// no se exporta `AuthContext` para conseguir mejor validación con TS
export { AuthContextValue, AuthProvider, PlanBilling, useAuthContext }
