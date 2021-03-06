import React from 'react'
import { createPortal } from 'react-dom'

class BodyEnd extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
    this.el.id = 'signwall-app'
  }

  componentDidMount() {
    document.body.appendChild(this.el)
  }

  componentWillUnmount() {
    document.body.removeChild(this.el)
  }

  render() {
    const { children } = this.props
    return createPortal(children, this.el)
  }
}

class Modal extends React.Component {
  changeView = rule => {
    const view = document.querySelector('meta[name=viewport]')
    if (view) view.remove()
    const meta = document.createElement('meta')
    meta.name = 'viewport'
    meta.content = rule
    document.getElementsByTagName('head')[0].appendChild(meta)
  }

  isSafari = () => {
    return (
      window.navigator.vendor &&
      window.navigator.vendor.indexOf('Apple') > -1 &&
      window.navigator.userAgent &&
      window.navigator.userAgent.indexOf('CriOS') === -1 &&
      window.navigator.userAgent.indexOf('FxiOS') === -1
    )
  }

  componentDidMount = () => {
    if (this.isSafari()) {
      document.querySelector('html').classList.add('overflow-hidden-ios')
      document.querySelector('body').classList.add('overflow-hidden-ios')
      this.changeView(
        'width=device-width, initial-scale=1, user-scalable=0, shrink-to-fit=no'
      )
    }
    document.querySelector('html').classList.add('overflow-hidden')
    document.querySelector('body').classList.add('overflow-hidden')
  }

  componentWillUnmount = () => {
    if (this.isSafari()) {
      document.querySelector('html').classList.remove('overflow-hidden-ios')
      document.querySelector('body').classList.remove('overflow-hidden-ios')
      this.changeView('width=device-width, initial-scale=1')
    }
    document.querySelector('html').classList.remove('overflow-hidden')
    document.querySelector('body').classList.remove('overflow-hidden')
  }

  render() {
    const { bg, position, size, name, color, id, children } = this.props
    return (
      <BodyEnd>
        <div className="signwall">
          <div>
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
