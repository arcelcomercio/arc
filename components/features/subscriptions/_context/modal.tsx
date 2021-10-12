import { UserProfile } from '@arc-publishing/sdk-identity/lib/sdk/userProfile'
import * as React from 'react'

import { getLocaleStorage } from '../_dependencies/Utils'

type ProfileModalTemplates = 'home' | 'news' | 'subs' | 'prof' | 'detail'
type FormModalTemplates = 'login' | 'forgot' | 'register'
type PaywallModalTemplates = FormModalTemplates | 'intro' // | 'introfree'
type OrganicModalTemplates = FormModalTemplates | 'reset' | 'verify' | 'relogin'
type ModalTemplates =
  | ProfileModalTemplates
  | PaywallModalTemplates
  | OrganicModalTemplates

type ModalProviderProps = {
  children: React.ReactNode
}

type ModalProviderValue = {
  selectedTemplate: ModalTemplates
  userProfile: UserProfile | null
  userLoading: boolean
  idTemplate: number
  valTemplate: string
  changeTemplate: (
    template: ModalProviderValue['selectedTemplate'],
    id?: ModalProviderValue['idTemplate'],
    valTeml?: ModalProviderValue['valTemplate']
  ) => void
  updateProfile: (profile: ModalProviderValue['userProfile']) => void
  updateLoading: (status: ModalProviderValue['userLoading']) => void
}

const ModalConsumer = React.createContext<ModalProviderValue | undefined>(
  undefined
)

const useModalContext = (): ModalProviderValue => {
  const context = React.useContext(ModalConsumer)
  if (context === undefined) {
    throw new Error('useModalContext debe ser usado dentro de un ModalProvider')
  }
  return context
}

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const keyStorageProfile = 'ArcId.USER_PROFILE'

  const [selectedTemplate, setSelectedTemplate] = React.useState<
    ModalProviderValue['selectedTemplate']
  >('intro')
  const [idTemplate, setIdTemplate] = React.useState(0)
  const [valTemplate, setValTemplate] = React.useState('')
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(
    () => getLocaleStorage(keyStorageProfile) as UserProfile | null
  )
  const [userLoading, setUserLoading] = React.useState(true)

  const value: ModalProviderValue = {
    selectedTemplate,
    userProfile,
    userLoading,
    idTemplate,
    valTemplate,
    changeTemplate: (template, id = 0, valTeml = '') => {
      setSelectedTemplate(template)
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

export {
  FormModalTemplates,
  ModalProvider,
  OrganicModalTemplates,
  PaywallModalTemplates,
  ProfileModalTemplates,
  useModalContext,
}
