import * as React from 'react'

type NavigateTemplates = 'login' | 'register' | 'forgot'

type NavigateProviderProps = {
  children: React.ReactNode
}

type NavigateProviderValue = {
  selectedTemplate: NavigateTemplates
  valueTemplate: string
  changeTemplate: (
    template: NavigateProviderValue['selectedTemplate'],
    content: NavigateProviderValue['valueTemplate']
  ) => void
}

const NavigateContext = React.createContext<NavigateProviderValue | undefined>(
  undefined
)

const useNavigateContext = (): NavigateProviderValue => {
  const context = React.useContext(NavigateContext)
  if (context === undefined) {
    throw new Error(
      'useNavigateContext debe ser usado dentro de un NavigateProvider'
    )
  }
  return context
}

const NavigateProvider: React.FC<NavigateProviderProps> = ({ children }) => {
  const [selectedTemplate, setSelectedTemplate] = React.useState<
    NavigateProviderValue['selectedTemplate']
  >('login')
  const [valueTemplate, setValueTemplate] = React.useState('')

  const value: NavigateProviderValue = {
    selectedTemplate,
    valueTemplate,
    changeTemplate: (template, content) => {
      setSelectedTemplate(template)
      setValueTemplate(content)
    },
  }

  return (
    <NavigateContext.Provider value={value}>
      {children}
    </NavigateContext.Provider>
  )
}

export { NavigateProvider, NavigateTemplates, useNavigateContext }
