import React from 'react'

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.isSafari = ''
  }

  componentDidMount = () => {
    // TODO: Verificar clases de ios, si no se usan borrar estos métodos
    this.isSafari =
      window.navigator.vendor &&
      window.navigator.vendor.indexOf('Apple') > -1 &&
      window.navigator.userAgent &&
      window.navigator.userAgent.indexOf('CriOS') === -1 &&
      window.navigator.userAgent.indexOf('FxiOS') === -1
    if (this.isSafari) {
      document.querySelector('html').classList.add('signwall-ios')
      document.querySelector('body').classList.add('signwall-ios')
    }
    document
      .querySelector('body')
      .classList.add('overflow-hidden', 'modal--open')
  }

  componentWillUnmount = () => {
    // TODO: Verificar clases de ios, si no se usan borrar estos métodos
    if (this.isSafari) {
      document.querySelector('html').classList.remove('signwall-ios')
      document.querySelector('body').classList.remove('signwall-ios')
    }
    document
      .querySelector('body')
      .classList.remove('overflow-hidden', 'modal--open')
  }

  render() {
    const { bg, position, size, name, color, id, children } = this.props
    return (
      <v-modal class={`modal ${bg === 'white' ? 'modal--white' : ''}`}>
        <v-dialog
          class={`modal__wrapper modal__position-${position} modal__size-${size}`}
          heading={name}
          size={size}
          style={{ backgroundColor: color }}
          id={id}
          name={name}>
          {children}
        </v-dialog>
      </v-modal>
    )
  }
}

export default Modal
