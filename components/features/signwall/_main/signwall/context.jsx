import React, { Component } from 'react'

const { Provider, Consumer } = React.createContext()

class ModalProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTemplate: 'intro',
    }
  }

  changeTemplate = val => {
    this.setState({
      selectedTemplate: val,
    })
  }

  render() {
    const { children } = this.props
    const { selectedTemplate } = this.state
    return (
      <Provider
        value={{
          selectedTemplate,
          changeTemplate: this.changeTemplate,
        }}>
        {children}
      </Provider>
    )
  }
}

export { ModalProvider, Consumer as ModalConsumer }
