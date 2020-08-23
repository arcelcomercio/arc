import React, { createContext, useState } from 'react'
import { isAuthenticated } from '../_dependencies/Session'
import { getLocaleStorage } from '../_dependencies/Utils'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const keyStorageStep = 'ArcId.USER_STEP'
  const keyStorageProfile = 'ArcId.USER_PROFILE'

  const [userLoaded, setUserLoaded] = useState(() => isAuthenticated())
  const [userProfile, setUser] = useState(() =>
    getLocaleStorage(keyStorageProfile)
  )
  const [userStep, setUserStep] = useState(
    getLocaleStorage(keyStorageStep) || 2
  )
  const [userPlan, setUserPlan] = useState({})
  const [userPeriod, setUserPeriod] = useState()
  const [userPurchase, setUserPurchase] = useState({})
  const [loadPage, setLoadPage] = useState(false)

  const value = {
    userLoaded,
    userProfile,
    userStep,
    userPlan,
    userPeriod,
    userPurchase,
    loadPage,
    updateUser: profile => {
      setUser(profile)
    },
    activateAuth: authUser => {
      setUserLoaded(true)
      setUser(authUser)
    },
    updateStep: currentStep => {
      window.localStorage.setItem(keyStorageStep, currentStep)
      setUserStep(currentStep)
    },
    userLogout: () => {
      setUserLoaded(false)
      window.localStorage.setItem(keyStorageStep, 1)
      setUserStep(1)
    },
    updatePlan: (priceCode, sku, quantity) => {
      setUserPlan({ priceCode, sku, quantity })
    },
    updatePeriod: period => {
      setUserPeriod(period)
    },
    updatePurchase: purchaseInfo => {
      setUserPurchase(purchaseInfo)
      window.localStorage.setItem(keyStorageStep, 4)
      setUserStep(4)
    },
    updateLoadPage: status => {
      setLoadPage(status)
    },
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider, AuthContext }
