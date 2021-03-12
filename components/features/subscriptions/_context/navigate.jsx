import * as React from 'react'

const { Provider, Consumer } = React.createContext()

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

  return <Provider value={value}>{children}</Provider>
}

export { NavigateProvider, Consumer as NavigateConsumer }
