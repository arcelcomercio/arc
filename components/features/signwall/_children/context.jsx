import * as React from 'react'

const { Provider, Consumer } = React.createContext()

const ModalProvider = ({ children }) => {
  const [selectedTemplate, setSelectedTemplate] = React.useState('intro')
  const [idTemplate, setIdTemplate] = React.useState('0')
  const [valTemplate, setValTemplate] = React.useState('')

  const value = {
    selectedTemplate,
    idTemplate,
    valTemplate,
    changeTemplate: (val, id, valTeml) => {
      setSelectedTemplate(val)
      setIdTemplate(id)
      setValTemplate(valTeml)
    },
  }

  return <Provider value={value}>{children}</Provider>
}

export { Consumer as ModalConsumer, ModalProvider }
