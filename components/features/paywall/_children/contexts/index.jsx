import React from 'react'
import { useFusionContext as _useFusionContext } from 'fusion:context'

import elcomercio from './elcomercio'
import gestion from './gestion'

const siteContexts = { elcomercio, gestion }
export const Context = React.createContext()

export const PaywallContextProvider = ({ children }) => {
  const { Provider } = Context
  const { arcSite } = _useFusionContext()
  return <Provider value={siteContexts[arcSite]}>{children}</Provider>
}

export const useFusionContext = () => _useFusionContext()

export const useStrings = () => {
  const { strings } = React.useContext(Context)
  return strings
}
