import * as React from 'react'
import { isAuthenticated } from '../_dependencies/Session'
import { getLocaleStorage, getSessionStorage } from '../_dependencies/Utils'

const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const keyStorageStep = 'ArcId.USER_STEP'
  const keyStorageProfile = 'ArcId.USER_PROFILE'

  const [userLoaded, setUserLoaded] = React.useState(() => isAuthenticated())
  const [userPlan, setUserPlan] = React.useState({})
  const [userDataPlan, setUserDataPlan] = React.useState({})
  const [userPeriod, setUserPeriod] = React.useState()
  const [userPurchase, setUserPurchase] = React.useState({})
  const [loadPage, setLoadPage] = React.useState(false)
  const [userLoading, setUserLoading] = React.useState(true)
  const [userErrorApi, setUserErrorApi] = React.useState(null)
  const [userProfile, setUser] = React.useState(() =>
    getLocaleStorage(keyStorageProfile)
  )
  const [userStep, setUserStep] = React.useState(
    parseInt(getSessionStorage(keyStorageStep), 10) || 2
  )

  const value = {
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
    updateUser: profile => {
      setUser(profile)
    },
    activateAuth: authUser => {
      setUserLoaded(true)
      setUser(authUser)
    },
    updateStep: currentStep => {
      window.sessionStorage.setItem(keyStorageStep, currentStep)
      setUserStep(currentStep)
    },
    userLogout: () => {
      setUserLoaded(false)
      window.sessionStorage.setItem(keyStorageStep, 1)
      setUserStep(1)
    },
    updatePlan: (priceCode, sku, quantity) => {
      setUserPlan({ priceCode, sku, quantity })
    },
    updateDataPlan: (amount, billingFrequency) => {
      setUserDataPlan({ amount, billingFrequency })
    },
    updatePeriod: period => {
      setUserPeriod(period)
    },
    updatePurchase: purchaseInfo => {
      setUserPurchase(purchaseInfo)
      window.sessionStorage.setItem(keyStorageStep, 4)
      setUserStep(4)
    },
    updateLoadPage: status => {
      setLoadPage(status)
    },
    updateLoading: status => {
      setUserLoading(status)
    },
    updateErrorApi: staus => {
      setUserErrorApi(staus)
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider, AuthContext }
