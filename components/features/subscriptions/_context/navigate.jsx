import React, { createContext, useState } from 'react'

const { Provider, Consumer } = createContext()

const NavigateProvider = ({ children }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('login')
  const [valueTemplate, setValueTemplate] = useState()

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
