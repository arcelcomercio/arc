import React from 'react'
import { createPortal } from 'react-dom'

class BodyEnd extends React.Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.el = document.createElement('div')
    this.el.id = 'main-content-arc'
  }

  componentDidMount() {
    this._isMounted = true
    
    if (this._isMounted) {
      document.body.appendChild(this.el)
    }
  }

  componentWillUnmount() {
    this._isMounted = false
    document.body.removeChild(this.el)
  }

  render() {
    const { children } = this.props
    return createPortal(children, this.el)
  }
}

class Modal extends React.Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.isSafari = ''
  }

  componentDidMount = () => {
    this._isMounted = true

    if (this._isMounted) {
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
  }

  componentWillUnmount = () => {
    this._isMounted = false
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
      <BodyEnd>
        <div className="signwall">
          <div className="link-identity__content">
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
          </div>
        </div>
      </BodyEnd>
    )
  }
}

export default Modal
