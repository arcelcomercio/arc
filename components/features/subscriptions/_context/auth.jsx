import React, { createContext, useState } from 'react'
import { isAuthenticated } from '../_dependencies/Session'
import { getLocaleStorage, getSessionStorage } from '../_dependencies/Utils'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const keyStorageStep = 'ArcId.USER_STEP'
  const keyStorageProfile = 'ArcId.USER_PROFILE'

  const [userLoaded, setUserLoaded] = useState(() => isAuthenticated())
  const [userPlan, setUserPlan] = useState({})
  const [userDataPlan, setUserDataPlan] = useState({})
  const [userPeriod, setUserPeriod] = useState()
  const [userPurchase, setUserPurchase] = useState({})
  const [loadPage, setLoadPage] = useState(false)
  const [userLoading, setUserLoading] = useState(true)
  const [userErrorApi, setUserErrorApi] = useState(null)
  const [userProfile, setUser] = useState(() =>
    getLocaleStorage(keyStorageProfile)
  )
  const [userStep, setUserStep] = useState(
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
