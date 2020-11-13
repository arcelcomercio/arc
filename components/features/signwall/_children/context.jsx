import React, { Component } from 'react'

const { Provider, Consumer } = React.createContext()

class ModalProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTemplate: 'intro',
      idTemplate: '0',
      valTemplate: '',
    }
  }

  changeTemplate = (val, id, valTeml) => {
    this.setState({
      selectedTemplate: val,
      idTemplate: id,
      valTemplate: valTeml,
    })
  }

  render() {
    const { children } = this.props
    const { selectedTemplate, idTemplate, valTemplate } = this.state
    return (
      <Provider
        value={{
          selectedTemplate,
          idTemplate,
          valTemplate,
          changeTemplate: this.changeTemplate,
        }}>
        {children}
      </Provider>
    )
  }
}

export { ModalProvider, Consumer as ModalConsumer }
