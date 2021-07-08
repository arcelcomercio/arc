import * as React from 'react'

const NavigateConsumer = React.createContext()

const NavigateProvider = ({ children }) => {
  const [selectedTemplate, setSelectedTemplate] = React.useState('login')
  const [valueTemplate, setValueTemplate] = React.useState()

  const value = {
    selectedTemplate,
    valueTemplate,
    changeTemplate: (template, content) => {
      setSelectedTemplate(template)
      setValueTemplate(content)
    },
  }

  return (
    <NavigateConsumer.Provider value={value}>
      {children}
    </NavigateConsumer.Provider>
  )
}

export { NavigateConsumer, NavigateProvider }
