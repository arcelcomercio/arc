/* eslint-disable react/jsx-filename-extension */
import React, { createContext, useState } from 'react'

const { Provider, Consumer } = createContext()

const NavigateProvider = ({ children }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('login')

  const value = {
    selectedTemplate,
    changeTemplate: val => {
      setSelectedTemplate(val)
    },
  }

  return <Provider value={value}>{children}</Provider>
}

export { NavigateProvider, Consumer as NavigateConsumer }
