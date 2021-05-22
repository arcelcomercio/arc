import * as React from 'react'

import { getLocaleStorage } from '../_dependencies/Utils'

const ModalConsumer = React.createContext()

const ModalProvider = ({ children }) => {
  const keyStorageProfile = 'ArcId.USER_PROFILE'

  const [selectedTemplate, setSelectedTemplate] = React.useState('intro')
  const [idTemplate, setIdTemplate] = React.useState('0')
  const [valTemplate, setValTemplate] = React.useState('')
  const [userProfile, setUserProfile] = React.useState(() =>
    getLocaleStorage(keyStorageProfile)
  )
  const [userLoading, setUserLoading] = React.useState(true)

  const value = {
    selectedTemplate,
    userProfile,
    userLoading,
    idTemplate,
    valTemplate,
    changeTemplate: (val, id, valTeml) => {
      setSelectedTemplate(val)
      setIdTemplate(id)
      setValTemplate(valTeml)
    },
    updateProfile: (profile) => {
      setUserProfile(profile)
    },
    updateLoading: (status) => {
      setUserLoading(status)
    },
  }

  return (
    <ModalConsumer.Provider value={value}>{children}</ModalConsumer.Provider>
  )
}

export { ModalConsumer, ModalProvider }
