import React, { Component } from 'react'

const { Provider, Consumer } = React.createContext()

class ModalProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTemplate: 'intro',
      idTemplate: '0',
    }
  }

  changeTemplate = (val, id) => {
    this.setState({
      selectedTemplate: val,
      idTemplate: id,
    })
  }

  render() {
    const { children } = this.props
    const { selectedTemplate, idTemplate } = this.state
    return (
      <Provider
        value={{
          selectedTemplate,
          idTemplate,
          changeTemplate: this.changeTemplate,
        }}>
        {children}
      </Provider>
    )
  }
}

export { ModalProvider, Consumer as ModalConsumer }
